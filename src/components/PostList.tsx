import { MetaPage } from "@app/lib/MetaPage"
import Postblock from "../components/PostBlock"
import styles from "../styles/components/postlist.module.css"

interface Props {
    posts : MetaPage[]
}

export default function PostList(props : Props){
    return (
        <div className={styles.postlist}>
            { props.posts.map( (item) => (
                <Postblock post={item} key={item.title}/>
            ))}
        </div>
    )
}