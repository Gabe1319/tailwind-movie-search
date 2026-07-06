function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  return (
    <div className="relative overflow-hidden min-h-96 rounded-3xl bg-white/10 border border-white/10 shadow-xl transition hover:-translate-y-1.5 hover:border-red-600/50 hover:shadow-2xl">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-72 object-cover block bg-neutral-800"
      />
      <h2 className="px-4 pt-4 pb-1.5 text-base leading-tight text-white">
        {movie.Title}
      </h2>
      <p className="px-4 pb-4 text-sm text-white/60">{movie.Year}</p>
      <button
        onClick={() => onToggleFavorite(movie)}
        className="absolute top-3 right-3 w-10 h-10 rounded-full border-0 bg-black/65 text-red-500 text-xl backdrop-blur cursor-pointer transition hover:scale-110 hover:bg-red-600 hover:text-white"
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  );
}

export default MovieCard;
