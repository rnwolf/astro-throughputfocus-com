/**
 * reacts to POST /api/redirect
 *
 **/

// export async function onRequestPost(request, env) {
// ...
export default async function onRequestGet(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const somedata = env.API_KEY_DUMMY;

  const destinationURL = "https://throughputfocus.com/thanks_contact";

  return new Response.redirect(destinationURL, { status: 301 });
}
