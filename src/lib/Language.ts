export interface Language {
    name : string;
    shortName : string;
  }
  
interface Traductions {
    [key : string] : { [key : string] : string }
}


export const languages : Language[] = [
    {
      name : "Português",
      shortName : "pt"
    },
    {
      name : "English",
      shortName : "en"
    }
]


export const traductions : Traductions = {
    "about" : {
      "en" : "about",
      "pt" : "sobre"
    },
  }
  
export function getTraduction(key : string, lang : string){
    if (traductions[key]){
      if (traductions[key][lang]){
        return traductions[key][lang]
      }
    }
  
    return "None."
  }
  