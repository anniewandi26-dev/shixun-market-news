import { useLocale } from '../i18n/LocaleContext'

export function LanguageSwitcher() {
  const { locale, ready, locales, t, setLocaleManual } = useLocale()

  return (
    <div className="lang-switch">
      <label className="lang-switch-label" htmlFor="shixun-lang">
        {t('lang.label')}
      </label>
      <select
        id="shixun-lang"
        className="lang-select"
        value={locale}
        disabled={!ready}
        onChange={(e) => setLocaleManual(e.target.value as typeof locale)}
        aria-label={t('lang.label')}
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
      </select>
    </div>
  )
}
