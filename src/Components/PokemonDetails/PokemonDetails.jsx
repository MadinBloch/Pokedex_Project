import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function pokemonDownload() {
    const respone = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: respone.data.name.toUpperCase(),
      image: respone.data.sprites.other
        ? respone.data.sprites.other.dream_world.front_default
        : respone.data.sprites.front_shiny,
      weight: respone.data.weight,
      height: respone.data.height,
      types: respone.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    pokemonDownload();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg p-8 mb-6">
      <div className="flex items-center justify-center mb-4">
        <img
          className="w-24 h-24 object-cover rounded-full border-4 border-blue-500"
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>
      <div className="text-center">
        <span className="text-3xl font-bold mb-4 capitalize">
          {pokemon.name}
        </span>
      </div>
      <div className="mb-2 text-center">
        <span className="font-bold text-gray-700">Height:</span>{" "}
        {pokemon.height} m
      </div>
      <div className="mb-2 text-center">
        <span className="font-bold text-gray-700">Weight:</span>{" "}
        {pokemon.weight} kg
      </div>
      <div className="mb-2 text-center">
        <span className="font-bold text-gray-700">Type:</span>{" "}
        {pokemon.types &&
          pokemon.types.map((t, index) => (
            <span
              key={index}
              className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-full capitalize"
            >
              {t}
            </span>
          ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
