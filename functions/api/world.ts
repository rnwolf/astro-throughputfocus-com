export const onRequestGet: PagesFunction = async (context) => {
  //eslint-disable-line
  const originUrl = new URL(context.request.url).origin;
  return new Response("<html><body><p>hello world</p></body><html>", {
    headers: { "content-type": "text/html; charset=UTF-8" },
    status: 200,
  });
};
