// https://www.ilovefreesoftware.com/06/programming/how-to-send-emails-using-cloudflare-workers-from-any-domain-for-free.html
// https://mailchannels.zendesk.com/hc/en-us/articles/4565898358413-Sending-Email-from-Cloudflare-Workers-u
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let content = "";
  for (var i of request.headers.entries()) {
    content += i[0] + ": " + i[1] + "\n";
  }
  let send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        { to: [{ email: "recipient@example.com", name: "Test Recipient" }] },
      ],
      from: {
        email: "sender@example.com",
        name: "Test Sender",
      },
      subject: "Test Subject",
      content: [
        {
          type: "text/plain",
          value: "Test message content\n\n" + content,
        },
      ],
    }),
  });

  let respContent = "";
  // only send the mail on "POST", to avoid spiders, etc.
  if (request.method == "POST") {
    const resp = await fetch(send_request);
    const respText = await resp.text();

    respContent = resp.status + " " + resp.statusText + "\n\n" + respText;
  }

  let htmlContent =
    "<html><head></head><body><pre>" +
    '</pre><p>Click to send message: <form method="post"><input type="submit" value="Send"/></form></p>' +
    "<pre>" +
    respContent +
    "</pre>" +
    "</body></html>";
  return new Response(htmlContent, {
    headers: { "content-type": "text/html" },
  });
}
