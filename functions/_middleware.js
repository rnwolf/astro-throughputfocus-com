const cookieName = "ab-test-cookie";
const newHomepagePathName = "https://throughputfocus.com/new-basic/";

const abTest = async ({ request, next, env }) => {
  const url = new URL(request.url);
  // if homepage
  if (url.pathname === "/") {
    // if cookie ab-test-cookie=new then change the request to go to /test
    // if no cookie set, pass x% of traffic and set a cookie value to "current" or "new"

    let cookie = request.headers.get("cookie");
    // is cookie set?
    if (cookie && cookie.includes(`${cookieName}=new`)) {
      // pass the request to /test
      url.pathname = newHomepagePathName;

      // return env.ASSETS.fetch(url);
      const assetURL = new URL("/", request.url).toString();
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
      // const asset = await env.ASSETS.fetch(url);
      // const assetURL = new URL("/", url).toString();
      const assetReq = new Request(newHomepagePathName, {
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
