import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { uiSettingsState } from '../store/atoms'

export const ThemeApplier = () => {
  const { theme } = useRecoilValue(uiSettingsState)

  useEffect(() => {
 const themes = {
      light: { background: '#fff', color: '#000' },
      dark: { background: '#1e1e1e', color: '#eee' },
      purple: { background: '#9c03fb', color: '#000' },
    }

const currentTheme = themes[theme as keyof typeof themes] || themes.light
    
    document.body.style.background = currentTheme.background
    document.body.style.color = currentTheme.color
    document.body.dataset.theme = theme

  }, [theme])

  return null
}
