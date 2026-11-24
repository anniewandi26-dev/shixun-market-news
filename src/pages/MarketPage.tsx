import { MarketBoard } from '../components/MarketBoard'
import { UpdateBanner } from '../components/UpdateBanner'
import { useQuotesContext } from '../context/QuotesContext'
import { useT } from '../i18n/LocaleContext'

export function MarketPage() {
  const { quotes, loading, error, live, updatedAt } = useQuotesContext()
  const t = useT()

  return (
    <main className="page">
      <div className="section" style={{ paddingBottom: 0 }}>
        <UpdateBanner scope="行情" />
        <p className="muted market-live-note">{t('market.note')}</p>
      </div>
      <MarketBoard
        quotes={quotes}
        loading={loading}
        error={error}
        live={live}
        updatedAt={updatedAt}
      />
    </main>
  )
}
