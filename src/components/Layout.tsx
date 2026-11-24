import { NavLink, Outlet } from 'react-router-dom'
import { useQuotesContext } from '../context/QuotesContext'
import { useT } from '../i18n/LocaleContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ScrollToTop } from './ScrollToTop'
import { TickerTape } from './TickerTape'

export function Layout() {
  const { quotes } = useQuotesContext()
  const t = useT()

  return (
    <div className="app">
      <ScrollToTop />
      <header className="topbar">
        <NavLink className="brand" to="/" end>
          {t('brand')}
        </NavLink>
        <nav>
          <NavLink to="/market" className={({ isActive }) => (isActive ? 'nav-active' : undefined)}>
            {t('nav.market')}
          </NavLink>
          <NavLink
            to="/knowledge"
            className={({ isActive }) => (isActive ? 'nav-active' : undefined)}
          >
            {t('nav.knowledge')}
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => (isActive ? 'nav-active' : undefined)}>
            {t('nav.news')}
          </NavLink>
        </nav>
        <LanguageSwitcher />
      </header>

      <TickerTape quotes={quotes} />

      <Outlet />

      <footer className="footer">
        <strong>{t('brand')}</strong>
        <p>{t('footer.disclaimer')}</p>
      </footer>
    </div>
  )
}
