import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme-context'
import styled from 'styled-components'

function PokemonList() {


    const [poke, setPoke] = useState([])
    const [nextUrl, setNextUrl] = useState("")
    const theme = useContext(ThemeContext)

    useEffect(() => {
        catchPokeData("https://pokeapi.co/api/v2/pokemon?limit=100")
    }, []);

    const catchPokeData = async (url) => {
        try {
            const response = await axios.get(url);
            const { results, next } = response.data;
            const pokedex = results.map(async (result) => {
                const pokeRes = await axios.get(result.url);
                return pokeRes.data;
            });
            const pokeData = await Promise.all(pokedex);
            setPoke(() => [...poke, ...pokeData]);
            setNextUrl(next);
        } catch (e) {
            console.error('Error catch Pokemon', e.message);
        }
    }

    const loadMorePokemon = async () => {
        if (nextUrl) {
            catchPokeData(nextUrl)
        }
    }

    return (

        <Section style={{ backgroundColor: theme.theme.background }}>
            {poke.map((poke, index) => (
                <Link to={`/pokemon/${poke.id}`} key={index}>
                    <Div style={{ backgroundColor: theme.theme.cardBackground }}>
                        <Id>#0{poke.id}</Id>
                        <Img src={poke.sprites?.front_default} alt={poke.name} />
                        <Name>{poke.name}</Name>
                    </Div>
                </Link>
            ))}

            <LoadButton style={{ color: theme.theme.color, backgroundColor: theme.theme.headerColorDetails }} onClick={loadMorePokemon}>Load more</LoadButton>

        </Section>

    )
}
const Section = styled.section`
max-width: 100%;
max-height: auto;
background-color: #fff;
margin: 0 auto;
border-radius: 0.5rem;
display: flex;
flex-wrap: wrap;
padding: 0.938rem;
gap: 0.625rem;
align-items: center;
justify-content: center;
box-shadow: inset 0 0 0.313rem 0.313rem rgba(0, 0, 0, 0.257);
`

const Div = styled.div`
width: 6.5rem;
height: 6.75rem;
background-color: #fff;
border-radius: 0.5rem;
border: 1px solid #66666650;
box-shadow:  0 0 0.063rem 0.063rem rgba(0, 0, 0, 0.080);
position: relative;
cursor: pointer;

&:hover { 
transform: scale(1.02);
box-shadow:  0 0 0.125rem 0.125rem rgba(0, 0, 0, 0.080);   
};
&:after { 
content: '';
width: 100%;
height: 3.25rem;
position: absolute;
bottom: 0;
border-radius: 0.438rem;
z-index: 1;
}
`
const Id = styled.span`
position: absolute;
top: 0.125rem;
right: 0.313rem;
z-index: 2;
font-size: 0.5rem;
`
const Img = styled.img`
position: absolute;
left: 15%;
top: 50%;
transform: translateY(-50%);
z-index: 2;
width: 5.25rem;
height: 5.25rem;
`

const Name = styled.p`
position: absolute;
bottom: 0.313rem;
left: 0.625rem;
z-index: 2;
font-size: 0.625rem;
text-transform: capitalize;
`
const LoadButton = styled.button`
width: 100%;
height: 2.5rem;
padding: 0.5rem;
font-weight: bold;
`

export { PokemonList }