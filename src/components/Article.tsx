import Image from "next/image"
import Link from "next/link"

import styles from "@app/styles/Article.module.css"
import { MetaPage } from "@app/lib/MetaPage"

interface Props {
    page : MetaPage
}

export default function Article(props : Props){

    return (
        <div className={styles.main_article} >
            <div className={styles.main_wrapper}>
                <div className={styles.article}>
                    <header className={`article-header ${styles.canvas}`}>
                        { props.page.imageLink && (
                            <Image
                                className={styles.article_banner}
                                src={props.page.imageLink}
                                alt={"keywrod"}
                                width={720}
                                height={405}
                            />
                        )}

                        { props.page.author && props.page.date && (
                            <span className={`${styles.article_meta} bold uppercase`}>
                                <a className="meta-author not-accentued"> {props.page.author }</a> 
                                /
                                <time className="meta-time" dateTime="2022-10-15"> {props.page.date}</time>
                                /
                                { props.page.categories && props.page.categories.map( (category) => (
                                    <Link 
                                        key={category} 
                                        className="accentued2" 
                                        href={`/categories/${category}`}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </span>
                        )}
                        

                        <h1 className={`${styles.article_title}`}>{props.page.title}</h1>
                    </header>
                    
                    { props.page.contentHtml && (
                        <div className={`${styles.article_content} ${styles.canvas}`}
                            dangerouslySetInnerHTML={{
                                __html : props.page.contentHtml
                            }}
                        >
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}