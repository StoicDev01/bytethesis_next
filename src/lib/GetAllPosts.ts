import path from "path";
import fs from "fs";

import matter from "gray-matter";
import { MetaPage } from "./MetaPage";
import PostMetadata from "./PostMetadata";
import { getPostData } from "./GetPostData";

function isDirectory(path : string){
    return fs.lstatSync(path).isDirectory();
}

function isFile(path : string){
    return fs.lstatSync(path).isFile();
}



export async function getAllPosts(language : string){
    const languagepath = path.join("src/content/", language);

    const items = fs.readdirSync(languagepath);
    const MetaPages : MetaPage[] = [];

    for (const item of items){
        const ItemPath = path.join(languagepath, item);

        if (isFile(ItemPath)){
            const postFile = ItemPath;

            if (isFile(postFile)){
                const newMetaPage = await getPostData(language, path.basename(postFile, ".md"));
                MetaPages.push(newMetaPage);
            }
        }
    }

    return MetaPages;
}