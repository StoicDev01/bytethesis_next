
import { getAllPosts } from "@app/lib/GetAllPosts";
import { MetaPage } from "@app/lib/MetaPage";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse){
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml')

  // Instructing the Vercel edge to cache the file
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
  
  const host = req.headers.host || ""

  const proto =
    req.headers["x-forwarded-proto"] 
      ? "https"
      : "http";

  const pt_posts = await getAllPosts("pt");
  const en_posts = await getAllPosts("en")

  const xml = generateSiteMap(proto, host, pt_posts, en_posts);
  res.end(xml)
}

function generateSiteMap(http : string,host : string,pt_posts : MetaPage[], en_posts: MetaPage[]) {

    const pt_posts_ = pt_posts.map( post => (
      `<url>
          <loc>${http}://${host}${post.link}</loc>
        </url>
      `
    )).join("");

    const en_posts_ = en_posts.map( post => (
      `<url>
          <loc>${http}://${host}${post.link}</loc>
        </url>
      `
    )).join("");


    return (
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

        <url>
          <loc>${http}://${host}</loc>
        </url>

        <url>
          <loc>${http}://${host}/pt</loc>
        </url>

        <url>
          <loc>${http}://${host}/about</loc>
        </url>

        <url>
          <loc>${http}://${host}/pt/sobre</loc>
        </url>

        ${pt_posts_}

        ${en_posts_}

    </urlset>`)
}

