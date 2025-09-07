import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useMovieContext();
  return (
    <>
      {favorites.length == 0 ? (
        <div className="favorite-empty flex justify-center">
          <div className="flex flex-col w-[500px] h-fit p-[45px] bg-gray-600 mt-[15px] rounded-[15px] text-center gap-5">
            <h2 className="text-push-purple text-2xl font-bold">
              No Favorite Movies Yet
            </h2>
            <p className="text-gray-400 text-2xl">
              Start adding movies to your favorites and they will appear here!
            </p>
          </div>
        </div>
      ) : (
        <div className="movies-grid m-[15px] mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(400px,0.25fr))] gap-4">
          {favorites.map((favorite) => (
            <MovieCard movie={favorite} key={crypto.randomUUID()} />
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
