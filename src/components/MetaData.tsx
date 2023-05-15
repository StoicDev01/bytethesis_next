import { MetaPage } from "@app/lib/MetaPage"
import Head from "next/head"

interface Props {
    page : MetaPage
}

export default function MetaData(props : Props ){

    return (
        <Head>
            <title>{props.page.title}</title>
            <meta name="description" content={props.page.summary}/>
            <meta property="og:title" content={props.page.title} />
            <meta
                property="og:description"
                content={props.page.summary}
            />

            {props.page.imageLink && (
                <meta
                    property="og:image"
                    content={props.page.imageLink}
                />
            )}
        </Head>
    )
}