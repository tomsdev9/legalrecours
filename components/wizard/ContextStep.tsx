"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import useWizard from "@/hooks/useWizard"
import { getContextFields, ContextField } from "@/lib/wizard-data"
import { Primitive } from "@/types/common"

const FieldRenderer: React.FC<{
  field: ContextField
  value: Primitive | undefined
  onChange: (id: string, value: Primitive) => void
}> = ({ field, value, onChange }) => {
  const base =
    "w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"

  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          className={base}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )
    case "number":
      return (
        <input
          type="number"
          className={base}
          placeholder={field.placeholder}
          value={typeof value === "number" ? value : ""}
          onChange={(e) =>
            onChange(field.id, e.target.value === "" ? 0 : Number(e.target.value))
          }
        />
      )
    case "date":
      return (
        <input
          type="date"
          className={base}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )
    case "textarea":
      return (
        <textarea
          className={`${base} min-h-[100px]`}
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )
    case "select":
      return (
        <select
          className={base}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.id, e.target.value)}
        >
          <option value="" disabled>
            -- Sélectionnez --
          </option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )
    default:
      return null
  }
}

const ContextStep: React.FC = () => {
  const { state, updateContextData } = useWizard()

  // Récupère les champs pour le case sélectionné, avec fallback
  const fields = useMemo(() => getContextFields(state.selectedCase), [state.selectedCase])

  // Progression dynamique
  const { filled, total } = useMemo(() => {
    const total = fields.length
    const filled = fields.filter((f) => {
      const v = state.contextData[f.id]
      // un champ "rempli" = non vide / non undefined
      return !(v === undefined || v === null || v === "")
    }).length
    return { filled, total }
  }, [fields, state.contextData])

  // Cas improbable : pas de case sélectionné
  if (!state.selectedCase) {
    return (
      <div className="text-center text-gray-300">
        Sélectionnez d’abord votre problème à l’étape précédente.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Bandeau progression + tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Progression</p>
            <p className="text-xl font-semibold text-white">
              {filled} / {total}
            </p>
          </div>
          <div className="h-3 w-40 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${total === 0 ? 0 : Math.round((filled / total) * 100)}%` }}
            />
          </div>
        </div>

        <div className="glass rounded-2xl p-4 lg:col-span-2">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">💡 Conseils :</span>{" "}
            Soyez précis et gardez vos courriers / notifications sous la main pour les dates
            et références. Plus vous êtes précis, plus le courrier sera efficace.
          </p>
        </div>
      </div>

      {/* Formulaire dynamique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field, i) => {
          const value = state.contextData[field.id]
          return (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * i }}
              className="glass rounded-2xl p-4 border border-white/10"
            >
              <label className="block text-sm font-medium text-white mb-2">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </label>

              <FieldRenderer
                field={field}
                value={value}
                onChange={updateContextData}
              />

              {field.help && (
                <p className="text-xs text-gray-400 mt-2">{field.help}</p>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Message si aucun champ (ne devrait plus arriver, grâce au fallback) */}
      {fields.length === 0 && (
        <div className="text-center text-gray-300">
          Aucun champ spécifique pour ce cas. Vous pouvez passer à l’étape suivante.
        </div>
      )}
    </div>
  )
}

export default ContextStep
