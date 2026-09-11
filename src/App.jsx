import { useState, useEffect, useLayoutEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import useDebounce from "./hooks/useDebounce";
import useLocalStorage from "./hooks/useLocalStorage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const API_KEY = "4998676d";


function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [theme, setTheme] = useLocalStorage("theme", "dark")
  const [tab, setTab] = useState("all");

  function toggleTheme() {
  setTheme(theme === "dark" ? "light" : "dark");
}

  useLayoutEffect(() =>
    document.documentElement.classList.toggle("dark", theme === "dark")
), [theme]

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
    <div className="flex flex-col min-h-screen w-full font-sans text-neutral-100 bg-linear-to-br from-brand-950 via-neutral-900 to-black">
      <Navbar tab={tab} setTab={setTab} theme={theme} onToggletheme={toggleTheme}/>
      <main className="flex-1">
        <div className="max-w-[1180px] mx-auto px-6 pt-12 pb-20">
          <SearchBar
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          {tab === "favorites" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
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
          ) : query.trim() === "" ?(
          <p className="text-center text-white/75 text-lg mt-8">
            Start typing above to discover movies and shows.
          </p>

          ):(
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
