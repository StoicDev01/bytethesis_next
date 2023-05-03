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

interface QueryOptions {
    sort : "none" | "date";
}

function sortByDate(metaPages : MetaPage[]){

    metaPages.sort((a,b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);

        if (aDate > bDate){
            return -1;
        }
        else if (aDate < bDate){
            return 1;
        }
        return 0;
    });

    return metaPages;
}

export async function getAllPosts(language : string, options : QueryOptions = { sort : "date"}){
    const languagepath = path.join("src/content/", language);

    const items = fs.readdirSync(languagepath);
    let MetaPages : MetaPage[] = [];

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

    if ( options.sort == "date"){
        MetaPages = sortByDate(MetaPages);
    }

    return MetaPages;
}