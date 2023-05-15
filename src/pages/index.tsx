import { MetaPage } from '@app/lib/MetaPage';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { getAllPosts } from '@app/lib/GetAllPosts';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPostData } from '@app/lib/GetPostData';
import MetaData from '@app/components/MetaData';

interface Props{
  children : React.ReactNode;
  postData : MetaPage[];
  metapage : MetaPage;
}


export const getStaticProps: GetStaticProps = async (context) => {
  // Add the "await" keyword like this:
  let postData = await getAllPosts("en");
  let metapage = await getPostData("en", "about");

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