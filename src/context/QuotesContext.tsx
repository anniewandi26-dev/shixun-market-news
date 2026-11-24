import { createContext, useContext, type ReactNode } from 'react'
import { useQuotes } from '../hooks/useQuotes'
import type { Quote } from '../types'

interface QuotesContextValue {
  quotes: Quote[]
  loading: boolean
  error: string | null
  updatedAt: Date | null
  live: boolean
}

const QuotesContext = createContext<QuotesContextValue | null>(null)

export function QuotesProvider({ children }: { children: ReactNode }) {
  const value = useQuotes()
  return <QuotesContext.Provider value={value}>{children}</QuotesContext.Provider>
}

export function useQuotesContext() {
  const ctx = useContext(QuotesContext)
  if (!ctx) throw new Error('useQuotesContext must be used within QuotesProvider')
  return ctx
}
