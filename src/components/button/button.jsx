import { useContext } from "react"
import { ThemeContext } from "../../context/theme-context";

export const Toggler = (props) => {

    const { theme } = useContext(ThemeContext)

    return (
        <div>
            <button {...props}>{theme.iconTheme}</button>
        </div>

    )
}