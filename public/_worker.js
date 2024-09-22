/////////////////////////////////////////////////
// Based on the code at https://developers.cloudflare.com/pages/functions/examples/ab-testing/
/////////////////////////////////////////////////

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cookieName = "test-ab-cookie";
    const PathNameA = "/test-a";
    const PathNameB = "/test-b";

    if (url.pathname === ('/landing')) {

      let cookie = request.headers.get("cookie");
      if (cookie && cookie.includes(`${cookieName}=A`)) {
        url.pathname = PathNameA
        return env.ASSETS.fetch(url)
      }
      else if  (cookie && cookie.includes(`${cookieName}=B`)) {
        url.pathname = PathNameB
        return env.ASSETS.fetch(url)
      }
      else {
        url.pathname = PathNameB;

        const percentage = Math.floor(Math.random() * 100);
        let version = "A"; // default version

        // change pathname and version name for 50% of traffic
        if (percentage < 50) {
          url.pathname = PathNameB;
          version = "B";
        }
        // get the static file from ASSETS, and attach a cookie
        const asset = await env.ASSETS.fetch(url);
        let response = new Response(asset.body, asset);
        let expires = (new Date(Date.now()+ 86400*1000)).toUTCString(); // Valid for 1 Day = 24 Hrs = 24*60*60 = 86400.
        response.headers.append("Set-Cookie", `${cookieName}=${version}; expires= ${expires} ;path=/`);
        return response;
      }  
    }
    // Otherwise, serve the static assets for the current page being requested.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
}    