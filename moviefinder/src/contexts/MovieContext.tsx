import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

interface ContextType {
  favorites: MovieObject[];
  addToFavorites: (movie: MovieObject) => void;
  removeFromFavorites: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
}

interface MovieProviderProps {
  children: ReactNode;
}

interface MovieObject {
  poster_path: string;
  id: string;
  title: string;
  release_date: string;
}

const MovieContext = createContext({} as ContextType);

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [favorites, setFavorites] = useState<MovieObject[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: MovieObject) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: string) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: string) => {
    return favorites.some((movie: MovieObject) => movie.id === movieId);
  };

  const contextValue: ContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
