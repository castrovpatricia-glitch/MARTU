"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Block from "@/components/ds/Block";
import Button from "@/components/ds/Button";
import Field from "@/components/ds/Field";
import Input from "@/components/ds/Input";
import Select from "@/components/ds/Select";
import MoneyInput from "@/components/ds/MoneyInput";
import DoodleIcon from "@/components/doodles/DoodleIcon";
import { completeOnboarding } from "@/lib/repo";
import { loadDemoData } from "@/lib/demoData";
import { toMinor } from "@/lib/format";
import type { MainGoal } from "@/lib/types";

const CURRENCIES = [
  { code: "ARS", label: "ARS — Peso argentino" },
  { code: "USD", label: "USD — Dólar estadounidense" },
  { code: "EUR", label: "EUR — Euro" },
  { code: "MXN", label: "MXN — Peso mexicano" },
  { code: "CLP", label: "CLP — Peso chileno" },
  { code: "COP", label: "COP — Peso colombiano" },
  { code: "UYU", label: "UYU — Peso uruguayo" },
  { code: "PEN", label: "PEN — Sol peruano" },
  { code: "BRL", label: "BRL — Real brasileño" },
  { code: "GBP", label: "GBP — Libra esterlina" },
];

type Step = "welcome" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | "loading";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [currency, setCurrency] = useState("ARS");
  const [currentMoney, setCurrentMoney] = useState("");
  const [savings, setSavings] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [payday, setPayday] = useState("1");
  const [mainGoal, setMainGoal] = useState<MainGoal>("ambas");
  const [savingsTarget, setSavingsTarget] = useState("");

  async function startDemo() {
    setStep("loading");
    await loadDemoData();
    router.replace("/");
  }

  async function finish() {
    setStep("loading");
    await completeOnboarding({
      currency,
      locale: "es-AR",
      initialBalance: toMinor(parseFloat(currentMoney || "0")),
      initialSavings: toMinor(parseFloat(savings || "0")),
      monthlyIncomeEstimate: toMinor(parseFloat(monthlyIncome || "0")),
      payday: parseInt(payday || "1", 10),
      mainGoal,
      monthlySavingsTarget: toMinor(parseFloat(savingsTarget || "0")),
      isDemo: false,
    });
    router.replace("/");
  }

  const totalSteps = 7;
  const stepNum = typeof step === "number" ? step : 0;

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {step === "welcome" && (
          <Block color="yellow" shadow="lg" className="text-center flex flex-col items-center gap-5 py-10">
            <DoodleIcon name="star" size={44} />
            <h1 className="font-display text-5xl sm:text-6xl leading-[0.95]">MARTU</h1>
            <p className="font-hand text-3xl sm:text-4xl -mt-2">
              tu revista financiera personal
            </p>
            <p className="font-mono text-xs max-w-xs opacity-70">
              WHERE DID MY MONEY GO? Registrá tus gastos, entendé tus hábitos y cuidá tus ahorros. Sin bancos, sin login, todo en tu teléfono.
            </p>
            <div className="flex flex-col gap-3 w-full mt-3">
              <Button size="lg" full onClick={() => setStep(1)}>
                Empezar de cero
              </Button>
              <Button size="lg" full variant="outline" onClick={startDemo}>
                Ver demo primero
              </Button>
            </div>
          </Block>
        )}

        {step === "loading" && (
          <Block color="lime" shadow="lg" className="text-center py-16">
            <p className="font-hand text-3xl animate-pulse">armando tu primer mes…</p>
          </Block>
        )}

        {typeof step === "number" && (
          <Block color="cream" shadow="lg" className="flex flex-col gap-6">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 border border-ink ${i < stepNum ? "bg-ink" : "bg-white"}`}
                />
              ))}
            </div>

            {step === 1 && (
              <StepBody title="¿Cuál es tu moneda principal?">
                <Select value={currency} onChange={(e) => setCurrency(e.target.value)} autoFocus>
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </StepBody>
            )}

            {step === 2 && (
              <StepBody title="¿Cuánto dinero tenés actualmente?" subtitle="Sumá todo lo que tenés disponible: banco, billetera virtual, efectivo.">
                <MoneyInput value={currentMoney} onChange={setCurrentMoney} currencySymbol={currencySymbolFor(currency)} autoFocus />
              </StepBody>
            )}

            {step === 3 && (
              <StepBody title="¿Cuánto tenés ahorrado?" subtitle="Lo que ya guardaste aparte, sin contar la plata del día a día.">
                <MoneyInput value={savings} onChange={setSavings} currencySymbol={currencySymbolFor(currency)} autoFocus />
              </StepBody>
            )}

            {step === 4 && (
              <StepBody title="¿Cuánto ganás aproximadamente por mes?">
                <MoneyInput value={monthlyIncome} onChange={setMonthlyIncome} currencySymbol={currencySymbolFor(currency)} autoFocus />
              </StepBody>
            )}

            {step === 5 && (
              <StepBody title="¿Qué día solés cobrar?">
                <Field label="Día del mes">
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    value={payday}
                    onChange={(e) => setPayday(e.target.value)}
                    autoFocus
                  />
                </Field>
              </StepBody>
            )}

            {step === 6 && (
              <StepBody title="¿Cuál es tu objetivo principal?">
                <div className="flex flex-col gap-2.5">
                  {(
                    [
                      { value: "ahorrar", label: "Ahorrar" },
                      { value: "controlar", label: "Controlar gastos" },
                      { value: "ambas", label: "Ambas" },
                    ] as { value: MainGoal; label: string }[]
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setMainGoal(opt.value)}
                      className={`border-2 border-ink px-4 py-3 text-left font-sans font-bold press-down ${
                        mainGoal === opt.value ? "bg-ink text-paper shadow-hard-sm" : "bg-white"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </StepBody>
            )}

            {step === 7 && (
              <StepBody title="¿Cuánto te gustaría ahorrar por mes?">
                <MoneyInput value={savingsTarget} onChange={setSavingsTarget} currencySymbol={currencySymbolFor(currency)} autoFocus />
              </StepBody>
            )}

            <div className="flex gap-3">
              {stepNum > 1 && (
                <Button variant="outline" onClick={() => setStep((stepNum - 1) as Step)}>
                  Atrás
                </Button>
              )}
              {stepNum < totalSteps ? (
                <Button full onClick={() => setStep((stepNum + 1) as Step)}>
                  Siguiente
                </Button>
              ) : (
                <Button full color="lime" onClick={finish}>
                  Empezar
                </Button>
              )}
            </div>
          </Block>
        )}
      </div>
    </div>
  );
}

function StepBody({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-2xl sm:text-3xl leading-tight">{title}</h2>
      {subtitle && <p className="font-mono text-xs opacity-70">{subtitle}</p>}
      {children}
    </div>
  );
}

function currencySymbolFor(currency: string): string {
  try {
    const parts = new Intl.NumberFormat("es-AR", { style: "currency", currency }).formatToParts(0);
    return parts.find((p) => p.type === "currency")?.value ?? "$";
  } catch {
    return "$";
  }
}
