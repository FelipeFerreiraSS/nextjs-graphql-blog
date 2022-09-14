import { Box, Container, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import { GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';

import '../../styles/Home.module.css'

export default function Post({ post }) {

  return (
    <Container maxWidth="md">
      <div>
        <Link href={"/blog/"}>
          <button>Blog</button>
        </Link>
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          sx={{
            height: '100%',
            width: '85%',
            borderRadius: '10px',
          }}
          alt="The house from the offer."
          src={post.coverImage.url}
        />
      </Box>
      

      <Box>
        <div>
          
          <Box
            sx={{
              typography: 'h1',
              fontSize: '30px',
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: '30px',
              fontSize: { xs: 30, sm: 30, md: 40, lg: 50 },
            }}
          >
          
            {post.title}
          </Box>
        </div>
        
        <Box
          sx={{
            img: {
              maxWidth: { xs: 390, sm: 720, md: 850, lg: 850 },
              maxHeight: { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto' },
            }
          }}
          dangerouslySetInnerHTML={{ __html: post.contentHtml.html }} 
        />
      </Box>
    </Container>
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