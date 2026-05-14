"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/auth";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

const fieldClass =
  "h-12 w-full rounded-[8px] border border-[var(--line)] bg-[#fffdf8] px-4 text-[15px] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition placeholder:text-[#a59a90] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(155,108,255,0.16)]";

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
    <div className="relative min-h-dvh overflow-hidden bg-[var(--bg)] px-4 py-6 text-[var(--text)] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(201,148,63,0.16),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(155,108,255,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(rgba(36,33,29,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(36,33,29,0.035)_1px,transparent_1px)] [background-size:28px_28px]" />

      <main className="relative mx-auto grid min-h-[calc(100dvh-48px)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_460px] lg:gap-14">
        <section className="hidden lg:block">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(201,148,63,0.32)] bg-[#fff8eb]/80 px-4 py-2 text-sm font-medium text-[#7a5a24] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
            Life Alchemy
          </div>

          <h1 className="max-w-[620px] text-[56px] font-black leading-[1.06] tracking-normal text-[#221f1a]">
            把日常小事
            <span className="block text-[var(--accent)]">炼成宝石</span>
          </h1>

          <p className="mt-6 max-w-[520px] text-lg leading-8 text-[var(--muted)]">
            记录行动、情绪和成长瞬间，让每一件微小完成都拥有可见的价值。
          </p>

          <div className="mt-10 grid max-w-[560px] grid-cols-3 gap-3">
            {["每日记录", "宝石收藏", "成长复盘"].map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-[var(--line)] bg-[#fffdf8]/78 px-4 py-3 text-sm font-semibold text-[#51483e] shadow-sm backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[460px]">
          <div className="mb-5 text-center lg:hidden">
            <p className="text-sm font-semibold text-[var(--gold)]">Life Alchemy</p>
            <h1 className="mt-2 text-3xl font-black text-[#221f1a]">人生炼金术</h1>
          </div>

          <Card className="rounded-[8px] bg-[#fffdf8]/94 p-6 shadow-[0_18px_50px_rgba(63,48,31,0.12)] backdrop-blur sm:p-9">
            <div className="text-center">
              <p className="text-sm font-semibold text-[var(--gold)]">
                {isSignUp ? "创建账户" : "欢迎回来"}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-normal sm:text-[28px]">
                {isSignUp ? "创建你的炼金账户" : "登录你的炼金账户"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                人生炼金术，把日常小事炼成宝石
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51483e]">
                  邮箱
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#51483e]">
                  密码
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                  placeholder="至少 6 位"
                />
              </div>

              {error && (
                <p className="rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-[8px] text-base shadow-[0_10px_24px_rgba(155,108,255,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "处理中..." : isSignUp ? "开始炼金" : "进入工坊"}
              </Button>
            </form>

            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="mt-5 w-full text-center text-sm font-medium text-[var(--muted)] transition hover:text-[var(--accent)] hover:underline"
            >
              {isSignUp ? "已有账号？登录" : "没有账号？注册"}
            </button>
          </Card>
        </section>
      </main>
    </div>
  );
}
