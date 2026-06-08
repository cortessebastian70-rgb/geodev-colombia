import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, User, LifeBuoy, LogOut, PlayCircle } from "lucide-react";
import { GeoLogo } from "@/components/GeoLogo";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const myCourses = [
  { id: 1, title: "ArcGIS Basico", progress: 75, image: "/curso-1.jpeg" },
  { id: 2, title: "ArcGIS Catastro – Intermedio", progress: 40, image: "/curso-2.jpeg" },
  { id: 3, title: "Tool Skills – ArcToolbox", progress: 10, image: "/curso-3.jpeg" },
];

const WHATSAPP_NUMBER = "573107320958";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola! Necesito ayuda con GeoDev.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined" && !user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user) return null;

  const initials = (user.full_name || user.name || user.email).slice(0, 2).toUpperCase();
  const displayName = user.full_name || user.name;

  const navItems = [
    { icon: BookOpen, label: "Mis Cursos", action: () => navigate({ to: "/dashboard" }) },
    { icon: User, label: "Mi Perfil", action: () => navigate({ to: "/perfil" }) },
    { icon: LifeBuoy, label: "Soporte", action: () => window.open(WHATSAPP_URL, "_blank") },
  ];

  return (
    <div className="min-h-screen bg-[#0B1E2D] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 md:min-h-screen border-r border-[#3DDC84]/15 bg-[#0F2A3A] p-6 flex flex-col">
        <Link to="/"><GeoLogo /></Link>
        <nav className="mt-10 flex md:flex-col gap-1 flex-wrap">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition w-full text-left ${
                i === 0 ? "bg-[#3DDC84]/15 text-[#3DDC84]" : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => { logout(); navigate({ to: "/" }); }}
          className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-[#94A3B8] hover:text-white hover:bg-white/5"
        >
          <LogOut size={16} /> Cerrar sesion
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Hola, {displayName} 👋</h1>
            <p className="text-sm text-[#94A3B8] mt-1">Bienvenido de nuevo a tu plataforma de aprendizaje</p>
          </div>
          <button
            onClick={() => navigate({ to: "/perfil" })}
            className="w-11 h-11 rounded-full overflow-hidden hover:brightness-110 transition border-2 border-[#3DDC84]/40"
          >
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#3DDC84] to-[#00C9FF] text-[#0B1E2D] flex items-center justify-center font-bold">
                {initials}
              </div>
            )}
          </button>
        </header>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Mis Cursos</h2>
          <p className="text-sm text-[#94A3B8] mt-1">Continua donde lo dejaste</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {myCourses.map((c) => (
              <article key={c.id} className="card-geo p-6 flex flex-col">
                <div className="aspect-video rounded-xl overflow-hidden border border-[#3DDC84]/15">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-4 font-bold text-white">{c.title}</h3>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-[#94A3B8] mb-1.5">
                    <span>Progreso</span><span>{c.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0B1E2D] overflow-hidden">
                    <div className="h-full bg-gradient-brand" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <button
                  onClick={() => navigate({ to: "/curso/$cursoId", params: { cursoId: String(c.id) } })}
                  className="mt-5 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-brand text-[#0B1E2D] font-semibold text-sm hover:brightness-110 transition"
                >
                  <PlayCircle size={16} /> Iniciar
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}