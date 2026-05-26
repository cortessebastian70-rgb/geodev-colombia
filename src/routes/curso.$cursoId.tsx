import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/curso/$cursoId")({ component: CursoPage });

const cursosData: Record<string, {
  title: string;
  lecciones: { id: number; titulo: string; duracion: string; youtubeId: string; libre: boolean }[];
}> = {
  "1": {
    title: "ArcGIS Básico",
    lecciones: [
      { id: 1, titulo: "Introducción a ArcGIS", duracion: "8 min", youtubeId: "4Ujyh4Q0vJw", libre: true },
      { id: 2, titulo: "Interfaz y herramientas básicas", duracion: "12 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
      { id: 3, titulo: "Capas y simbología", duracion: "15 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
      { id: 4, titulo: "Edición de datos vectoriales", duracion: "18 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
      { id: 5, titulo: "Análisis espacial básico", duracion: "20 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
    ],
  },
  "2": {
    title: "ArcGIS Catastro – Intermedio",
    lecciones: [
      { id: 1, titulo: "Fundamentos de catastro", duracion: "10 min", youtubeId: "4Ujyh4Q0vJw", libre: true },
      { id: 2, titulo: "Normativa catastral Colombia", duracion: "14 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
      { id: 3, titulo: "Predios y registros", duracion: "16 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
      { id: 4, titulo: "Integración con ArcGIS", duracion: "22 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
    ],
  },
  "3": {
    title: "Tool Skills – ArcToolbox",
    lecciones: [
      { id: 1, titulo: "¿Qué es ArcToolbox?", duracion: "7 min", youtubeId: "4Ujyh4Q0vJw", libre: true },
      { id: 2, titulo: "Herramientas de análisis", duracion: "13 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
      { id: 3, titulo: "Geoprocesamiento", duracion: "17 min", youtubeId: "4Ujyh4Q0vJw", libre: false },
    ],
  },
};

function CursoPage() {
  const { cursoId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const curso = cursosData[cursoId];
  const [leccionActiva, setLeccionActiva] = useState(0);
  const [completadas, setCompletadas] = useState<number[]>([]);

  useEffect(() => {
    if (!user) navigate({ to: "/auth" });
  }, [user, navigate]);

  if (!user || !curso) return null;

  const leccion = curso.lecciones[leccionActiva];
  const progreso = Math.round((completadas.length / curso.lecciones.length) * 100);

  const marcarCompletada = (id: number) => {
    if (!completadas.includes(id)) setCompletadas([...completadas, id]);
  };

  return (
    <div className="min-h-screen bg-[#0B1E2D] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#3DDC84]/15 bg-[#0F2A3A] px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition text-sm"
        >
          <ArrowLeft size={16} /> Volver al dashboard
        </button>
        <div className="h-5 w-px bg-[#3DDC84]/20" />
        <h1 className="font-bold text-white text-sm md:text-base truncate">{curso.title}</h1>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-[#94A3B8]">{progreso}% completado</span>
          <div className="w-24 h-2 rounded-full bg-[#0B1E2D] overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#3DDC84] to-[#00C9FF]" style={{ width: `${progreso}%` }} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Video area */}
        <main className="flex-1 p-4 md:p-8 flex flex-col">
          {/* YouTube embed */}
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#3DDC84]/15 bg-black">
            <iframe
              key={leccion.youtubeId + leccionActiva}
              src={`https://www.youtube.com/embed/${leccion.youtubeId}?rel=0&modestbranding=1`}
              title={leccion.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Lesson info */}
          <div className="mt-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-[#3DDC84] font-semibold uppercase tracking-wider">
                Lección {leccionActiva + 1} de {curso.lecciones.length}
              </p>
              <h2 className="text-xl font-bold mt-1">{leccion.titulo}</h2>
              <p className="text-sm text-[#94A3B8] mt-1">Duración: {leccion.duracion}</p>
            </div>
            <button
              onClick={() => {
                marcarCompletada(leccion.id);
                if (leccionActiva < curso.lecciones.length - 1) setLeccionActiva(leccionActiva + 1);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#3DDC84] to-[#00C9FF] text-[#0B1E2D] font-semibold text-sm hover:brightness-110 transition"
            >
              <CheckCircle size={16} />
              {completadas.includes(leccion.id) ? "Siguiente lección" : "Marcar como completada"}
            </button>
          </div>
        </main>

        {/* Sidebar lecciones */}
        <aside className="md:w-80 border-t md:border-t-0 md:border-l border-[#3DDC84]/15 bg-[#0F2A3A] p-4 overflow-y-auto">
          <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider mb-4">Contenido del curso</h3>
          <div className="flex flex-col gap-2">
            {curso.lecciones.map((l, i) => {
              const isActive = i === leccionActiva;
              const isDone = completadas.includes(l.id);
              return (
                <button
                  key={l.id}
                  onClick={() => setLeccionActiva(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                    isActive
                      ? "bg-[#3DDC84]/15 border border-[#3DDC84]/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="shrink-0">
                    {isDone ? (
                      <CheckCircle size={18} className="text-[#3DDC84]" />
                    ) : isActive ? (
                      <PlayCircle size={18} className="text-[#3DDC84]" />
                    ) : l.libre ? (
                      <Circle size={18} className="text-[#94A3B8]" />
                    ) : (
                      <Lock size={18} className="text-[#94A3B8]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-[#94A3B8]"}`}>
                      {l.titulo}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{l.duracion}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
