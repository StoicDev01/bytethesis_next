import Postblock, { PageResume} from "../components/PostBlock"

interface Props {
    posts : PageResume[]
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