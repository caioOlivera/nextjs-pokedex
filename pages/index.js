import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import pokeball from "../public/pokeball-png-5a3a4a7e247ce7.9167778215137695981495.jpg";

export default function Home({ pokemon }) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center font-bold">NextJS Pokedex</h1>
      <h2 className="text-center">
        Made by Caio Oliveira. Inspired by James Q Quick video.
      </h2>
      <ul className="flex flex-wrap md: flex-col">
        {pokemon.map((pokeman, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border m-2 p-4 border-gray my-2 capitalize flex flex-col items-center text-lg bg-gray-200 rounded-md">
                <img
                  className="w-40 h-40 mr-3"
                  src={pokeman.image}
                  alt="Pokemon"
                />
                <span className="mr-2 font-bold">N°{index + 1}</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// with next we can export an async funtcion to determine wether the page will be static or ssr

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=494");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      // we are getting the index from the pokemon to pass it to the pokemon offical image url to grab it
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
