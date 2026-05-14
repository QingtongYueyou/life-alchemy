"use client";

import { AuthProvider } from "@/lib/supabase/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
