// https://medium.com/whitespectre/ultrafast-serverless-sites-our-cloudflare-pages-prototype-ecc6632b9472
const generateId = async (kv: KVNamespace) => {
  while (true) {
    const randomBytes = crypto.getRandomValues(new Uint8Array(8));

    const id = [...randomBytes]
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    if (await kv.get(id)) {
      continue;
    }
    return id;
  }
};

export const onRequestPost: PagesFunction<{ NOTES: KVNamespace }> = async ({
  request,
  env,
}) => {
  const body = await request.json();
  const id = await generateId(env.NOTES);

  await env.NOTES.put(id, body.text);

  return new Response(JSON.stringify({ id }));
};
