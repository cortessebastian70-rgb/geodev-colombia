import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import {
  Map, Layers, Network, Grid3x3, ClipboardList, Workflow, Wrench,
  MousePointer2, CreditCard, MessageCircle, CheckCircle2, Clock, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/cursos")({ component: CoursesPage });

type Level = "Basico" | "Intermedio" | "Avanzado" | "Especializacion";

interface Course {
  id: string;
  category: "ArcGIS" | "Catastro" | "ArcToolbox";
  level: Level;
  title: string;
  desc: string;
  topics: string[];
  duration: string;
  icon: any;
  badge?: string;
}

const courses: Course[] = [
  { id: "arc-b", category: "ArcGIS", level: "Basico", title: "ArcGIS Basico", desc: "Introduccion al entorno ArcGIS Pro. Manejo de capas, proyecciones, simbologia y cartografia basica.", topics: ["Interface ArcGIS Pro", "Sistemas de Coordenadas", "Tabla de atributos", "Simbologia", "Layout y exportacion"], duration: "20 horas", icon: Map },
  { id: "arc-i", category: "ArcGIS", level: "Intermedio", title: "ArcGIS Intermedio", desc: "Analisis espacial, geoprocesamiento, uniones espaciales y edicion avanzada de geometrias.", topics: ["Geoprocesamiento", "Analisis de redes", "Edicion avanzada", "ModelBuilder basico", "Consultas espaciales"], duration: "24 horas", icon: Layers },
  { id: "arc-a", category: "ArcGIS", level: "Avanzado", title: "ArcGIS Avanzado", desc: "ModelBuilder avanzado, Python scripting con ArcPy, automatizacion de flujos y publicacion de servicios.", topics: ["ArcPy scripting", "ModelBuilder avanzado", "Servicios web", "Automatizacion", "Proyectos reales"], duration: "30 horas", icon: Network },
  { id: "cat-b", category: "Catastro", level: "Basico", title: "ArcGIS Catastro – Basico", desc: "Fundamentos catastrales en ArcGIS. Manejo de predios, bases alfanumericas y normativa colombiana.", topics: ["Estructura catastral", "Predios", "Bases IGAC", "Normativa", "Cartografia predial"], duration: "20 horas", icon: Grid3x3 },
  { id: "cat-i", category: "Catastro", level: "Intermedio", title: "ArcGIS Catastro – Intermedio", desc: "Analisis predial avanzado, actualizacion catastral multiproposito y validacion de geometrias.", topics: ["Actualizacion catastral", "LADM-COL", "Validacion topologica", "Analisis predial", "Informes"], duration: "24 horas", icon: ClipboardList },
  { id: "cat-a", category: "Catastro", level: "Avanzado", title: "ArcGIS Catastro – Avanzado", desc: "Catastro multiproposito, interoperabilidad LADM-COL, automatizacion con Python y publicacion de servicios.", topics: ["LADM-COL avanzado", "Python catastral", "ETL geoespacial", "Publicacion ArcGIS Server", "Proyectos reales"], duration: "32 horas", icon: Workflow },
  { id: "tool", category: "ArcToolbox", level: "Especializacion", badge: "NUEVO", title: "Tool Skills – ArcToolbox Especializado", desc: "Domina las herramientas especificas de ArcToolbox: analisis, conversion, gestion de datos y geoprocesamiento avanzado.", topics: ["Analysis Tools", "Conversion Tools", "Data Management", "Spatial Statistics", "Raster Analysis"], duration: "15 horas", icon: Wrench },
];

const filters = ["Todos", "ArcGIS", "Catastro", "ArcToolbox"] as const;
type Filter = typeof filters[number];

function levelBadge(level: Level) {
  const map: Record<Level, string> = {
    Basico: "bg-[#3DDC84]/15 text-[#3DDC84] border-[#3DDC84]/30",
    Intermedio: "bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/30",
    Avanzado: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Especializacion: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  };
  return map[level];
}

function CoursesPage() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const { user } = useAuth();
  const navigate = useNavigate();
  const list = filter === "Todos" ? courses : courses.filter((c) => c.category === filter);

  const enroll = () => {
    if (!user) navigate({ to: "/auth" });
    else alert("Inscripcion iniciada. Te contactaremos por WhatsApp.");
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative hero-gradient min-h-[50vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-5xl mx-auto py-20 text-center w-full animate-fade-up">
          <p className="text-xs text-[#94A3B8]">
            <Link to="/" className="hover:text-[#3DDC84]">Inicio</Link> <ChevronRight size={12} className="inline" /> Cursos
          </p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-white">Formacion Especializada en SIG</h1>
          <p className="mt-4 text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Domina ArcGIS, QGIS y las herramientas geoespaciales mas demandadas del mercado
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-6 -mt-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 bg-[#132F41] border border-[#3DDC84]/20 rounded-full p-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filter === f
                  ? "bg-gradient-brand text-[#0B1E2D]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >{f}</button>
          ))}
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c) => (
            <article key={c.id} className="card-geo flex flex-col overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-[#0B1E2D] to-[#0F3547] border-b border-[#3DDC84]/15 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3DDC84]">{c.category}</span>
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${levelBadge(c.level)}`}>{c.level}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1E2D]/60 border border-[#3DDC84]/15 flex items-center justify-center">
                    <c.icon size={24} className="text-[#3DDC84]" />
                  </div>
                  {c.badge && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gradient-brand text-[#0B1E2D]">{c.badge}</span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-[#94A3B8] line-clamp-2">{c.desc}</p>
                <ul className="mt-4 space-y-1.5 text-xs text-[#94A3B8]">
                  {c.topics.slice(0, 4).map((t) => (
                    <li key={t} className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#3DDC84] shrink-0" /> {t}</li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between text-xs text-[#94A3B8] border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {c.duration}</span>
                  <span>{c.topics.length} temas</span>
                </div>
                <button
                  onClick={enroll}
                  className="mt-5 w-full py-2.5 rounded-full bg-gradient-brand text-[#0B1E2D] font-semibold text-sm hover:brightness-110 hover:scale-[1.02] transition"
                >Inscribirse</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PAYMENT INFO */}
      <section className="px-6 py-20 bg-[#0F2A3A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center">Como inscribirte?</h2>
          <p className="mt-3 text-center text-[#94A3B8]">Cuatro pasos simples para acceder a tu formacion</p>

          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {[
              { icon: MousePointer2, t: "Selecciona tu curso" },
              { icon: CreditCard, t: "Realiza tu pago" },
              { icon: MessageCircle, t: "Envia tu comprobante" },
              { icon: CheckCircle2, t: "Accede a tu curso" },
            ].map((s, i) => (
              <div key={s.t} className="card-geo p-6 text-center relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-brand text-[#0B1E2D] flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <s.icon className="mx-auto text-[#3DDC84]" size={28} />
                <p className="mt-3 text-sm font-semibold text-white">{s.t}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="card-geo p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-300 font-bold flex items-center justify-center">D</div>
                <p className="font-bold text-white">DaviPlata</p>
              </div>
              <p className="mt-3 text-sm text-[#94A3B8]">Numero: <span className="text-white font-medium">310 732 0958</span></p>
              <p className="text-sm text-[#94A3B8]">Titular: Jhonatan A. Cortes R.</p>
            </div>
            <div className="card-geo p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center">N</div>
                <p className="font-bold text-white">Nequi</p>
              </div>
              <p className="mt-3 text-sm text-[#94A3B8]">Numero: <span className="text-white font-medium">310 732 0958</span></p>
              <p className="text-sm text-[#94A3B8]">Titular: Jhonatan A. Cortes R.</p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-[#94A3B8]">
            Una vez verificado tu pago, activamos tu cuenta en menos de 24 horas.
          </p>
        </div>
      </section>
    </Layout>
  );
}
