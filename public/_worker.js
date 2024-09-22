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
      return env.ASSETS.fetch(url);
      //return new Response('Ok api called');
    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
}    