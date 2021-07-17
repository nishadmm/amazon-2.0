import Head from "next/head";

import Header from "../components/Header";
import Banner from "../components/Banner";
import ProducFeed from "../components/ProducFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Shop Clever</title>
      </Head>

      {/* Header  */}
      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />

        {/* ProductFeed */}
        <ProducFeed products={products} />
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}
