/**
 * POST /api/submit
 * and
 * GET /api/submit
 */

// See this discord link for more
// https://discord.com/channels/595317990191398933/773219443911819284/968403656485502988

export default class UsageAnalytics {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    // ensure that the value is set
    state.blockConcurrencyWhile(async () => {
      this.value = (await state.storage.get("value")) || 0;
    });
  }

  async storeValue() {
    await this.state.storage.put("value", this.value);
  }

  // Handle HTTP requests from clients.
  async fetch(req) {
    // update 'value' if something is sent
    const { something } = req.query;
    if (something) {
      // do stuff to this.value
      this.value += something;
    } else {
      return new Response("Not found", { status: 404 });
    }

    // If we made it here, the value was updated, so we set a timeout of 25 seconds to store it
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.storeValue(), 1000 * 25);

    return new Response("ok", { status: 200 });
  }
}

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
