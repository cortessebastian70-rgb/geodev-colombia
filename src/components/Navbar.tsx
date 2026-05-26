import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, X, LogOut } from "lucide-react";
import { GeoLogo } from "./GeoLogo";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/cursos", label: "Cursos" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "glass-nav" : "bg-[#0B1E2D]/60 backdrop-blur-md border-b border-transparent"
      }`}
      style={{ height: 70 }}
    >
      <nav className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <GeoLogo />
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-white hover:text-[#3DDC84] transition-colors"
              activeProps={{ className: "text-[#3DDC84]" }}
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-3 py-2 text-sm font-medium text-white hover:text-[#3DDC84]"
              >
                Mi Panel
              </Link>
              <button
                onClick={() => { logout(); router.navigate({ to: "/" }); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white border border-[#3DDC84]/40 hover:bg-[#3DDC84]/10 transition"
              >
                <LogOut size={16} /> Salir
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 rounded-full bg-gradient-brand text-[#0B1E2D] font-semibold text-sm hover:brightness-110 hover:scale-105 transition shadow-lg shadow-[#3DDC84]/20"
            >
              Iniciar Sesion
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-[#0F2A3A] border-l border-[#3DDC84]/20 p-6 flex flex-col gap-2 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <GeoLogo />
              <button onClick={() => setOpen(false)} className="text-white"><X /></button>
            </div>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-white hover:bg-[#3DDC84]/10"
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg text-white hover:bg-[#3DDC84]/10">Mi Panel</Link>
                <button
                  onClick={() => { logout(); setOpen(false); router.navigate({ to: "/" }); }}
                  className="mt-2 px-4 py-3 rounded-full bg-gradient-brand text-[#0B1E2D] font-semibold"
                >Salir</button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-3 rounded-full bg-gradient-brand text-[#0B1E2D] font-semibold"
              >Iniciar Sesion</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
