import fs from "fs"
import { MetaPage } from "./MetaPage";

export default function generateSiteMap(http : string,host : string,pt_posts : MetaPage[], en_posts: MetaPage[]) {

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


    let sitemap = 
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
    </urlset>`

    fs.writeFileSync("./public/sitemap.xml", sitemap);
}

