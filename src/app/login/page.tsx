"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Block from "@/components/ds/Block";
import Button from "@/components/ds/Button";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import DoodleIcon from "@/components/doodles/DoodleIcon";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  async function submit() {
    if (!supabase) return;
    setLoading(true);
    setError(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else if (!data.session) setCheckEmail(true);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <Block color="yellow" shadow="lg" className="text-center flex flex-col items-center gap-4 py-10">
          <DoodleIcon name="star" size={40} />
          <h1 className="font-display font-bold text-4xl">MARTU</h1>

          {checkEmail ? (
            <p className="font-hand text-2xl">Revisá tu email para confirmar la cuenta ✉️</p>
          ) : (
            <div className="w-full flex flex-col gap-4 mt-2">
              <Field label="Email" required>
                <Input
                  type="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vos@email.com"
                />
              </Field>
              <Field label="Contraseña" required>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="••••••••"
                />
              </Field>
              {error && <p className="font-mono text-xs text-orange">{error}</p>}
              <Button size="lg" full onClick={submit} disabled={loading || !email || !password}>
                {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
              </Button>
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-mono text-xs underline underline-offset-2"
              >
                {mode === "signin" ? "¿No tenés cuenta? Creá una" : "¿Ya tenés cuenta? Iniciá sesión"}
              </button>
            </div>
          )}
        </Block>
      </div>
    </div>
  );
}
