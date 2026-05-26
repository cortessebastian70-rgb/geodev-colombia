import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

interface User {
  id: string;
  name: string;
  email: string;
  full_name?: string;
  occupation?: string;
  city?: string;
  country?: string;
  bio?: string;
  avatar_url?: string;
}

interface AuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchProfile = async (session: Session) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    const displayName = data?.full_name || session.user.email?.split("@")[0] || "Usuario";

    setUser({
      id: session.user.id,
      name: displayName,
      email: session.user.email ?? "",
      full_name: data?.full_name ?? "",
      occupation: data?.occupation ?? "",
      city: data?.city ?? "",
      country: data?.country ?? "",
      bio: data?.bio ?? "",
      avatar_url: data?.avatar_url ?? "",
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) fetchProfile(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) fetchProfile(session);
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) await fetchProfile(session);
  };

  const login = async (email: string, password: string) => {
    await supabase.auth.signOut();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { error: "No autenticado" };
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...data, updated_at: new Date().toISOString() });
    if (error) return { error: error.message };
    await refreshProfile();
    return { error: null };
  };

  return (
    <Ctx.Provider value={{ user, login, logout, updateProfile, refreshProfile }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be inside AuthProvider");
  return c;
}
