import PostList from '../components/PostList';

import { MetaPage } from '@app/lib/MetaPage';
import { getAllPosts } from '@app/lib/GetAllPosts';
import { GetStaticProps } from 'next';
import { getPostData } from '@app/lib/GetPostData';

import MetaData from '@app/components/MetaData';
import generateRssFeed from '@app/lib/Rss';
import generateSiteMap from '@app/lib/Sitemap';

interface Props{
  children : React.ReactNode;
  postData : MetaPage[];
  metapage : MetaPage;
}


export const getStaticProps: GetStaticProps = async (context) => {
  // Add the "await" keyword like this:
  let postData = await getAllPosts("en");
  let ptPosts = await getAllPosts("pt");
  let metapage = await getPostData("en", "about");

  // generate rss feed
  generateRssFeed("bytethesis.one", "en",postData, ptPosts);
  generateSiteMap("https", "bytethesis.one", ptPosts, postData);
  
  metapage.title = "Bytethesis";

  return {
    props: {
      postData,
      metapage
    },
  };
}

export default function Home(props : Props) {
  return (
    <>
      <MetaData page={props.metapage}/>

      <div id="main-list" className='outer'>
        <div className='page-feed inner'>
          <PostList posts={props.postData}/>
        </div>
      </div>
    </>
  );
};