"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/auth";

const inputClass =
  "h-14 w-full rounded-[12px] border border-[#ded6ce] bg-white/72 px-12 text-[16px] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition placeholder:text-[#9c948c] focus:border-[var(--accent)] focus:bg-white focus:ring-4 focus:ring-[rgba(155,108,255,0.16)] lg:text-[15px]";

const featureCards = [
  {
    title: "每日记录",
    text: "捕捉每一次微小行动与心情变化",
    icon: "calendar",
    tone: "gold",
  },
  {
    title: "宝石收藏",
    text: "将收获的能量凝结为独一无二的宝石",
    icon: "gem",
    tone: "violet",
  },
  {
    title: "成长复盘",
    text: "回顾成长轨迹，看见更好的自己",
    icon: "sprout",
    tone: "gold",
  },
];

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-grid h-12 w-12 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffe0a6,#b98aff_48%,#6c50d8)] shadow-[0_10px_24px_rgba(130,88,210,0.24)] ${className}`}
    >
      <span className="h-7 w-5 rotate-45 rounded-[4px] bg-white/55 shadow-[inset_0_0_12px_rgba(255,255,255,0.75)]" />
    </span>
  );
}

function Icon({ name }: { name: string }) {
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <path
          d="M7 3v3M17 3v3M4.5 9h15M7.5 13l3 3 6-6M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (name === "sprout") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <path
          d="M12 20V10M12 10C9 6 6.5 5 3.5 5c0 4 2.5 7 8.5 5ZM12 10c3-4 5.5-5 8.5-5 0 4-2.5 7-8.5 5Z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
      <path
        d="M6.5 4.5h11L21 9l-9 10L3 9l3.5-4.5ZM3 9h18M8 4.5 6.5 9 12 19l5.5-10L16 4.5M8.5 9 12 4.5 15.5 9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    setSubmitting(true);

    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.error) {
        setError(result.error.message);
      } else if (isSignUp && !result.data.session) {
        setSuccess("注册成功！请检查邮箱并点击确认链接，然后返回登录。");
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
    <div className="relative min-h-dvh overflow-hidden bg-[#fbf6ed] text-[var(--text)]">
      <div className="absolute inset-0 bg-[url('/alchemy-hero.png')] bg-cover bg-[center_top] opacity-95 lg:bg-center" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,241,0.06),rgba(255,250,241,0.1)_52%,rgba(255,246,238,0.42)),linear-gradient(90deg,rgba(255,250,241,0.16),rgba(246,232,255,0.16))] lg:bg-[linear-gradient(90deg,rgba(255,250,241,0.24),rgba(255,250,241,0.14)_44%,rgba(246,232,255,0.18))]" />
      <div className="absolute inset-[1px] rounded-[18px] border border-[#d3b47b]/55" />

      <main className="relative mx-auto flex min-h-dvh w-full max-w-[1720px] flex-col px-5 py-8 sm:px-10 lg:px-12 lg:py-7 xl:px-16">
        <header className="flex items-start justify-between">
          <div className="flex items-center gap-3 lg:gap-4">
            <LogoMark className="h-14 w-14 lg:h-12 lg:w-12" />
            <div>
              <p className="font-serif text-[27px] font-semibold leading-none text-[#211b16] lg:text-[26px]">
                Life Alchemy
              </p>
              <p className="mt-2 text-[19px] text-[#5f554c] lg:text-base">
                人生炼金术
              </p>
            </div>
          </div>
          <span className="mt-3 text-5xl leading-none text-[#c18423] lg:hidden">
            ✧
          </span>
          <a
            href="#about"
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium text-[#2e2925] transition hover:bg-white/50 lg:flex"
          >
            <span className="text-[var(--accent)]">✧</span>
            关于 Life Alchemy
          </a>
        </header>

        <section className="grid flex-1 gap-5 pt-12 pb-5 lg:grid-cols-[minmax(560px,1fr)_minmax(440px,610px)] lg:items-center lg:gap-10 lg:py-0 xl:gap-16">
          <div className="mx-auto w-full max-w-[720px] pt-1 lg:mx-0 lg:pt-4">
            <div className="mb-6 hidden items-center gap-2 rounded-full border border-[#d8b46e] bg-white/45 px-5 py-2 text-base font-semibold text-[#c18423] shadow-sm backdrop-blur lg:inline-flex">
              <span>✧</span>
              Life Alchemy
            </div>

            <h1 className="text-center text-[clamp(48px,14vw,78px)] font-black leading-[1.05] tracking-normal text-[#241b13] lg:text-left lg:text-[clamp(52px,5.8vw,92px)] lg:leading-[1.03]">
              把日常小事
              <span className="block bg-[linear-gradient(180deg,#b186ff,#8b5cf6)] bg-clip-text text-transparent">
                炼成宝石
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[560px] text-[20px] leading-9 text-[#5e5752] lg:mx-0 lg:mt-7 lg:text-xl">
              记录行动、情绪和成长瞬间，
              <br />
              让每一件微小完成都拥有可见的价值。
            </p>

            <div className="mt-[260px] overflow-hidden rounded-[24px] border border-white/70 bg-white/76 shadow-[0_18px_46px_rgba(75,55,35,0.12)] backdrop-blur-md sm:mt-[300px] md:grid md:max-w-[720px] md:grid-cols-3 md:gap-4 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-0 lg:mt-8">
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  className="flex min-h-[112px] items-center gap-4 border-b border-[#eadfd3] px-5 py-4 last:border-b-0 md:min-h-[118px] md:rounded-[12px] md:border md:border-[#e8ded2] md:bg-white/68 md:p-4 md:shadow-[0_12px_30px_rgba(64,45,25,0.08)] md:backdrop-blur"
                >
                  <div
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-full md:h-16 md:w-16 ${
                      card.tone === "violet"
                        ? "bg-[#eee7ff] text-[var(--accent)]"
                        : "bg-[#fff0cf] text-[#c18423]"
                    }`}
                  >
                    <Icon name={card.icon} />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-black text-[#241f1b] md:text-base md:font-bold">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-6 text-[#6b625a] md:text-sm">
                      {card.text}
                    </p>
                  </div>
                  <span className="ml-auto text-3xl text-[#b19d8b] md:hidden">
                    ›
                  </span>
                </div>
              ))}
            </div>
          </div>

          <section className="mx-auto w-full max-w-[610px]">
            <div className="rounded-[26px] border border-white/70 bg-white/72 px-7 py-9 shadow-[0_22px_64px_rgba(75,55,35,0.14)] backdrop-blur-xl sm:px-12 lg:rounded-[18px] lg:border-white/60 lg:bg-white/62 lg:px-14 lg:py-10 lg:shadow-[0_28px_80px_rgba(75,55,35,0.16)]">
              <div className="text-center">
                <p className="text-[18px] font-bold text-[#c18423] lg:text-base">
                  <span className="mr-3 text-[#c18423] lg:hidden">✦</span>
                  {isSignUp ? "创建账户" : "欢迎回来"}
                  <span className="ml-2 text-[#c18423]">✦</span>
                </p>
                <h2 className="mt-4 text-[clamp(34px,9vw,48px)] font-black leading-tight tracking-normal text-[#241b13] lg:text-[clamp(32px,3vw,44px)]">
                  {isSignUp ? "创建你的炼金账户" : "登录你的炼金账户"}
                </h2>
                <p className="mt-3 text-[19px] text-[#746b64] lg:text-lg">
                  人生炼金术，把日常小事炼成宝石
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4 lg:mt-9 lg:space-y-6">
                <div>
                  <label className="mb-3 hidden text-base font-bold text-[#241f1b] lg:block">
                    邮箱
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#827a73]">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path
                          d="M4.5 6.5h15v11h-15v-11ZM5 7l7 6 7-6"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 hidden text-base font-bold text-[#241f1b] lg:block">
                    密码
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#827a73]">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path
                          d="M7.5 10V8a4.5 4.5 0 0 1 9 0v2M6.5 10h11v9h-11v-9Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClass} pr-12`}
                      placeholder="至少 6 位"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#827a73] transition hover:text-[var(--accent)]"
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                        <path
                          d="M3.5 12s3-5 8.5-5 8.5 5 8.5 5-3 5-8.5 5-8.5-5-8.5-5Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.7"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between pt-1 text-[17px] lg:text-sm">
                    <label className="flex cursor-pointer items-center gap-2 text-[#5f5750]">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-5 w-5 rounded border-[#cfc5bc] accent-[var(--accent)]"
                      />
                      记住我
                    </label>
                    <button
                      type="button"
                      className="font-semibold text-[var(--accent)] transition hover:underline"
                    >
                      忘记密码？
                    </button>
                  </div>
                )}

                {error && (
                  <p className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="rounded-[10px] border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-700">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="h-16 w-full rounded-[12px] bg-[linear-gradient(135deg,#8b5cf6,#9b6cff)] text-[22px] font-black text-white shadow-[0_18px_34px_rgba(139,92,246,0.32)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_42px_rgba(139,92,246,0.36)] disabled:cursor-not-allowed disabled:opacity-60 lg:text-xl"
                >
                  {submitting ? "处理中..." : isSignUp ? "开始炼金 ✧" : "进入工坊 ✧"}
                </button>
              </form>

              <div className="mt-6 flex items-center gap-4 text-center text-[17px] text-[#746b64] lg:mt-8 lg:gap-5 lg:text-base">
                <span className="h-px flex-1 bg-[#ded6ce]" />
                <span>
                  {isSignUp ? "已有账号？" : "没有账号？"}
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setError("");
                    }}
                    className="ml-2 font-semibold text-[var(--accent)] transition hover:underline"
                  >
                    {isSignUp ? "登录" : "注册"}
                  </button>
                </span>
                <span className="h-px flex-1 bg-[#ded6ce]" />
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
