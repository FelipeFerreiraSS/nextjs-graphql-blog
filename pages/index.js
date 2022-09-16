import Link from 'next/link';

export default function Home() {

  return (
    <>
      <div>
        <h1>Home</h1>
        <div>
          <Link href={"/blog/"}>
              <button>Blog</button>
          </Link>
        </div>
      </div>
    </>
  );
}


