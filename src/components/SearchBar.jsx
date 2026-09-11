function SearchBar({ value, onChange }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-5xl sm:text-7x1 font-medium text-white leading-none tracking-tight mt-8 mb-6">
        Find Movies
      </h1>
      <input
        type="text"
        placeholder="Search by title"
        value={value}
        onChange={onChange}
        className="w-full max-w-xl mx-auto block px-5 py-3 rounded-full border border-white/10 bg-white/10 text-white text-base sm:text-lg outline-none backdrop-blur-lg placeholder:text-white/40 transition-colors focus:border-brand-600/90 focus:ring-4 focus:ring-brand-600/20"
      />
    </div>
  );
}

export default SearchBar;
