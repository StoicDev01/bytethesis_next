import Article from "@app/components/Article";

import ReactMarkdown from 'react-markdown'
import { MetaPage } from "@app/lib/MetaPage";

const content = <ReactMarkdown> 
{
`Bytethesis um site sobre programação e tecnologia. Aqui você encontrará uma variedade de conteúdos incluindo novidades e tutoriais, o objetivo desse blog é compartilhar conhecimento e aprender no caminho.

## Autor
Email: ryan.costasousa01@gmail.com`
}
</ReactMarkdown>

const page : MetaPage = {
    author : "Ryan",
    categories : [],
    date : "2023-04-24",
    link : "/about",
    summary : "Bytethesis um site sobre programação e tecnologia. Aqui você encontrará uma variedade de conteúdos incluindo novidades e tutoriais",
    content : content,
    title : "About"
}

export default function about(){

    return ( 
        <Article page={page}/>
    )
}