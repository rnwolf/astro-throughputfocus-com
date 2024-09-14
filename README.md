# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                                  | Action                                           |
| :--------------------------------------- | :----------------------------------------------- |
| `npm install`                            | Installs dependencies                            |
| `npm install -D @playwright/test@latest` | Install Playwrite                                |
| `npx playwright install --with-deps`     | Install dependencies                             |
| `npm run build -mode production`         | build and use playwrite when required.           |
| `npm run dev`                            | Starts local dev server at `localhost:4321`      |
| `npm run build`                          | Build your production site to `./dist/`          |
| `npm run preview`                        | Preview your build locally, before deploying     |
| `npm run astro ...`                      | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`                | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Images

Sizable images from https://picsum.photos/

## LinkedIn Link Preview Specifications

Title: Up to 150 characters.
Image: The image gets cropped into a 1.91:1 ratio and 1200 (width) x 627 (height) pixels. So you need an image with a compatible ratio and width of 1200px+.
Optional comment of up to 1300 characters. (This is the LinkedIn post that you write outside of the link.)

Use the LinkedIn Debugger to preview. https://kinsta.com/blog/linkedin-debugger/

# SVG diagrams

How to use Github action to convert plant uml digrams to SVG files
https://gist.github.com/thedmeyer/8b50362ae71ecbadabb17f8683c70ece

## Problem using npm as we have bug.

Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.

see if you can use another package manager.



# Astro Based Website for Throughputfocus.com

Rebuild site with Astro.

# Using Cloudflate page functions

https://developers.cloudflare.com/pages/platform/functions/

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

# To secure Cloudflare Pages site set the headers for the site

https://discord.com/channels/595317990191398933/789155108529111069/933503057570955335
added a \_headers file to the output folder
Check the settings with https://securityheaders.com/ or https://csp-evaluator.withgoogle.com/

## How to get the raw markdown source

How to get the markdown source for pages

const pages = await Astro.glob("../../content/pages/\*.md");

const rawPages = await Promise.all(
pages.map(async (page) => await page.default().metadata.source)
);

---

// An astro .md markdown file
layout: ../layouts/Photo.astro
title: Photos
description: A Photo of something!
publishDate: 2019-12-14T09:00:00-08:00
setup: |
import { Picture } from "astro-imagetools/components";

---

<Picture
src="https://picsum.photos/1600/900"
alt="A random image"
format={["avif", "webp", "png"]}
breakpoints={[200, 400, 800, 1600]} />

<Picture
src="https://picsum.photos/1024/768"
alt="A random image"
format={["avif", "webp", "png"]}
breakpoints={{count: 3, minWidth: 300, maxWidth: 1024}} />

<Picture
  src="/src/images/ChonkChart.png"
  alt="A local image"
  sizes="1024px, 800px, 400px, 200px"
  width="300px"
/>

{openGraph &&
`<meta property="og:title" content=${openGraph.basic.title} /> <meta property="og:type" content=${openGraph.basic.type} /> <meta property="og:image" content=${openGraph.basic.image} /> <meta property="og:url" content=${openGraph.basic.url} />`
}

# Twitter and Facebook Card Preview

https://www.bannerbear.com/tools/twitter-card-preview-tool/

# Linkedin Banner preview

https://www.linkedin.com/post-inspector/

# Must have browser add-on for SEO info

https://detailed.com/extension/

# Create a Page of links sort of like a site map

For astro pages and md pages

https://codesandbox.io/s/upbeat-http-k8ifvm?file=/src/pages/index.astro:295-323

# Embed Twwets or YouTube videos in astro or md pages

https://github.com/astro-community/astro-embed/blob/main/packages/astro-embed/README.md

'''

## import { Tweet, YouTube } from 'astro-embed';

<Tweet id="https://twitter.com/astrodotbuild/status/1512144306898976768" />

<YouTube id="https://youtu.be/xtTy5nKay_Y" />
'''

Markdown pages

You can also import an embed component for use on a Markdown page.

'''

setup: |
import { Tweet, YouTube } from 'astro-embed';

---

Hey look! I can embed a tweet _in Markdown_!

<Tweet id="https://twitter.com/astrodotbuild/status/1512144306898976768" />

YouTube videos work too :-)

<YouTube id="https://youtu.be/xtTy5nKay_Y" />
'''

# How to add class info to astro-imagetools images?

You can do that using the attributes prop, `attributes={{ img: { class: "custom-class" } }}`

# Improve performance by getting markdown posts once!

Not possible yet! See https://github.com/withastro/astro/issues/3203

// src/components/GlobPosts.js

let allPosts = import.meta.globEager('@pages/posts/\*.md')
allPosts = allPosts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
allPosts = import.meta.env.DEV ? allPosts : allPosts.filter((a)=>!a.draft);

export {allPosts};

## How to obtain content info for a Markdown post

See https://www.readonlychild.com/blog/astro-md-content/

## New way to create RSS feed for md blog posts

// src/pages/rss.xml.js
import rss from '@astrojs/rss';
const postImportResult = import.meta.globEager('../posts/\*_/_.md');
const posts = Object.values(postImportResult);
export const get = () => rss({
title: 'Buzz’s Blog',
description: 'A humble Astronaut’s guide to the stars',
items: posts.map((post) => ({
link: post.frontmatter.slug,
title: post.frontmatter.title,
pubDate: post.frontmatter.pubDate,
}))
});

See https://github.com/withastro/docs/pull/430/files

# What is the URL for a given astro page

URL interface from Astro.request.url to use it in the way you used to:

const pathname = new URL(Astro.request.url).pathname;

==================

// help.astro
const mode = import.meta.env.MODE;
...

<li>
  <a href={mode === "development" ? '/help' : 'help.html'}>Help</a>
</li>

Seems like it needs a rag around condition.
<tag>{item.original_language === 'en' ? item.title : item.original_language}</tag>

## Configuration setting to try==========

Here’s the basic tsconfig all of Astro’s starters come with:

{
"compilerOptions": {
// Enable top-level await, and other modern ESM features.
"target": "ESNext",
"module": "ESNext",
// Enable node-style module resolution, for things like npm package imports.
"moduleResolution": "node",
// Enable JSON imports.
"resolveJsonModule": true,
// Enable stricter transpilation for better output.
"isolatedModules": true,
// Add type definitions for our Vite runtime.
"types": ["vite/client"]
}
}

## Javascript to link together data

https://discord.com/channels/830184174198718474/845451724738265138/973596845764919327

Sample from Movies endpoint:

[
{  
 title: 'Fast Color',
genre_ids: [ 53, 878 ],
},
]

Sample from Genres endpoint:
[
{ id: 28, name: 'Action' },
{ id: 12, name: 'Adventure' },
]

Abbreviated JS thus far:

const loadGenres = async () => {
const response = await fetch(genres_url);
const results = await response.json();
return results.genres;
};

const loadMovies = async () => {
const response = await fetch(movies_url);
const results = await response.json();
return results.results;
};

const genres = await loadGenres();
const movies = await loadMovies();

Autothreader
BOT
— Yesterday at 3:46 PM
Hey @djmtype! I've automatically created this helpful thread from your message 17 hours ago.

Pinging @support-squad so that they see this as well!
[3:46 PM]
Done with your thread? Press Resolve Thread to auto-archive the discussion for everyone.

Resolve Thread
[3:46 PM]
You can also right-click the thread in Discord (or use the ... menu) and select Leave Thread to unsubscribe from future updates.

readonlychild (ernesto) — Yesterday at 3:55 PM
pseudo-code
[3:55 PM]
function getGenreById (id, genres) {
let g = '??';
genres.forEach((genre) => {
if (genre.id === id) g = genre.name;
}
return g;
}

---

<span>Genre 28 = {getGenreById(28, genres)}</span>

## Enrich data

https://discord.com/channels/830184174198718474/845451724738265138/973718140859076638

I'm trying to fetch more details about each movie so I'm making 2 fetch calls.

async function loadMovies() {
const entries = [];
let page = 1;
const allMovies = `https://api.themoviedb.org/3/account/xxx/favorite/movies?xxx&page=${page}`;
let data = await fetch(allMovies);
let fetchResults = await data.json();
entries.push(...fetchResults.results);

    const allSingleMovies = []
    for (const item of entries) {
        const singleMovie = `https://api.themoviedb.org/3/movie/${item.id}?xxx`;
        const data = await fetch(singleMovie);
        let singleMovieResults = await data.json();
        allSingleMovies.push(singleMovieResults);
    }
    return allSingleMovies;

}

let movies = await loadMovies();

<ol>
    {movies.map((item) => 
    <li>{item.title}</li>
  )}
</ol>

## How to debug astro build

In your terminal you just run `DEBUG="astro:build" npm run build`

or in MS-Windows at Powershell prompt `$env:DEBUG='astro:build'; & npm run build`

## Wrap with div based on condition

```
---
const condition = true;
---

{
  () => {
    const img = <img src="https://picsum.photos/1024/768" alt="" />;

    return condition ? <div>{img}</div> : img;
  }
}
```

## Using host environment variables

const DATABASE_URL = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;

or create helper utility

export function getEnvVar(name) { return process.env[name] || import.meta.env[name]; }

# Example of attaching a bit of code to a button and running an api function

## '''

import { Button } from '../components';

function handlePie() {
const response = await fetch('/api/pie?flavor=cherry');
const pie = await response.json();
alert(pie);
}

---

<Button onClick={handlePie} client:idle>
  Test
</Button>
'''

/api/pie.js:
'''
export async function get ({ request }) {
let response, status;
const parsedURL = new URL(request.url);
const flavor = parsedURL.searchParams.get('flavor');
if (flavor) {
response = { flavor };
status = 200;
}

if (!flavor) {
response = { message: 'Flavor not found' };
status = 404;
}

return new Response(JSON.stringify(response, null, 2), {
status,
headers: { 'Content-Type': 'application/json' }
});
}
'''

## Consider using LogFlare to catch events from serverless functions

https://github.com/vercel/vercel/discussions/5204
Can take any JSON POST body and we turn that into a log event. Nested, not nested, anything.
