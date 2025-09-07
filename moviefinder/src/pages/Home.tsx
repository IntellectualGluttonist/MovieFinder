import MovieCard from "../components/MovieCard";
import { useEffect, useState, type FormEvent } from "react";
import { getSearchMovies, getPopularMovies } from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load Movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await getSearchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home m-[15px]">
      <form
        onSubmit={handleSearch}
        className="search-form flex place-content-between h-[45px]"
      >
        <input
          type="text"
          placeholder="Search For Movies"
          className="search-input bg-gray-600 w-full py-[10px] focus:border focus:border-push-purple outline-none box-border pl-5 rounded-[5px] text-gray-400"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <button
          type="submit"
          className="search-button text-push-purple bg-black ml-2 py-[10px] px-[20px] rounded-[5px] cursor-pointer hover:bg-push-purple hover:text-black"
        >
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={crypto.randomUUID()} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
