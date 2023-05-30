import styles from "../styles/components/postblock.module.css"

import Link from "next/link";
import Image from "next/image";
import { MetaPage } from "@app/lib/MetaPage";


export function getPageContent(metaPage : MetaPage){
    return "content."
}

interface Props { 
    post : MetaPage;
}

export default function PostBlock(props : Props){

    return (
        <div className={[styles.post_block, "shadow2", "round"].join(" ")}>
            <div className={styles.post_block_wrapper}>

                { props.post.imageLink && (
                    <div className={styles.post_block_image_wrapper}>
                        <Link href={props.post.link}
                        
                            style={{
                                display : "block"
                            }}
                        >
                            <Image 
                                className={styles.post_block_image} 
                                src={props.post.imageLink}
                                alt={props.post.keyword || ""}
                                width={558}
                                height={314}
                            >

                            </Image>
                        </Link>
                    </div>
                )}

                <div className={styles.post_block_content_wrapper}>
                    <div className={styles.post_block_tags}>
                        <span className="tags">
                            { props.post.categories.map( (item) => (
                                <Link 
                                    className="accentued"
                                    href={`/${item}`}
                                    key={item}
                                >
                                    {item}
                                </Link>                              
                            ))}
                        </span>
                    </div>
            
                    <div>
                        <h2 className={styles.post_block_title}>
                            <Link className="not-accentued" href={props.post.link}>
                                { props.post.title }
                            </Link>
                        </h2>
                    </div>
            
                    <div className={styles.post_block_excerpt}>
                        {props.post.summary}
                    </div>
            
                    <time className={styles.post_block_date}>
                        {props.post.date}
                    </time>
                </div>
            </div>
        </div>
    )
}