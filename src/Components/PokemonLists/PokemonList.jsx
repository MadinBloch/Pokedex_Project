import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import LoaderComp from "../../LoaderComp";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexUrl, setpokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  async function downloadPokemon() {
    // setIsLoading = true;
    const respone = await axios.get(pokedexUrl); // Download 20 Pokemon
    const PokemonList = respone.data.results; // We get Array of Pokemon
    console.log(respone.data);

    setNextUrl(respone.data.next);
    setPrevUrl(respone.data.previous);

    // Iterating over the array of pokemon, and using their url, to create an array
    // of promises that will download those 20 pokemon
    const PokemonPromis = PokemonList.map((pokemon) => axios.get(pokemon.url));

    // Passing the promise array to axios.all
    const PokemonData = await axios.all(PokemonPromis); // array of 20 pokemon deatailed data

    // now iterate on the data of each pokemon, and extract id, name, image, type
    const results = PokemonData.map((pokemon) => {
      const PokemonReuslt = pokemon.data;
      return {
        id: PokemonReuslt.id,
        name: PokemonReuslt.name,
        image: PokemonReuslt.sprites.other
          ? PokemonReuslt.sprites.other.dream_world.front_default
          : PokemonReuslt.sprites.front_shiny,
        type: PokemonReuslt.types,
      };
    });
    setPokemonList(results);
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl);
        const pokemonList = response.data.results;

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        const pokemonPromises = pokemonList.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const pokemonData = await axios.all(pokemonPromises);

        const results = pokemonData.map((pokemon) => ({
          id: pokemon.data.id,
          name: pokemon.data.name,
          image: pokemon.data.sprites.other
            ? pokemon.data.sprites.other.dream_world.front_default
            : pokemon.data.sprites.front_shiny,
          type: pokemon.data.types,
        }));

        setPokemonList(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokedexUrl]);

  return (
    <>
      <div className="flex justify-between items-center flex-wrap  max-w-full h-screen object-cover">
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            {pokemonList.map((p) => (
              <Pokemon key={p.id} name={p.name} image={p.image} id={p.id} />
            ))}
          </>
        )}
        <div className="btn w-full flex items-center justify-center mt-5 h-[200px]">
          <button
            className="ml-2 py-3 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            disabled={!prevUrl}
            onClick={() => setpokedexUrl(prevUrl)}
          >
            Prev
          </button>

          <button
            className="ml-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            disabled={nextUrl === null}
            onClick={() => setpokedexUrl(nextUrl)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonList;
