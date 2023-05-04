export interface MetaPage {
    title : string;
    link : string;
    imageLink? : string;
    keyword? : string;
    categories : string[];
    date : string;
    author : string;
    summary : string;
    content? : JSX.Element;
    contentHtml ? : string;
    isPrivate? : boolean;
}