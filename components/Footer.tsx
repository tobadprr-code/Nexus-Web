import Image from "next/image";
import { WHATSAPP_URL, WHATSAPP_DISPLAY, EMAIL, LOCATION } from "@/lib/constants";

const LINKS = [
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center">
              <Image src="/logo-full-dark.png" alt="NEXUS Dev" width={934} height={191} className="h-5 w-auto" />
            </div>
            <p className="mt-4 max-w-xs font-body text-sm text-ink-muted">
              Sistemas inteligentes para negocios que crecen.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-ink-dim">Navegación</p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-ink-muted transition-colors hover:text-nexus-green"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs text-ink-dim">Contacto</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-ink-muted transition-colors hover:text-nexus-green"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-body text-sm text-ink-muted transition-colors hover:text-nexus-green"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="font-body text-sm text-ink-muted">
                {LOCATION}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="font-mono text-xs text-ink-dim">
            © {new Date().getFullYear()} NEXUS Dev. Todos los derechos reservados.
          </p>
          <p className="font-mono text-xs text-ink-dim">
            Diseñado y desarrollado por Tobias Britez
          </p>
        </div>
      </div>
    </footer>
  );
}
