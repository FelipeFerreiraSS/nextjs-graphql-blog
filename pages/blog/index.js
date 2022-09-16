import Image from 'next/image'
import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';

export default function Posts({ posts }) {
  return (
    <>
      <div>
          <div >
            <div>
                <Link href={"/"}>
                    <button>Home</button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/"}>
                    <button>Blog</button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/tags/html"}>
                    <button>HTML</button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/tags/css"}>
                    <button>CSS</button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/tags/javascript"}>
                    <button>Java Script</button>
                </Link>
            </div>
          </div>
            <div>
            {posts.map((post) => (
            <div key={post.id}>
              <div>
              <Link href={`/blog/${post.slug}`}>
                <div>
                  <Image
                    src={post.coverImage.url}
                    alt="Picture of the author"
                    width={200}
                    height={200}
                  />
                    
                  <div>
                    <h2>
                      {post.title}
                    </h2>
                    <p>
                      {post.description}
                    </p>
                  </div>
                </div>
                </Link>
                <div>
                  <div>
                    {post.authors[0].picture.url}
                    <div>
                      <p>
                        {post.authors[0].name}
                      </p>
                      <p>
                        {post.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            ))}
            </div>
          
      </div>
    </>
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
