/////////////////////////////////////////////////
// Based on the code at https://developers.cloudflare.com/pages/functions/examples/ab-testing/
/////////////////////////////////////////////////

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cookieName = "ab-homepage-test-cookie";
    const newHomepagePathName = "/index-test";
    let cookie = request.headers.get("cookie");
    if (url.pathname === ('/api/fred')) {
      // TODO: Add custom logic here.
      url.pathname = newHomepagePathName;

      const percentage = Math.floor(Math.random() * 100);
      let version = "current"; // default version
      // change pathname and version name for 50% of traffic
      if (percentage < 50) {
        url.pathname = newHomepagePathName;
        version = "new";
      }
      // get the static file from ASSETS, and attach a cookie
      const asset = await env.ASSETS.fetch(url);
      let response = new Response(asset.body, asset);
      let expires = (new Date(Date.now()+ 86400*1000)).toUTCString(); // Valid for 1 Day = 24 Hrs = 24*60*60 = 86400.
      response.headers.append("Set-Cookie", `${cookieName}=${version}; expires= ${expires} ;path=/`);
      return response;

    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
}    