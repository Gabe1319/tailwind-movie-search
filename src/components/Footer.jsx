function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10">
      <div className="max-w-[1180px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-white/60">
        <span className="font-semibold text-neutral-700 dark:text-white/80">
          Movie<span className="text-brand-500">Find</span>
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Github
          </a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
            Contact
          </a>
        </div>
        <span>&copy; {year} MovieFind</span>
      </div>
    </footer>
  );
}

export default Footer;
