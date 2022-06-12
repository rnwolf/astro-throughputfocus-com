import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";
import { ContentItem } from "@cloudflare/pages-plugin-mailchannels/api";

export const onRequest: PagesFunction = mailChannelsPlugin({
  personalizations: [
    {
      to: [{ name: "my name, email: "rudiger.wolf@throughputfocus.com" }],
    },
  ],
  from: {
    name: "my website",
    email: "hello@throughputfocus.com",
  },
  subject: "Testing",
  content: () => [
      {
          type: "text/plain",
          value: "testing"
      } as ContentItem
  ],
  respondWith: () => {
    return new Response(
      `Thank you for reaching out.  We will review your message as soon as we can.`
    );
  },
});