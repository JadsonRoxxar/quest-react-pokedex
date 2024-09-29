import axios from 'axios'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState, useRef } from 'react'
import { ThemeContext } from '../../context/theme-context'
import styled from 'styled-components'


function PokemonList() {

    const theme = useContext(ThemeContext)
    const [types, setTypes] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [filterByType, setFilterByType] = useState('');
    const [allByType, setAllByType] = useState(0);

    const firstFetch = useRef(true);
    const maxPokeload = 10;
    const [totalPokemons, setTotalPokemons] = useState(0);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/type');
                const typesData = response.data.results.map((type) => type.name);
                setTypes(typesData);
            } catch (error) {
                console.error('Error catch Pokémon Type:', error);
            }
        };

        const fetchTotalPokemons = async () => {
            try {
                // Busca o total de Pokémons
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
                setTotalPokemons(response.data.count);
            } catch (error) {
                console.error('Error catch Pokémons:', error);
            }
        };

        fetchTypes();
        fetchTotalPokemons(); // Busca o total de Pokémons ao iniciar
    }, []);

    useEffect(() => {
        const fetchPokemons = async () => {
            setIsLoading(true);

            if (currentPage === 1) {
                firstFetch.current = true;
            }

            try {
                let pokemonData = [];

                if (filterByType) {
                    // Busca os pokémons por tipo
                    const response = await axios.get(`https://pokeapi.co/api/v2/type/${filterByType}`);
                    setAllByType(response.data.pokemon.length);

                    // Calcula o índice inicial e final corretos para fatiar a lista
                    const startIndex = (currentPage - 1) * maxPokeload;
                    const endIndex = Math.min(startIndex + maxPokeload, allByType);

                    pokemonData = await Promise.all(
                        response.data.pokemon
                            .slice(startIndex, endIndex) // Fatia a lista corretamente
                            .map(async ({ pokemon }) => {
                                const pokemonResponse = await axios.get(pokemon.url);
                                return pokemonResponse.data;
                            })
                    );
                } else {
                    // Busca todos os tipos
                    const offset = (currentPage - 1) * maxPokeload;
                    const response = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon?limit=${maxPokeload}&offset=${offset}`
                    );
                    pokemonData = await Promise.all(
                        response.data.results.map(async (pokemon) => {
                            const pokemonResponse = await axios.get(pokemon.url);
                            return pokemonResponse.data;
                        })
                    );
                }

                // Atualiza o estado dos Pokémons
                setPokemons((prevPokemons) => {
                    if (firstFetch.current && currentPage === 1) {
                        firstFetch.current = false;
                        return pokemonData;
                    } else {
                        return [...prevPokemons, ...pokemonData];
                    }
                });

            } catch (error) {
                console.error('Erro ao buscar Pokémon:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPokemons();
    }, [filterByType, currentPage]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        setCurrentPage(1);
        firstFetch.current = true;
        setAllByType(10); // IMPORTANTE: Resetar allByType!
    }, [filterByType]);

    return (
        <>
            <Select value={filterByType} onChange={(e) => setFilterByType(e.target.value)}>
                <option value="">All Types</option>
                {types.map((typeName) => (
                    <option key={typeName} value={typeName}>
                        {typeName}
                    </option>
                ))}
            </Select>

            {isLoading && <div>Loading Pokémons...</div>}

            <Section style={{ backgroundColor: theme.theme.background }}>
                {pokemons.map((pokemon, index) => (
                    <Link to={`/pokemon/${pokemon.id}`} key={index}>
                        <Div style={{ backgroundColor: theme.theme.cardBackground }}>
                            <Id>#{pokemons.id}</Id>
                            <Img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <Name>{pokemon.name}</Name>
                        </Div>

                    </Link>
                ))}

                {!isLoading && (filterByType ? pokemons.length < allByType : pokemons.length < totalPokemons) && (
                    <LoadButton onClick={handleLoadMore} disabled={isLoading} style={{ color: theme.theme.color, backgroundColor: theme.theme.headerColorDetails }}>
                        {isLoading ? 'Loading...' : 'Loading More'}
                    </LoadButton>
                )
                }
            </Section>


        </>
    );
}


const Select = styled.select`
background-color: #316cb3;
color: #ffcb05;
text-transform: capitalize;
border-radius: 0.5rem;`

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