import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';

export default function Post({ post }) {
  
  return (
    <div>
      <Image 
        src={post.coverImage.url}
        alt={"image"}
        width={900} 
        height={400}
      />

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
          url(transformation: {image: {resize: {width: 900, height: 400, fit: crop}}})
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