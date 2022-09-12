import Image from 'next/image'
import Link from 'next/link';
import { GraphQLClient } from 'graphql-request';
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';

export default function Posts({ posts }) {
  return (
    <>
      <Container maxWidth="lg">
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '30px', marginTop: '30px'}}>
            <div>
                <Link href={"/"}>
                    <Button variant="contained" sx={{ marginRight: '20px' }}>Home</Button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/"}>
                    <Button variant="contained" sx={{ marginRight: '20px' }}>Blog</Button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/tags/html"}>
                    <Button variant="contained" sx={{ marginRight: '20px' }}>HTML</Button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/tags/css"}>
                    <Button variant="contained" sx={{ marginRight: '20px' }}>CSS</Button>
                </Link>
            </div>
            <div>
                <Link href={"/blog/tags/javascript"}>
                    <Button variant="contained" sx={{ marginRight: '20px' }}>Java Script</Button>
                </Link>
            </div>
          </Box>
            <Grid container spacing={3}>
            {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={post.coverImage.url}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                </Link>
                <CardActions>
                  <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                    <Avatar src={post.authors[0].picture.url} />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        {post.authors[0].name}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary" component="p">
                        {post.date}
                      </Typography>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            ))}
            </Grid>
          
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_CONTENT_API);

  const { posts } = await hygraph.request(
    `
      {
        posts(where: {tags_contains_all: "JavaScript"}) {
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
