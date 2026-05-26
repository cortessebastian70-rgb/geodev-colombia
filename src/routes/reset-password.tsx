import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GeoLogo } from "@/components/GeoLogo";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/reset-password")({ component: ResetPasswordPage });

function ResetPasswordPage() {
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase maneja el token desde el hash de la URL automáticamente
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-70px)] hero-gradient relative flex items-center justify-center px-4 py-16">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="relative w-full max-w-md">
          <div className="card-geo p-8 animate-fade-up">
            <div className="flex justify-center mb-6">
              <GeoLogo />
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <CheckCircle size={48} className="text-[#3DDC84]" />
                <h2 className="text-lg font-bold text-white">¡Contraseña actualizada!</h2>
                <p className="text-center text-sm text-[#94A3B8]">
                  Tu contraseña fue cambiada exitosamente.
                </p>
                <button
                  onClick={() => navigate({ to: "/auth" })}
                  className="mt-2 w-full py-3 rounded-xl bg-gradient-brand text-[#0B1E2D] font-semibold hover:brightness-110 transition"
                >
                  Ir a iniciar sesión
                </button>
              </div>
            ) : !ready ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <p className="text-sm text-[#94A3B8] text-center">Verificando enlace...</p>
              </div>
            ) : (
              <>
                <h2 className="text-center text-lg font-bold text-white mb-2">Nueva contraseña</h2>
                <p className="text-center text-xs text-[#94A3B8] mb-6">
                  Ingresa tu nueva contraseña.
                </p>
                <ResetForm onDone={() => setDone(true)} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ResetForm({ onDone }: { onDone: () => void }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<{ password: string; confirm: string }>();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({ password: data.password });
    setLoading(false);
    if (error) {
      setError("No se pudo actualizar la contraseña. Intenta de nuevo.");
    } else {
      onDone();
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <div className={`flex items-center gap-2 px-3 rounded-xl bg-[#0B1E2D]/60 border ${errors.password ? "border-red-500/60" : "border-[#3DDC84]/20 focus-within:border-[#3DDC84]"}`}>
          <Lock size={16} className="text-[#94A3B8] shrink-0" />
          <input
            type={show ? "text" : "password"}
            placeholder="Nueva contraseña"
            className="w-full bg-transparent py-3 text-sm text-white placeholder:text-[#64748B] outline-none"
            {...register("password", {
              required: "Contraseña requerida",
              minLength: { value: 6, message: "Mínimo 6 caracteres" }
            })}
          />
          <button type="button" onClick={() => setShow(!show)} className="text-[#94A3B8] pr-1">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
      </div>

      <div>
        <div className={`flex items-center gap-2 px-3 rounded-xl bg-[#0B1E2D]/60 border ${errors.confirm ? "border-red-500/60" : "border-[#3DDC84]/20 focus-within:border-[#3DDC84]"}`}>
          <Lock size={16} className="text-[#94A3B8] shrink-0" />
          <input
            type={show ? "text" : "password"}
            placeholder="Confirmar contraseña"
            className="w-full bg-transparent py-3 text-sm text-white placeholder:text-[#64748B] outline-none"
            {...register("confirm", {
              required: "Confirma tu contraseña",
              validate: (val) => val === watch("password") || "Las contraseñas no coinciden"
            })}
          />
        </div>
        {errors.confirm && <p className="mt-1 text-xs text-red-400">{errors.confirm.message}</p>}
      </div>

      {error && <p className="text-xs text-red-400 text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-brand text-[#0B1E2D] font-semibold hover:brightness-110 transition disabled:opacity-60"
      >
        {loading ? "Guardando..." : "Guardar nueva contraseña"}
      </button>
    </form>
  );
}