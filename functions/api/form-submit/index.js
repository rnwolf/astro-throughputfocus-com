/* /functions/api/form-submit/index.js */

export async function onRequestPost({ request, env }) {
  const json = await request.json();

  const body = `
      Name: ${json.firstName} ${json.lastName}
      Email: ${json.email}
    
      ${json.message} 
    `;

  const data = {
    to: env.TO_EMAIL_ADDRESS,
    from: env.FROM_EMAIL_ADDRESS,
    subject: `New Contact from ${json.email}`,
    text: body,
  };

  const submitUrlString = encodeURI(
    Object.entries(data)
      .map((param) => param.join("="))
      .join("&")
  );

  const init = {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa("api:" + env.MAILGUN_API_KEY),
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": submitUrlString.length.toString(),
    },
    body: submitUrlString,
  };

  const result = await fetch(`${env.MAILGUN_API_BASE_URL}/messages`, init);

  if (result.status === 200) {
    return new Response(JSON.stringify({ message: "OK" }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({ message: "Message submission failed!", result }),
      {
        headers: { "content-type": "application/json" },
        status: 400,
      }
    );
  }
}
