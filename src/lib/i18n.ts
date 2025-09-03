'use client'

import * as React from 'react'

interface Translations {
  [key: string]: any
}

interface I18nContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, params?: Record<string, string>) => string
  translations: Translations
}

const I18nContext = React.createContext<I18nContextType | undefined>(undefined)

export function useI18n(): I18nContextType {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = React.useState('en')
  const [translations, setTranslations] = React.useState<Translations>({})

  React.useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await import(`../messages/${language}.json`)
        setTranslations(response.default)
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error)
        if (language !== 'en') {
          const fallback = await import('../messages/en.json')
          setTranslations(fallback.default)
        }
      }
    }
    loadTranslations()
  }, [language])

  const t = (key: string, params?: Record<string, string>): string => {
    let value = key.split('.').reduce((obj, k) => obj?.[k], translations) || key
    
    if (params) {
      Object.entries(params).forEach(([param, replacement]) => {
        value = value.replace(new RegExp(`{{${param}}}`, 'g'), replacement)
      })
    }
    
    return value
  }

  const value = {
    language,
    setLanguage,
    t,
    translations
  }

  return React.createElement(
    I18nContext.Provider,
    { value },
    children
  )
}