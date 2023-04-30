import fs from "fs"

export function isDirectory(path : string){
    return fs.lstatSync(path).isDirectory();
}

export function isFile(path : string){
    return fs.lstatSync(path).isFile();
}

