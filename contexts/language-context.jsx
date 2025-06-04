"use client";
import { createContext, useContext, useState, useEffect } from "react"
import { enUS } from "../translations/en-US"
import { nlNL } from "../translations/nl-NL"

const LanguageContext = createContext(undefined)

export function LanguageProvider({
  children
}) {
  // Try to get language from localStorage, default to English
  const [language, setLanguage] = useState("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "nl")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = key => {
    const translations = language === "en" ? enUS : nlNL
    return translations[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
