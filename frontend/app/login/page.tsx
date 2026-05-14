"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/auth";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (!loading && user) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.error) {
        setError(result.error.message);
      } else {
        router.replace("/");
      }
    } catch {
      setError("操作失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-xl font-bold">
          {isSignUp ? "注册" : "登录"}
        </h1>
        <p className="mb-6 text-center text-sm text-gray-400">
          人生炼金术 - 把日常小事炼成宝石
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">邮箱</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">密码</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-white/30"
              placeholder="至少 6 位"
            />
          </div>

          {error && (
            <p className="text-center text-xs text-red-400">{error}</p>
          )}

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "处理中..." : isSignUp ? "注册" : "登录"}
          </Button>
        </form>

        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
          }}
          className="mt-4 w-full text-center text-xs text-gray-400 hover:text-white"
        >
          {isSignUp ? "已有账号？去登录" : "没有账号？去注册"}
        </button>
      </Card>
    </div>
  );
}
