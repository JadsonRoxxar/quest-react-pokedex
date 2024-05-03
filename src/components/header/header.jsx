import { useContext } from "react"
import { ThemeContext } from "../../context/theme-context"
import Pokeball from '../../assets/pokebalsOpen.png'
import styled from "styled-components"
import { ThemeTogglerIcon } from '../theme-toggler/theme-toggler-icon'

export function Header(props) {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <Section {...props} style={{ color: theme.color, background: theme.headerColorDetails }}>
                <Logo>
                    <Div>
                        <img src={Pokeball} />
                        <h1>Pokédex</h1>
                    </Div>
                    <ThemeTogglerIcon />
                </Logo>

            </Section>
        </>
    )
}

const Section = styled.section`
width:100%;
max-width:100%;
height: auto;
display: flex;
align-items: center;
justify-content: center;
margin: 0 auto;
`
const Logo = styled.div`
width: 100%;
padding: 16px;
display: flex;
align-items: center;
justify-content: space-between;
`
const Div = styled.div`
max-width: 100%;
height: auto;
margin: 0 auto;
display: flex;
gap: 10px;
align-items: center;
justify-content: center;
img { 
    width:100%;
    padding: 0 0 0 1rem;
    height: 60%;
    max-width: 70px;
}
`
