import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';

export default function Post({ post }) {
  
  return (
    <div>
      <div>
        <Link href={"/"}>
          <button>Home</button>
        </Link>
      </div>

      <Image
        src={post.coverImage.url}
        alt="Landscape picture"
        width={800}
        height={400}
      />

      {/*<img src={post.coverImage.url} alt="Picture of the author"/>*/}

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
    </div>
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