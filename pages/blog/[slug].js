import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';

//import styles from '../blog/Blog.module.css'

export default function Post({ post }) {

  return (
    <main>
      <div>
        <Link href={"/blog/"}>
          <button>Blog</button>
        </Link>
      </div>

      <div>
        <Image
          src={post.coverImage.url}
          alt="Picture of the author"
          width={200}
          height={200}
        />
        
      </div>
      

      <div>
        <div>
          
          <h1>
            {post.title}
          </h1>
        </div>
        
        <div
          dangerouslySetInnerHTML={{ __html: post.contentHtml.html }} 
        />
      </div>
    </main>
  )
}

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

export async function getStaticProps({ params }) {
  const { post } = await hygraph.request(
    `
    query Post($slug: String!) {
      post(where: { slug: $slug }) {
        title
        contentHtml {
          html
        }
        coverImage {
          url(transformation: {image: {resize: {width: 800, height: 400, fit: crop}}})
        }
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await hygraph.request(`
    {
      posts {
        slug
      }
    }
  `);

  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}