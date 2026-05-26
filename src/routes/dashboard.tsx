import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookOpen, User, LifeBuoy, LogOut, PlayCircle, ShieldCheck, Map, Layers, Wrench } from "lucide-react";
import { GeoLogo } from "@/components/GeoLogo";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const myCourses = [
  { id: 1, title: "ArcGIS Basico", progress: 75, icon: Map },
  { id: 2, title: "ArcGIS Catastro – Intermedio", progress: 40, icon: Layers },
  { id: 3, title: "Tool Skills – ArcToolbox", progress: 10, icon: Wrench },
];

const navItems = [
  { icon: BookOpen, label: "Mis Cursos", to: "/dashboard" },
  { icon: User, label: "Mi Perfil", to: "/perfil" },
  { icon: LifeBuoy, label: "Soporte", to: "/dashboard" },
];

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined" && !user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user) return null;

  const initials = (user.full_name || user.name || user.email).slice(0, 2).toUpperCase();
  const displayName = user.full_name || user.name;

  return (
    <div className="min-h-screen bg-[#0B1E2D] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 md:min-h-screen border-r border-[#3DDC84]/15 bg-[#0F2A3A] p-6 flex flex-col">
        <Link to="/"><GeoLogo /></Link>
        <nav className="mt-10 flex md:flex-col gap-1 flex-wrap">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate({ to: item.to as any })}
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
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3DDC84]/15 text-[#3DDC84] text-xs font-semibold border border-[#3DDC84]/30">
              <ShieldCheck size={14} /> Cuenta Activa
            </span>
            <button
              onClick={() => navigate({ to: "/perfil" })}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3DDC84] to-[#00C9FF] text-[#0B1E2D] flex items-center justify-center font-bold hover:brightness-110 transition"
            >
              {initials}
            </button>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Mis Cursos</h2>
          <p className="text-sm text-[#94A3B8] mt-1">Continua donde lo dejaste</p>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myCourses.map((c) => (
              <article key={c.id} className="card-geo p-6 flex flex-col">
                <div className="h-32 rounded-xl bg-gradient-to-br from-[#0F3547] to-[#0B1E2D] border border-[#3DDC84]/15 flex items-center justify-center">
                  <c.icon size={48} className="text-[#3DDC84]" />
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