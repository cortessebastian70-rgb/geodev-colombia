import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GeoLogo } from "@/components/GeoLogo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const [view, setView] = useState<"login" | "forgot" | "sent">("login");

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-70px)] hero-gradient relative flex items-center justify-center px-4 py-16">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative w-full max-w-md">
          <div className="card-geo p-8 animate-fade-up">
            <div className="flex justify-center mb-6">
              <GeoLogo />
            </div>

            {view === "login" && (
              <>
                <h2 className="text-center text-lg font-bold text-white mb-6">Iniciar Sesion</h2>
                <LoginForm onForgot={() => setView("forgot")} />
              </>
            )}

            {view === "forgot" && (
              <>
                <button
                  onClick={() => setView("login")}
                  className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-white mb-4 transition"
                >
                  <ArrowLeft size={14} /> Volver
                </button>
                <h2 className="text-center text-lg font-bold text-white mb-2">Recuperar contraseña</h2>
                <p className="text-center text-xs text-[#94A3B8] mb-6">
                  Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <ForgotForm onSent={() => setView("sent")} />
              </>
            )}

            {view === "sent" && (
              <div className="flex flex-col items-center gap-4 py-4">
                <CheckCircle size={48} className="text-[#3DDC84]" />
                <h2 className="text-lg font-bold text-white">¡Revisa tu email!</h2>
                <p className="text-center text-sm text-[#94A3B8]">
                  Te enviamos un enlace para restablecer tu contraseña. Revisa también tu carpeta de spam.
                </p>
                <button
                  onClick={() => setView("login")}
                  className="mt-2 text-xs text-[#14B8A6] hover:text-[#3DDC84] transition"
                >
                  Volver al inicio de sesión
                </button>
              </div>
            )}
          </div>
          <p className="text-center text-xs text-[#64748B] mt-6">
            <Link to="/" className="hover:text-[#3DDC84]">← Volver al inicio</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

function Field({ icon: Icon, error, children }: { icon: any; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className={`flex items-center gap-2 px-3 rounded-xl bg-[#0B1E2D]/60 border ${error ? "border-red-500/60" : "border-[#3DDC84]/20 focus-within:border-[#3DDC84]"}`}>
        <Icon size={16} className="text-[#94A3B8] shrink-0" />
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls = "w-full bg-transparent py-3 text-sm text-white placeholder:text-[#64748B] outline-none";

function LoginForm({ onForgot }: { onForgot: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();
  const [show, setShow] = useState(false);
  const [authError, setAuthError] = useState("");
  const { login } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    setAuthError("");
    const { error } = await login(data.email, data.password);
    if (error) {
      setAuthError("Email o contraseña incorrectos");
    } else {
      window.location.href = "/dashboard";
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field icon={Mail} error={errors.email?.message}>
        <input
          type="email"
          placeholder="Email"
          className={inputCls}
          {...register("email", {
            required: "Email requerido",
            pattern: { value: /^\S+@\S+$/i, message: "Email invalido" }
          })}
        />
      </Field>
      <Field icon={Lock} error={errors.password?.message}>
        <input
          type={show ? "text" : "password"}
          placeholder="Contrasena"
          className={inputCls}
          {...register("password", {
            required: "Contrasena requerida",
            minLength: { value: 6, message: "Minimo 6 caracteres" }
          })}
        />
        <button type="button" onClick={() => setShow(!show)} className="text-[#94A3B8] pr-1">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </Field>
      {authError && <p className="text-xs text-red-400 text-center">{authError}</p>}
      <div className="text-right">
        <button
          type="button"
          onClick={onForgot}
          className="text-xs text-[#14B8A6] hover:text-[#3DDC84] transition"
        >
          Olvide mi contrasena
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-brand text-[#0B1E2D] font-semibold hover:brightness-110 transition"
      >
        Entrar
      </button>
    </form>
  );
}

function ForgotForm({ onSent }: { onSent: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError("No se pudo enviar el email. Intenta de nuevo.");
    } else {
      onSent();
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field icon={Mail} error={errors.email?.message}>
        <input
          type="email"
          placeholder="Tu email"
          className={inputCls}
          {...register("email", {
            required: "Email requerido",
            pattern: { value: /^\S+@\S+$/i, message: "Email invalido" }
          })}
        />
      </Field>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-brand text-[#0B1E2D] font-semibold hover:brightness-110 transition disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar enlace"}
      </button>
    </form>
  );
}
