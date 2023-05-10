import { MetaPage } from '@app/lib/MetaPage';
import Header from '../components/Header';
import PostList from '../components/PostList';
import { getAllPosts } from '@app/lib/GetAllPosts';
import { GetStaticProps } from 'next';

interface Props{
  children : React.ReactNode;
  postData : MetaPage[];
}


export const getStaticProps: GetStaticProps = async (context) => {
  // Add the "await" keyword like this:
  let postData = await getAllPosts("en");

  return {
    props: {
      postData : postData
    },
  };
}

export default function Home(props : Props) {

  return (
    <>
      <div id="main-list" className='outer'>
        <div className='page-feed inner'>
          <PostList posts={props.postData}/>
        </div>
      </div>
    </>
  );
};