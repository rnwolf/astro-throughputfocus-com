/**
 * reacts to POST /api/hello
 *
 * //functions/api/hello.js
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

  let htmlContent =
    "<html><head></head><body><pre>" +
    '</pre><p>Click to send message: <form method="post">Name: <input type="text" name="name"/><br>Email: <input         type="text" name="email"/><br>Sub: <input type="text" name="subject"/><br>Msg: <input type="text" name="message"/><br><input type="submit" value="Send"/></form></p>' +
    "<pre>" +
    "</pre>" +
    "</body></html>";

  return new Response(htmlContent, { status: 200 });
}
