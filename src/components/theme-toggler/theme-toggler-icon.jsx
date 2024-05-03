import { useContext } from 'react'
import { ThemeContext, themes } from '../../context/theme-context'
import { Toggler } from '../button/button'

export const ThemeTogglerIcon = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div>
            <Toggler style={{ color: theme.color, background: theme.headerColorDetails }} onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)} >Light/Dark</Toggler>
        </div>
    )
}


