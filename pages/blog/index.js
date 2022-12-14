import Image from 'next/image'
import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

import LinksTags from '../../components/LinksTags';

export default function Posts({ posts }) {
  return (
    <div>
      <LinksTags />
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:max-w-none lg:py-10">
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="group relative cursor-pointer">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={post.coverImage.url}
                        alt="teste"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h1 className="mt-2 text-3xl text-gray-100">
                      {post.title}
                    </h1>
                    <p className="text-sm font-semibold text-gray-300 mb-8 mt-2">{post.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>   
    </div>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts {
          id
          tags
          title
          slug
          coverImage {
            url(transformation: {image: {resize: {width: 800, height: 400, fit: crop}}})
          }
          date
          authors {
            name
            picture {
              url(transformation: {image: {resize: {height: 50, width: 50}}})
            }
          }
          description
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
