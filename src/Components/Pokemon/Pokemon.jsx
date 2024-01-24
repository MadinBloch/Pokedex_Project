import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
  const PokemonName = name.toUpperCase();

  return (
    <div className=" rounded overflow-hidden  m-6 p-5 transition-transform transform hover:scale-105">
      <Link to={`/pokemon/${id}`}>
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <div className="text-center">
          <div className="font-bold text-xl mb-2 text-gray-800">
            {PokemonName}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Pokemon;
