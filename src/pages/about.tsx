import Article from "@app/components/Article";

import { GetStaticProps } from "next";
import { MetaPage } from "@app/lib/MetaPage";
import { getPostData } from "@app/lib/GetPostData";

import Head from "next/head";
import MetaData from "@app/components/MetaData";

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
        <>
            <MetaData page={props.page}/>
            <Article page={props.page}/>
        </>
    )
}