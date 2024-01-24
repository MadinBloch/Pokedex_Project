function Search() {
  return (
    <div className="flex items-center justify-center mt-4">
      <input
        type="text"
        placeholder="Search Pokemon"
        className="p-3 w-full max-w-md border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
      <button className="ml-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
        Search
      </button>
    </div>
  );
}

export default Search;
