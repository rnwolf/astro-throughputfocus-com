/**
 * reacts to POST /api/hello
 *
 * //functions/api/hello.js
 **/

// export async function onRequestPost(request, env) {
// ...
export async function onRequest(context) {
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

  return new Response(`Hello, world! ${somedata}`);
}