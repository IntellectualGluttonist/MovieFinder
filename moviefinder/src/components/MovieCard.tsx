import type { MouseEventHandler } from "react";
import { useMovieContext } from "../contexts/MovieContext";

interface MovieObject {
  poster_path: string;
  id: string;
  title: string;
  release_date: string;
}

interface MovieCardProps {
  movie: MovieObject;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const onFavoriteClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };
  return (
    <div className="movie-card bg-gray-600 flex flex-col relative overflow-hidden h-full group rounded-[4px]">
      <div className="movie-poster flex w-full h-full relative aspect-[2/3]">
        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-end p-4 invisible group-hover:visible bg-[#00000080]">
          <button
            className={`favorite-btn absolute top-4 right-4 ${
              favorite ? "text-red-500" : "text-white"
            } text-[1.5rem] p-[0.5rem] bg-[#00000080] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center cursor-pointer`}
            onClick={onFavoriteClick}
          >
            &#9829;
          </button>
        </div>
      </div>
      <div className="movie-info p-4 flex flex-col flex-1 gap-2 bg-black group-hover:bg-push-purple ">
        <h3 className="text-push-purple font-bold group-hover:text-black">
          {movie.title}
        </h3>
        <p className="text-push-purple group-hover:text-black">
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
