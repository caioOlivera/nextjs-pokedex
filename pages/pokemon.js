import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function pokemon({ pokeman }) {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name}>
      <div className="mx-auto w-3/5 bg-slate-100 border-2 border-black rounded flex flex-col items-center">
        <p className=" font-bold text-center mt-4">N°{pokeman.id} </p>
        <h1 className="text-4xl mb-2 text-center capitalize font-bold">
          {pokeman.name}
        </h1>
        <img className="h-96 w-96" src={pokeman.image} alt={pokeman.name} />
      </div>
      <h2 className="text-xl mt-6 mb-2">Info:</h2>
      <p>
        <span className="font-bold mr-2">Weight:</span>
        {(pokeman.weight / 10).toFixed(2)} Kg
      </p>
      <span className="font-bold mr-2">Height:</span>
      {(pokeman.height / 10).toFixed(2)} m
      <h2 className="text-xl mt-6 mb-2">Type(s):</h2>
      {pokeman.types.map((type, index) => (
        <p key="index" className="capitalize">
          • {type.type.name}
        </p>
      ))}
      <p className="mt-10 text-center">
        <Link href="/">
          <a className="text-2xl bg-red-600 text-zinc-50 rounded-sm p-2">
            Home
          </a>
        </Link>
      </p>
    </Layout>
  );
}

//server side rendered page
// in theory we dont need to use SSR and request data every time, we could do all static but this is fun
export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
