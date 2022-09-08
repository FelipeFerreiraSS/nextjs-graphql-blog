import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export default function Home({ posts }) {

  return (
    <div>
      {posts.map((post) => (
        <div>
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts {
          title
          slug
          date
          id
        }
      }
    `
  );

  return {
    props: {
      posts,
    },
  };
}
