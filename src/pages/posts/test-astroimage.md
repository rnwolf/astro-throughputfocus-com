---
title: Test Astro Image
description: "This is a description for Zero Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione."
pubDate: "2020-11-05T08:15:30-05:00"
firstPub: "2020-11-05T08:15:30-05:00"
authors:
  - rnwolf
  - bloggs
tags:
  - kanban
  - agile
  - pm
  - strategy
readingtime: 10min
draft: false
sitemap: true
layout: ../../layouts/PostLayout.astro
openGraph:
  title: This is the Open Graph title for the post
  description: This is a comprehensive description that give some kind of a super hight level summary of that the post is all about and it uses some of the key words for seo reasons as well.
  basic:
    title: different from the value of the title prop
    type: article
    image: https://picsum.photos/1200/627
  image:
    secureUrl: https://picsum.photos/1200/627
    type: "image/png"
    width: 1200
    height: 627
    alt: This is a description of what is in the image
imageCredit: Photo by <a href="https://unsplash.com/es/@bogomi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Bogomil Mihaylov</a> on <a href="https://unsplash.com/backgrounds/art?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
setup: |
  import { YouTube } from 'astro-embed';
  import { Picture } from "astro-imagetools/components";
src: https://picsum.photos/1024/768
alt: A random image
---

# Hello Markdown Images

<!-- A remote image -->

![A random remote image](https://picsum.photos/1024/768)

<!-- A local image relative to the markdown file -->

<!-- ![A local image](./images/landscape.jpg) -->
