// import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

// export const onRequest = honeycombPlugin({
//   apiKey: "${HONEYCOMB_API_KEY}",
//   dataset: "YOUR_HONEYCOMB_DATASET_NAME",
// });

//https://developers.cloudflare.com/pages/how-to/use-worker-for-ab-testing-in-pages/
const cookieName = "ab-test-cookie";
const newHomepagePathName = "/test";

const abTest = async ({ request, next, env }) => {
  /*
  Todo: 
  1. Conditional statements to check for the cookie
  2. Assign cookie based on percentage then serve 
  */
};

export const onRequest = [abTest];
