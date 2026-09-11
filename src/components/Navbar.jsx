import { useState } from "react"

function Navbar({tab, setTab}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return(
    <header className="w=full border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-[1180px] mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-white">
        Movie<span className="text-brand-500">Find</span>
        </span>
        <nav className="hidden md:flex items-center gap-8">
          <button className={`text sm font-semibold transition-colors cursor-pointer ${
            tab === "all"
            ? "text-brand-500"
            : "text-white/70 hover:text-white"
          }`}
          onClick={() => setTab("all")}>
            All Movies
          </button>
          <button className={`text sm font-semibold transition-colors cursor-pointer ${
            tab === "favorites"
            ? "text-brand-500"
            : "text-white/70 hover:text-white"
          }`}
          onClick={() => setTab("favorites")}>
            Favorites
          </button>
          <button 
          className="md:hidden w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/10 text-white cursor-pointer" 
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
          </button>

        </nav>
        {menuOpen && (
          <div classname="md:hidden flex flex-col gap 1 px-6 pb-4">
            


          </div>
        )}

      </div>

    </header>
  )

}

export default Navbar