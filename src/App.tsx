import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RequireAdPass } from './components/RequireAdPass'
import { SafariGate } from './components/SafariGate'
import { DailyContentProvider } from './context/DailyContentContext'
import { QuotesProvider } from './context/QuotesContext'
import { LocaleProvider } from './i18n/LocaleContext'
import { AdGatePage } from './pages/AdGatePage'
import { HomePage } from './pages/HomePage'
import { KnowledgeArticlePage } from './pages/KnowledgeArticlePage'
import { KnowledgePage } from './pages/KnowledgePage'
import { MarketPage } from './pages/MarketPage'
import { NewsArticlePage } from './pages/NewsArticlePage'
import { NewsPage } from './pages/NewsPage'

export default function App() {
  return (
    <BrowserRouter>
      <LocaleProvider>
        <SafariGate>
          <QuotesProvider>
            <DailyContentProvider>
              <Routes>
                <Route path="/ad" element={<AdGatePage />} />
                <Route element={<RequireAdPass />}>
                  <Route element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="market" element={<MarketPage />} />
                    <Route path="knowledge" element={<KnowledgePage />} />
                    <Route path="knowledge/:id" element={<KnowledgeArticlePage />} />
                    <Route path="news" element={<NewsPage />} />
                    <Route path="news/:id" element={<NewsArticlePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Route>
              </Routes>
            </DailyContentProvider>
          </QuotesProvider>
        </SafariGate>
      </LocaleProvider>
    </BrowserRouter>
  )
}
