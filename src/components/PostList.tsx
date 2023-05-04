import { MetaPage } from "@app/lib/MetaPage"
import Postblock from "../components/PostBlock"

interface Props {
    posts : MetaPage[]
}

export default function PostList(props : Props){
    return (
        <>
            { props.posts.map( (item) => (
                <Postblock post={item} key={item.title}/>
            ))}
        </>
    )
}