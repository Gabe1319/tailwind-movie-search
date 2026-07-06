import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import useDebounce from "./hooks/useDebounce";
import useLocalStorage from "./hooks/useLocalStorage";

const API_KEY = "fad55766";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    let ignore = false;
    if (debouncedQuery.trim() === "") {
      setMovies([]);
      setError(null);
      setLoading(false);
      return () => {
        ignore = true;
      };
    }
    setLoading(true);
    setError(null);
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setMovies(data.Search || []);
        }
      })
      .catch((error) => {
        if (!ignore) {
          setError(error.message);
          setMovies([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });
  }, [debouncedQuery]);

  function toggleFavorite(movie) {
    const alreadyFavorite = favorites.some(
      (favorite) => favorite.imdbID === movie.imdbID,
    );
    if (alreadyFavorite) {
      setFavorites(
        favorites.filter((favorite) => favorite.imdbID !== movie.imdbID),
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <div className="min-h-screen w-full font-sans text-neutral-100 bg-linear-to-br from-red-950 via-neutral-900 to-black">
    <div className="max-w-[1180px] mx-auto px-6 py-12">
      <SearchBar
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="flex justify-center gap-3 mb-9">
        <button
          className="px-6 py-2.5 rounded-full border border-white/10 bg-white/10 text-neutral-100 text-md font-bold cursor-pointer transition hover:-translate-y-0.5 hover:bg-red-600 hover:border-red-600"
          onClick={() => setTab("all")}
        >
          All
        </button>
        <button
          className="px-6 py-2.5 rounded-full border border-white/10 bg-white/10 text-neutral-100 text-md font-bold cursor-pointer transition hover:-translate-y-0.5 hover:bg-red-600 hover:border-red-600"
          onClick={() => setTab("favorites")}
        >
          Favorites
        </button>
      </div>
      {tab === "favorites" ? (
        <div className="grid grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              movie={movie}
              onToggleFavorite={toggleFavorite}
              isFavorite={true}
              key={movie.imdbID}
            />
          ))}
        </div>
      ) : loading ? (
        <p className="text-center text-white/75 text-lg mt-8">Loading...</p>
      ) : error ? (
        <p className="text-center text-white/75 text-lg mt-8">{error}</p>
      ) : (
        <div className="grid grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.some(
                (favorite) => favorite.imdbID === movie.imdbID,
              )}
            />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
