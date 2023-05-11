import path from "path";
import fs, { link } from "fs"

import Markdown from 'markdown-it';
import prism from 'markdown-it-prism'

import matter from "gray-matter";
import PostMetadata from "./PostMetadata";
import { MetaPage } from "./MetaPage";

import {convert} from "html-to-text"

function extractSummary(content : string){
  // extract text
  const text = convert(content)

  return text.substring(0, 400) + "...";
}


export async function getPostData(language : string, id  : string, withContent=false) : Promise<MetaPage> {
    const fullPath = path.join(`src/content/${language}`, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
  
    // Use remark to convert markdown into HTML string
    let contentHtml;

    const md = Markdown({
      html : true
    });

    md.use(prism)

    contentHtml = md.render(matterResult.content);

    const postMetadata  : PostMetadata = (matterResult.data) as PostMetadata;
    const postLink = `/${ language != "en" ? (language + "/") : ""}posts/${id}`;
    const summary = extractSummary(contentHtml);

  
    const newMetaPage :MetaPage = {
      ...postMetadata,
      summary : summary,
      link : postLink
    }

    if (withContent){
      newMetaPage.contentHtml = contentHtml;
    }

    return newMetaPage;
  }
  