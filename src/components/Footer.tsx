import { Link } from "@tanstack/react-router";
import { Globe, Youtube, Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { GeoLogo } from "./GeoLogo";

export function Footer() {
  return (
    <footer className="bg-[#071520] border-t border-[#3DDC84]/15 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <GeoLogo />
            <p className="mt-4 text-sm text-[#94A3B8] max-w-xs">
              Transformando datos geoespaciales en soluciones tecnologicas. Servicios de drones, SIG, desarrollo web y formacion especializada.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegacion</h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link to="/" className="hover:text-[#3DDC84]">Inicio</Link></li>
              <li><Link to="/cursos" className="hover:text-[#3DDC84]">Cursos</Link></li>
              <li><Link to="/auth" className="hover:text-[#3DDC84]">Iniciar Sesion</Link></li>
              <li><a href="https://wa.me/573107320958" className="hover:text-[#3DDC84]">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3 text-sm text-[#94A3B8]">
              <li className="flex items-center gap-2"><Mail size={16} className="text-[#3DDC84]" /> jhonatancor95@gmail.com</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-[#3DDC84]" /> +57 310 732 0958</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-[#3DDC84]" /> Pasto, Narino, Colombia</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {[
            { href: "https://Globe.com", icon: Globe },
            { href: "https://youtube.com", icon: Youtube },
            { href: "https://linkedin.com", icon: Linkedin },
            { href: "https://wa.me/573107320958", icon: MessageCircle },
          ].map(({ href, icon: Icon }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-[#3DDC84]/30 flex items-center justify-center text-[#94A3B8] hover:bg-[#3DDC84] hover:text-[#0B1E2D] transition"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-[#64748B]">
          © 2026 GeoDev. Todos los derechos reservados. | Geografia · Programacion · Drones
        </div>
      </div>
    </footer>
  );
}
