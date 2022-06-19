const getRedirectURL = function (request: Request) {
  const url = new URL(request.url);
  return url.protocol + url.hostname + ":" + url.port + "/";
};
/*
 * All get return to index
 * */
export const onRequestGet: PagesFunction = async ({ request }) => {
  return Response.redirect("https://throughputfocus.com/thanks_contact");
};
