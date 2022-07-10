// Source for abtest code
// https://developers.cloudflare.com/pages/how-to/use-worker-for-ab-testing-in-pages/
// https://github.com/cloudflare/wrangler2/issues/165
const cookieName = "ab-test-cookie";
const newHomepagePathName = "/new-basic";

const abTest = async ({ request, next, env }) => {
  const url = new URL(request.url);
  // if homepage
  if (url.pathname === "/") {
    // if cookie ab-test-cookie=new then change the request to go to new test page
    // if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"
    // Session cookies expire once you log off or close the browser.

    let cookie = request.headers.get("cookie");
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}=new`)) {
      url.pathname = newHomepagePathName;

      const assetURL = new URL(url).toString();
      const assetReq = new Request(assetURL, {
        cf: request.cf,
      });
      const asset = await env.ASSETS.fetch(assetReq);
      return asset;
    } else {
      const percentage = Math.floor(Math.random() * 100);
      let version = "current"; // default version
      // change pathname and version name for 50% of traffic
      if (percentage < 50) {
        url.pathname = newHomepagePathName;
        version = "new";
      }
      // get the static file from ASSETS, and attach a cookie
      const assetReq = new Request(request.url, {
        cf: request.cf,
      });
      const asset = await env.ASSETS.fetch(assetReq);

      let response = new Response(asset.body, asset);
      response.headers.append(
        "Set-Cookie",
        `${cookieName}=${version}; SameSite=None; Secure; path=/`
      );
      return response;
    }
  }
  return next();
};

export const onRequest = [abTest];
