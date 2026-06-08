import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plane, Layers, MapPin, Code2, GraduationCap, Video,
  ShieldCheck, BookOpen, Lock, MessageCircle,
  ArrowRight, ChevronDown, Play, Award, CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GeoGlobeIcon } from "@/components/GeoLogo";
 
export const Route = createFileRoute("/")({ component: HomePage });
 
const services = [
  { icon: Plane, color: "#3DDC84", title: "Ortofotos Informativas", desc: "Captura aerea de alta precision para mapas ortorectificados. Ideal para planificacion territorial y analisis de cobertura.", tag: "RPAS · Fotogrametria" },
  { icon: Layers, color: "#14B8A6", title: "Fotogrametria con Dron", desc: "Modelos 3D, nubes de puntos y MDT a partir de vuelos fotogrametricos certificados por Aeronautica Civil.", tag: "3D · MDT · Nube de puntos" },
  { icon: MapPin, color: "#3DDC84", title: "Analisis SIG – ArcGIS & QGIS", desc: "Analisis viales, cobertura del suelo y proyectos fotovoltaicos. Diagnosticos territoriales con cartografia profesional.", tag: "ArcGIS · QGIS · Catastro" },
  { icon: Code2, color: "#14B8A6", title: "Desarrollo Web", desc: "Aplicaciones web modernas y plataformas a medida. Django + React para soluciones robustas y escalables.", tag: "Django · React · Python" },
  { icon: GraduationCap, color: "#3DDC84", title: "Clases Personalizadas SIG", desc: "Formacion en ArcGIS, QGIS y Excel aplicado a los SIG. Niveles basico, intermedio y avanzado con enfoque practico.", tag: "ArcGIS · QGIS · Excel SIG" },
  { icon: Video, color: "#14B8A6", title: "Produccion Audiovisual", desc: "Videos aereos profesionales para marketing, turismo, proyectos ambientales y comunicacion corporativa.", tag: "Dron · Video · Aerial" },
];
 
const advantages = [
  { icon: ShieldCheck, color: "#3DDC84", title: "Piloto RPAS Certificado", desc: "Operaciones aereas avaladas por la Aeronautica Civil de Colombia. Maxima calidad y seguridad en cada vuelo." },
  { icon: BookOpen, color: "#14B8A6", title: "Cursos 100% Practicos", desc: "Aprende haciendo con proyectos reales de SIG, catastro y analisis espacial. Metodologia aplicada al mundo laboral." },
  { icon: Lock, color: "#3DDC84", title: "Acceso Seguro y Personal", desc: "Tu cuenta activada al confirmar tu pago. Acceso ilimitado a los contenidos durante la vigencia del curso." },
  { icon: MessageCircle, color: "#14B8A6", title: "Soporte por WhatsApp", desc: "Resuelve tus dudas directamente con el instructor. Atencion personalizada durante todo tu proceso de aprendizaje." },
];
 
function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
 
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#3DDC84]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl" />
 
        <div className="relative max-w-7xl mx-auto w-full px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#3DDC84]/40 text-[#3DDC84] text-xs font-medium tracking-wider">
              Pasto · Narino · Colombia
            </span>
            <div className="mt-5 text-4xl lg:text-5xl font-bold text-white leading-tight flex items-center gap-3">
              <GeoGlobeIcon size={52} />
              <span><span className="text-[#3DDC84]">&lt;</span>GeoDev<span className="text-[#3DDC84]">/&gt;</span></span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#14B8A6]/80">
              Geografia · Programacion · Drones
            </p>
            <div className="mt-5 h-[3px] w-[60px] bg-gradient-brand rounded-full" />
            <p className="mt-6 text-[#94A3B8] text-base lg:text-lg max-w-xl leading-relaxed">
              Transformando datos geoespaciales en soluciones tecnologicas. Servicios profesionales de drones, SIG, desarrollo web y formacion especializada en ArcGIS y QGIS.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#servicios" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-brand text-[#0B1E2D] font-semibold hover:brightness-110 hover:scale-105 transition shadow-lg shadow-[#3DDC84]/20">
                Ver Servicios <ArrowRight size={18} />
              </a>
              <Link to="/cursos" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3DDC84] text-white font-semibold hover:bg-[#3DDC84]/10 transition">
                Ver Cursos
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5"><Award size={14} className="text-[#3DDC84]" /> Aeronautica Civil certificado</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#3DDC84]" /> +5 años experiencia</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#3DDC84]" /> Pago seguro</span>
            </div>
          </div>
 
          {/* RIGHT CARD */}
          <div className="animate-fade-up [animation-delay:200ms]">
            <div
              className="relative mx-auto max-w-md card-geo p-10 text-center"
              style={{ boxShadow: "0 0 80px rgba(61, 220, 132, 0.2)" }}
            >
              <div className="w-40 h-48 rounded-2xl mx-auto border-2 border-[#3DDC84]/40 overflow-hidden">
                <img
                  src="/jhonathan.jpeg"
                  alt="Jhonathan Cortes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-2xl font-bold text-white leading-tight">
                Jhonatan Alejandro<br />Cortes Ruano
              </div>
              <p className="mt-1 text-sm text-[#14B8A6] font-medium">
                Geografo · Piloto RPAS · Analista de Software
              </p>
              <div className="mt-4 text-xs text-[#94A3B8] leading-relaxed">
                +5 años de experiencia en geomática, drones certificados por Aeronáutica Civil, SIG y desarrollo web.
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Plane, label: "Dron" },
                  { icon: MapPin, label: "SIG" },
                  { icon: Code2, label: "Web" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-xl bg-[#0B1E2D]/70 border border-[#3DDC84]/15 p-4 flex flex-col items-center gap-2">
                    <Icon size={22} className="text-[#3DDC84]" />
                    <span className="text-xs font-semibold text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
 
        <a href="#servicios" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#94A3B8] animate-bounce-slow">
          <ChevronDown size={28} />
        </a>
      </section>
 
      {/* SERVICIOS */}
      <section id="servicios" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Nuestros Servicios</h2>
            <p className="mt-3 text-[#14B8A6]">Soluciones profesionales geoespaciales y tecnologicas</p>
            <div className="mt-5 mx-auto h-[3px] w-[80px] bg-gradient-brand rounded-full" />
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <article key={s.title} className="card-geo p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0B1E2D]/60 border border-[#3DDC84]/15">
                  <s.icon size={26} style={{ color: s.color }} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">{s.desc}</p>
                <span className="mt-5 inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#3DDC84]/10 text-[#3DDC84] border border-[#3DDC84]/20">
                  {s.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
 
      {/* VIDEO */}
      <section className="py-24 px-6 bg-[#0F2A3A]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#3DDC84] font-semibold">Conoce GeoDev</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-white">Descubre Nuestra Plataforma</h2>
          <p className="mt-3 text-[#94A3B8]">Mira como transformamos el territorio con tecnologia geoespacial</p>
          <div className="mt-10 mx-auto max-w-3xl rounded-2xl overflow-hidden border-2 border-[#3DDC84]/60 aspect-video bg-[#0B1E2D] relative shadow-2xl shadow-[#3DDC84]/10">
            {videoOpen ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="GeoDev"
                allow="accelerated-2d-canvas; autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <button onClick={() => setVideoOpen(true)} className="absolute inset-0 flex flex-col items-center justify-center gap-4 group">
                <div className="w-20 h-20 rounded-full bg-gradient-brand flex items-center justify-center group-hover:scale-110 transition shadow-xl shadow-[#3DDC84]/40">
                  <Play size={32} className="text-[#0B1E2D] ml-1" fill="#0B1E2D" />
                </div>
                <span className="text-white font-medium">Video de presentacion GeoDev</span>
              </button>
            )}
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {["100% Online", "Soporte Personalizado", "Certificacion incluida"].map((t) => (
              <div key={t} className="card-geo py-5 px-4">
                <CheckCircle2 className="mx-auto text-[#3DDC84]" size={22} />
                <p className="mt-2 text-sm font-semibold text-white">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* VENTAJAS */}
      <section className="py-24 px-6 hero-gradient">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Por que elegir GeoDev?</h2>
            <p className="mt-3 text-[#94A3B8]">Una plataforma disenada para profesionales y estudiantes de geografia y tecnologia</p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="card-geo p-7 flex gap-5">
                <div className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-[#0B1E2D]/60 border border-[#3DDC84]/15">
                  <a.icon size={26} style={{ color: a.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{a.title}</h3>
                  <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
 