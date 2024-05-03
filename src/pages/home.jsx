import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { Header } from "../components/header/header";
import { PokemonList } from "../components/posts/PokemonList";
import styled from 'styled-components'


function Pokemons() {
    const theme = useContext(ThemeContext)
    return (

        <Home style={{ backgroundColor: theme.theme.background }}>
            <Header />
            <PokemonList />
        </Home>
    )
}

const Home = styled.div`
width: 100%;
max-width: 100%;
margin: 0;
padding:0;
`

export { Pokemons }