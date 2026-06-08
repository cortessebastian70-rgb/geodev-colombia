import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, User, Briefcase, MapPin, FileText, Save, CheckCircle, Camera, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/perfil")({ component: PerfilPage });

interface ProfileForm {
  full_name: string;
  occupation: string;
  city: string;
  country: string;
  bio: string;
}

function PerfilPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProfileForm>();

  useEffect(() => {
    if (!user) { navigate({ to: "/auth" }); return; }
    reset({
      full_name: user.full_name ?? "",
      occupation: user.occupation ?? "",
      city: user.city ?? "",
      country: user.country ?? "",
      bio: user.bio ?? "",
    });
  }, [user, navigate, reset]);

  if (!user) return null;

  const initials = (user.full_name || user.email).slice(0, 2).toUpperCase();

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");
    const { error } = await updateProfile(data);
    setLoading(false);
    if (error) { setError("Error al guardar. Intenta de nuevo."); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  });

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError("");

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("La imagen debe pesar menos de 2 MB");
      return;
    }

    setUploadingPhoto(true);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await updateProfile({ avatar_url: urlWithTimestamp });
      if (updateError) throw new Error(updateError);
    } catch (err: any) {
      setPhotoError("Error al subir la foto. Intenta de nuevo.");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1E2D] text-white">
      {/* Header */}
      <header className="border-b border-[#3DDC84]/15 bg-[#0F2A3A] px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate({ to: "/dashboard" })}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition text-sm"
        >
          <ArrowLeft size={16} /> Volver al dashboard
        </button>
        <div className="h-5 w-px bg-[#3DDC84]/20" />
        <h1 className="font-bold text-white">Mi Perfil</h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-[#3DDC84]/40">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name || "Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3DDC84] to-[#00C9FF] text-[#0B1E2D] flex items-center justify-center text-3xl font-bold">
                  {initials}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingPhoto}
              className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-[#3DDC84] to-[#00C9FF] text-[#0B1E2D] flex items-center justify-center shadow-lg hover:brightness-110 transition disabled:opacity-60"
              aria-label="Cambiar foto"
            >
              {uploadingPhoto ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {photoError && <p className="text-xs text-red-400">{photoError}</p>}

          <div className="text-center">
            <h2 className="text-xl font-bold">{user.full_name || user.email}</h2>
            <p className="text-sm text-[#94A3B8]">{user.email}</p>
            {user.occupation && <p className="text-sm text-[#3DDC84] mt-0.5">{user.occupation}</p>}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="card-geo p-6 space-y-5">
            <h3 className="text-sm font-bold text-[#94A3B8] uppercase tracking-wider">Información personal</h3>

            <Field icon={User} label="Nombre completo" error={errors.full_name?.message}>
              <input
                placeholder="Tu nombre completo"
                className={inputCls}
                {...register("full_name", { required: "Nombre requerido" })}
              />
            </Field>

            <Field icon={Briefcase} label="Cargo / Ocupación" error={errors.occupation?.message}>
              <input
                placeholder="Ej: Reconocedor Catastral, Geógrafo..."
                className={inputCls}
                {...register("occupation")}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field icon={MapPin} label="Ciudad" error={errors.city?.message}>
                <input
                  placeholder="Tu ciudad"
                  className={inputCls}
                  {...register("city")}
                />
              </Field>
              <Field icon={MapPin} label="País" error={errors.country?.message}>
                <input
                  placeholder="Tu país"
                  className={inputCls}
                  {...register("country")}
                />
              </Field>
            </div>

            <Field icon={FileText} label="Sobre mí" error={errors.bio?.message}>
              <textarea
                placeholder="Cuéntanos un poco sobre ti..."
                rows={3}
                className={inputCls + " resize-none"}
                {...register("bio")}
              />
            </Field>
          </div>

          {error && <p className="text-xs text-red-400 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading || !isDirty}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3DDC84] to-[#00C9FF] text-[#0B1E2D] font-semibold hover:brightness-110 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saved ? (
              <><CheckCircle size={16} /> ¡Guardado!</>
            ) : loading ? (
              "Guardando..."
            ) : (
              <><Save size={16} /> Guardar cambios</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, error, children }: { icon: any; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-[#94A3B8] font-medium">{label}</label>
      <div className={`flex items-start gap-2 px-3 rounded-xl bg-[#0B1E2D]/60 border ${error ? "border-red-500/60" : "border-[#3DDC84]/20 focus-within:border-[#3DDC84]"} transition`}>
        <Icon size={16} className="text-[#94A3B8] shrink-0 mt-3" />
        {children}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls = "w-full bg-transparent py-3 text-sm text-white placeholder:text-[#64748B] outline-none";