/**
 * POST /api/submit
 * and
 * GET /api/submit
 */

// GET requests to /filename would return "Hello, world!"
export const onRequestGet = () => {
  return new Response("Hello, world! I exist.", { status: 200 });
};

export async function onRequestPost(context) {
  try {
    if (
      context.request.headers.get("content-type") !==
      "application/x-www-form-urlencoded"
    ) {
      return new Response("Invalid headers", { status: 400 });
    }

    let input = await context.request.formData();

    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);
    return new Response(pretty, {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  } catch (err) {
    return new Response("Error parsing JSON content", { status: 400 });
  }
}
