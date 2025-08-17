"use client"

import React from "react"
import { WIZARD_STEPS } from "@/lib/wizard-data"
import useWizard from "@/hooks/useWizard"

const StepIndicator: React.FC = () => {
  const { state } = useWizard()

  return (
    <div className="glass rounded-2xl px-3 py-4 border border-white/10 overflow-x-auto">
      <ol className="flex items-center gap-4 min-w-max">
        {WIZARD_STEPS.map((step, idx) => {
          const active = state.currentStep === step.id
          const done = state.currentStep > step.id

          return (
            <li key={step.id} className="flex items-center gap-3 shrink-0">
              <div
                className={[
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
                  done
                    ? "bg-green-500 text-white"
                    : active
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-gray-300",
                ].join(" ")}
              >
                {step.id}
              </div>

              <div className="pr-4">
                <p
                  className={[
                    "text-xs sm:text-sm whitespace-nowrap",
                    active ? "text-white font-semibold" : "text-gray-300",
                  ].join(" ")}
                >
                  {step.title}
                </p>
                <p className="hidden md:block text-xs text-gray-400 max-w-[260px] truncate">
                  {step.description}
                </p>
              </div>

              {idx < WIZARD_STEPS.length - 1 && (
                <div className="h-px w-10 sm:w-16 md:w-20 bg-white/10" />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default StepIndicator
