import Article from "@app/components/Article";

import { GetStaticProps } from "next";
import { MetaPage } from "@app/lib/MetaPage";
import { getPostData } from "@app/lib/GetPostData";

interface Props {
    page : MetaPage
}

export const getStaticProps : GetStaticProps  = async ( context) => {

    const page = await getPostData("en", "about", true);

    return {
        props: {
            page
        }
    }
}

export default function About(props : Props){

    return ( 
        <Article page={props.page}/>
    )
}