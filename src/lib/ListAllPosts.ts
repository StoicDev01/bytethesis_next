import path from "path";
import fs from "fs";
import { isFile } from "./FileUtils";


export function listAllPosts(language : string){
    const languagepath = path.join("src/content/", language);

    const items = fs.readdirSync(languagepath);
    const PostList = [];

    for (const item of items){
        const ItemPath = path.join(languagepath, item);

        if (isFile(ItemPath)){
            const postFile = ItemPath;
            PostList.push(path.basename(postFile, ".md"));
        }
    }

    return PostList;
}