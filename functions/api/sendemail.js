//https://community.cloudflare.com/t/send-email-from-workers-using-mailchannels-for-free/361973
// and
// https://mailchannels.zendesk.com/hc/en-us/articles/4565898358413-Sending-Email-from-Cloudflare-Workers-using-MailChannels-Send-API
// also look at add SPF record to DNS service
// https://mailchannels.zendesk.com/hc/en-us/articles/200262610-Set-up-SPF-Records

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let content = "just drop if it fails...okay ?";
  let respContent = "";
  let fls = "";

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
        {
          to: [
            { email: "rudiger.wolf@throughputfocus.com", name: "Test Sender" },
          ],
        },
      ],
      from: {
        email: "support@throughputfocus.com",
        name: "Test Sender",
      },
      subject: fls.subject,
      content: [
        {
          type: "text/plain",
          value: fls.message,
        },
      ],
    }),
  });

  // only send the mail on "POST", to avoid spiders, etc.
  if (request.method == "POST") {
    const formData = await request.formData();

    const body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }

    fls = JSON.parse(JSON.stringify(body));

    const resp = await fetch(send_request);
    const respText = await resp.text();

    respContent =
      resp.status + " " + resp.statusText + "\n\n" + respText + fls.name;
  }

  let htmlContent =
    "<html><head></head><body><pre>" +
    '</pre><p>Click to send message: <form method="post">Name: <input type="text" name="name"/><br>Email: <input         type="text" name="email"/><br>Sub: <input type="text" name="subject"/><br>Msg: <input type="text"         name="message"/><br><input type="submit" value="Send"/></form></p>' +
    "<pre>" +
    respContent +
    "</pre>" +
    "</body></html>";

  return new Response(htmlContent, {
    headers: { "content-type": "text/html" },
  });
}
