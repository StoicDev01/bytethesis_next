import { GetStaticProps } from 'next'
import { getPostData } from '@app/lib/GetPostData';
import Article from '@app/components/Article';
import { MetaPage } from '@app/lib/MetaPage';
import { listAllPosts } from '@app/lib/ListAllPosts';

interface Props {
  pageData : MetaPage
}

export async function getStaticPaths() {

  const paths = listAllPosts("en").map( (id) => (
    {params : { id : id}}
  ))

  return {
    paths: paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    // Add the "await" keyword like this:
    let pageData = {};

    if (context.params){
        if (typeof context.params.id == "string"){
            pageData = (await getPostData("en",context.params.id, true)) as MetaPage;
        }
    }

    console.log(pageData)


    return {
      props: {
        pageData
      },
    };
}

export default function Post(props : Props){

    return (
      
        <Article  page={props.pageData}/>
    )
}