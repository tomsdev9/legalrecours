"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import useWizard from "@/hooks/useWizard"
import { getContextFields, type ContextField } from "@/lib/wizard-data"
import type { Primitive } from "@/types/common"

const inputBase =
  "w-full rounded-xl bg-white text-[#222223] placeholder-gray-400 " +
  "border border-gray-300 px-3 py-2.5 text-sm " +
  "focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/40"

const selectBase =
  "w-full rounded-xl bg-white text-[#222223] " +
  "border border-gray-300 px-3 py-2.5 pr-10 text-sm appearance-none " +
  "focus:outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/40"

const FieldRenderer: React.FC<{
  field: ContextField
  value: Primitive | undefined
  onChange: (id: string, value: Primitive) => void
}> = ({ field, value, onChange }) => {
  const id = `ctx-${field.id}`

  switch (field.type) {
    case "text":
      return (
        <input
          id={id}
          type="text"
          className={inputBase}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          autoComplete="off"
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )

    case "number": {
      const str =
        typeof value === "number" || (typeof value === "string" && value !== "")
          ? String(value)
          : ""
      return (
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step="any"
          pattern="[0-9]*[.,]?[0-9]*"
          className={inputBase}
          placeholder={field.placeholder}
          value={str}
          onChange={(e) => {
            const v = e.target.value
            if (v === "") return onChange(field.id, "")
            const parsed = Number(v.replace(",", "."))
            onChange(field.id, isNaN(parsed) ? "" : parsed)
          }}
        />
      )
    }

    case "date":
      return (
        <input
          id={id}
          type="date"
          className={inputBase}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )

    case "textarea":
      return (
        <textarea
          id={id}
          className={`${inputBase} min-h-[110px]`}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )

    case "select":
      return (
        <div className="relative">
          <select
            id={id}
            className={selectBase}
            value={String(value ?? "")}
            onChange={(e) => onChange(field.id, e.target.value)}
          >
            <option value="" disabled hidden>
              -- Sélectionnez --
            </option>
            {field.options?.map((o) => (
              <option key={String(o.value)} value={String(o.value)}>
                {o.label}
              </option>
            ))}
          </select>
          {/* Chevron décoratif */}
          <svg
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.11l3.71-3.88a.75.75 0 1 1 1.08 1.04l-4.25 4.45a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
          </svg>
        </div>
      )

    default:
      return null
  }
}

const ContextStep: React.FC = () => {
  const { state, updateContextData } = useWizard()

  const fields = useMemo(() => getContextFields(state.selectedCase), [state.selectedCase])

  const { filled, total } = useMemo(() => {
    const total = fields.length
    const filled = fields.filter((f) => {
      const v = state.contextData[f.id]
      return !(v === undefined || v === null || v === "")
    }).length
    return { filled, total }
  }, [fields, state.contextData])

  if (!state.selectedCase) {
    return (
      <div className="text-center text-gray-500">
        Sélectionnez d’abord votre problème à l’étape précédente.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Bandeau progression + tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Progression</p>
            <p className="text-xl font-semibold text-primary">
              {filled} / {total}
            </p>
          </div>
          <div className="h-3 w-40 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-primary"
              style={{ width: `${total === 0 ? 0 : Math.round((filled / total) * 100)}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-4 lg:col-span-2">
          <p className="text-sm text-secondary">
            <span className="font-semibold text-primary">💡 Conseils :</span>{" "}
            Soyez précis et gardez vos courriers / notifications sous la main pour les
            dates et références.
          </p>
        </div>
      </div>

      {/* Formulaire dynamique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field, i) => {
          const value = state.contextData[field.id]
          const inputId = `ctx-${field.id}`
          return (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              className="glass rounded-xl p-4 border border-gray-200"
            >
              <label htmlFor={inputId} className="block text-sm font-medium text-primary mb-2">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              <FieldRenderer field={field} value={value} onChange={updateContextData} />

              {field.help && <p className="text-xs text-secondary mt-2">{field.help}</p>}
            </motion.div>
          )
        })}
      </div>

      {fields.length === 0 && (
        <div className="text-center text-gray-500">
          Aucun champ spécifique pour ce cas. Vous pouvez passer à l’étape suivante.
        </div>
      )}
    </div>
  )
}

export default ContextStep
