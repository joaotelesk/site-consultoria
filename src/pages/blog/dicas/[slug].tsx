// Components
import Head from "next/head";
import PostContent from "@/components/PostContent/PostContent";

// Utilities
// Interfaces

export default function PageSlug() {
  return (
    <>
      <Head>
        <title>Dicas Imigrei</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen py-0 ">
        <PostContent />
      </main>
    </>
  );
}
