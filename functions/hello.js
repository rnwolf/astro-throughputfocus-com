//functions/hello.js
// Reacts to POST /hello-world
export async function onRequestPost(request, env, ctx) {
  // ...
  const somedata = env.API_KEY_DUMMY;
  return new Response(`Hello world ${somedata}`);
}
