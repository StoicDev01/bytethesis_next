import RSS from 'rss';
import fs from "fs";
import { MetaPage } from './MetaPage';

export default async function generateRssFeed(host : string, language : string, enPosts : MetaPage[], ptPosts : MetaPage[]) {
 const site_url = host;

 const feedOptions = {
    title: 'Bytethesis.one',
    description: 'Tech, Programming, Machine learning blog',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/favicon.ico`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
 };

 const enFeed = new RSS(feedOptions);
 const ptFeed = new RSS(feedOptions);

 enPosts.map( (post) => {
    enFeed.item({
        date : post.date,
        description : post.summary,
        title : post.title,
        url : post.link,
        author : post.author
    })
 })

 ptPosts.map( (post) => {
    ptFeed.item({
        date : post.date,
        description : post.summary,
        title : post.title,
        url : post.link,
        author : post.author
    })
 })

 fs.writeFileSync(`./public/rss.xml`, enFeed.xml({ indent: true }));
 fs.writeFileSync(`./public/pt/rss.xml`, ptFeed.xml({indent : true}));
}