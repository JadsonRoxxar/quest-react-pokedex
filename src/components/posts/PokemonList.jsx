import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/theme-context'
import styled from 'styled-components'


function PokemonList() {

    const [pokeType, setPokeType] = useState([])
    const [poke, setPoke] = useState([])
    const [nextUrl, setNextUrl] = useState("")
    const theme = useContext(ThemeContext)

    const pokeTypeName = {
        default: '',
        normal: 1, fighting: 2, flying: 3, poison: 4, ground: 5,
        rock: 6, bug: 7, ghost: 8, steel: 9, fire: 10, water: 11,
        grass: 12, electric: 13, psychic: 14, ice: 15, dragon: 16,
        dark: 17, fairy: 18, stellar: 19, unknown: 10001
    }


    useEffect(() => {
        filterByType(`https://pokeapi.co/api/v2/type/${pokeTypeName}?Limit=10`)
        catchPokeData("https://pokeapi.co/api/v2/pokemon?limit=10")
    }, []);
    const filterByType = async (url) => {
        try {
            const response = await axios.get(url);
            const { results, next } = response.data;
            const pokedex = results.map(async (result) => {
                const pokeFilter = await axios.get(result.url);
                return pokeFilter.data;
            });
            const pokeTypeData = await Promise.all(pokedex)
            setPokeType(() => [...pokeType, ...pokeTypeData]);
            setNextUrl(next);
        } catch (e) {
            console.error('Error filter Pokemon', e.message);

        }
    }

    // const filterMorePokemon = async () => {
    //     if (nextUrl) {
    //         filterByType(nextUrl)
    //     }
    // }

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

    <FilterInput style={{ color: theme.theme.color, backgroundColor: theme.theme.headerColorDetails }} >FILTER BY TYPE

        <select>
            <option onChange={pokeType[0].value}>Select Type</option>
            <option onChange={pokeTypeName[1].value}>Normal</option>
            <option onChange={pokeTypeName[2].value}>Fighting</option>
            <option onChange={pokeTypeName[3].value}>Flying</option>
            <option onChange={pokeTypeName[4].value}>Poison</option >
            <option onChange={pokeTypeName[5].value}> Ground</option >
            <option onChange={pokeTypeName[6].value}>Rock</option>
            <option onChange={pokeTypeName[7].value}>Bug</option>
            <option onChange={pokeTypeName[8].value}>Ghost</option>
            <option onChange={pokeTypeName[9].value}>Steel</option>
            <option onChange={pokeTypeName[10].value}>Fire</option>
            <option onChange={pokeTypeName[11].value}>Water</option>
            <option onChange={pokeTypeName[12].value}>Grass</option>
            <option onChange={pokeTypeName[13].value}>Electric</option>
            <option onChange={pokeTypeName[14].value}>Psychic</option>
            <option onChange={pokeTypeName[15].value}>Ice</option>
            <option onChange={pokeTypeName[16].value}>Dragon</option>
            <option onChange={pokeTypeName[17].value}>Dark</option>
            <option onChange={pokeTypeName[18].value}>Fairy</option>
            <option onChange={pokeTypeName[19].value}>Stellar</option>
            <option onChange={pokeTypeName[20].value}>Unknown</option>
        </select>


    </FilterInput >

    return (


        <Section style={{ backgroundColor: theme.theme.background }}>

            {
                pokeType.slice(0, poke).map((poke, index) => (
                    <Link to={`/pokemon/${poke.id}`} key={index}>
                        <Div style={{ backgroundColor: theme.theme.cardBackground }}>
                            <Id>#0{poke.id}</Id>
                            <Img src={poke.sprites?.front_default} alt={poke.name} />
                            <Name>{poke.name}</Name>
                        </Div>
                    </Link>
                ))
            }


            {
                poke < pokeType.length && (

                    < LoadButton style={{ color: theme.theme.color, backgroundColor: theme.theme.headerColorDetails }} onClick={loadMorePokemon} > Load more </LoadButton >
                )
            }


        </Section >

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

const FilterInput = styled.div`
width: 100%;
height: 2.5rem;
padding: 0.5rem;
font-weight: bold;
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