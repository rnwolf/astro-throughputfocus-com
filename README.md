# Astro Based Website for Throughputfocus.com

Rebuild site with Astro.

# Using Cloudflate page functions

https://eben.gilkenson.com/code/cloudflare-workers/cloudflare-worker-contact-form/
Basic Contact Form with Cloudflare Workers
Published on February 23rd, 2022
A contact form just needs to take form data and get it to whoever needs it. For the small sites that I work on, this has been done so easily for years with the PHP mail() function. Moving to a serverless platform becomes somewhat more involved, but provides opportunities to add features that would be harder to implement with a PHP script.

https://medium.com/whitespectre/ultrafast-serverless-sites-our-cloudflare-pages-prototype-ecc6632b9472
Ultrafast serverless sites: Our Cloudflare Pages Prototype
Test driving Cloudflare’s ambitious platform-as-a-service solution by creating a JAMstack-like application with their new Pages product.

https://noise.getoto.net/tag/serverless-functions/

https://blog.cloudflare.com/building-full-stack-with-pages/

## Using preview branch with Cloudflare pages

https://discord.com/channels/595317990191398933/789155108529111069/962574142417272862
Providing an update on this so it may help others. If you want a custom domain pointing to a preview branch AND cloudflare access on top of it, you need to make sure you have two applications on cloudflare access: one for \*.<pages_app>.pages.dev and another for your custom domain (e.g. preview.example.com). I set up the same policies for both. With that, you can now access preview deployments through preview.example.com, get prompted for auth from cloudflare access, and after you auth you'll see your preview pages app.
Without the extra cloudflare access rule for preview.example.com you'll get stuck on an intermediary page after the cloudflare access auth page, and nothing you do will let you see your preview pages app through the custom domain.

setup a custom domain pointing at a preview branch

https://discord.com/channels/595317990191398933/789155108529111069/933334599935885322
Each branch has an alias domain like qa.project.pages.dev

To link these to custom domains, first add the domains as custom domains (So add qa.example.com to the custom domains area on the project), then once its all processed go to the DNS for that domain and change the created cname to be the branch alias like qa.project.pages.dev. Repeat for all other domains accordingly.

It's important that you add all the domains to the Custom Domains area first, or they won't route to the project anymore. The DNS change simply changes which branch they should use
