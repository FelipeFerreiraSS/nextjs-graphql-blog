import Link from 'next/link';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant='h1'>Home</Typography>
        <div>
          <Link href={"/blog/"}>
              <Button variant="contained">Blog</Button>
          </Link>
        </div>
      </Container>
    </>
  );
}


