/**
 * reacts to POST /api/hello
 *
 * //functions/api/hello.js
 **/

export async function onRequestPost(request, env) {
  // ...
  const somedata = env.API_KEY_DUMMY;
  return new Response(`Hello world ${somedata}`);
}
