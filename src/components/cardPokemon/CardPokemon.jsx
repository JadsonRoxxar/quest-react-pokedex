// import { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import logo from '../../assets/pokedex.jpg'
// import { Link } from "react-router-dom";
// import { SectionContainer, Input, Logo, Ul, DivFil, Iten, H3, Button, DivButtons, P } from '../../styles/firstPoke-style';
// import { ThemeContext } from "../../context/theme-context";
// // import { ToggleTheme } from "../../context/toggle-theme";


// export const FirtsPokemons = () => {

//     const [pokemons, setPokemons] = useState([])

//     const [search, setSearch] = useState('')

//     const [saiButton, setSaiButton] = useState(false)

//     const [buttonLess, setButtonLess] = useState(false)

//     const [height, setHeight] = useState(false)

//     const [maxPokemon, setMaxPokemon] = useState(false)

//     const { theme } = useContext(ThemeContext)



//     useEffect(() => {
//         async function fetchData() {

//             try {
//                 const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`)

//                 const data = response.data


//                 const nameList = data.results.map(async (pokemon) => {
//                     const response = await axios.get(pokemon.url)

//                     return await response.data
//                 })

//                 const dataPokemon = await Promise.all(nameList)

//                 setPokemons(dataPokemon);
//             }

//             catch (error) {
//                 console.error(error)
//             }
//         }

//         fetchData()
//     }, [])

//     async function addPoke() {
//         try {
//             setHeight(true)

//             if (pokemons.length < 20) {
//                 setButtonLess(true)

//                 const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=20`)

//                 const data = response.data


//                 const nameList = data.results.map(async (pokemon) => {
//                     const response = await axios.get(pokemon.url)

//                     return await response.data
//                 })

//                 const dataPokemon = await Promise.all(nameList)

//                 setPokemons([...pokemons, ...dataPokemon]);
//             }

//             else {
//                 setMaxPokemon(true)
//             }
//         }

//         catch (error) {
//             console.error(error)
//         }
//     }

//     const inputFilled = search.length > 0 ? true : false;

//     function lessPoke() {

//         const less = pokemons.slice(0, 10)

//         setPokemons(less)

//         setMaxPokemon(false)

//         setButtonLess(false)

//         setHeight(false)
//     }

//     function handleChange(event) {
//         setSearch(event.target.value.toLowerCase())
//     }


//     const pokefil = search.length > 0 ? pokemons.filter(fil => fil.types[0].type.name.includes(search)) : [];

//     function returnPokemons() {
//         setSearch([])
//     }


//     useEffect(() => {

//         if (search.length > 0) {
//             setSaiButton(true)
//         }

//         else {
//             setSaiButton(false)
//         }
//     })


//     return (
//         <SectionContainer altura={height} bgall={theme.background} responsive={inputFilled}  >



//             <Logo src={logo} alt="pokedex" />

//             <label htmlFor="search-Input"></label>

//             <Input
//                 data-testid='input'
//                 type="text"
//                 id="search-Input"
//                 placeholder="search by type"
//                 value={search}
//                 onChange={handleChange}
//             />



//             {search.length > 0 && pokefil.length === 0 ? (

//                 <P>the type of pokemon being searched for is not listed in the pokedex</P>

//             ) : ''}


//             {search.length > 0 ? (

//                 <DivFil >
//                     <Ul data-testid='list' >

//                         {
//                             pokefil.map((filtering, index) => {
//                                 return (
//                                     <>
//                                         <Iten cardBackground={theme.bgCard} bord={theme.border} shadow={theme.shadow} bghover={theme.bgHoverCard} key={index} >
//                                             <Link to={`pokemon/${filtering.id}`} >
//                                                 <img src={filtering.sprites.front_default} alt={filtering.name} />
//                                                 <H3 style={{ color: theme.color }}>{filtering.name}</H3>
//                                             </Link>
//                                         </Iten>
//                                     </>
//                                 )
//                             })
//                         }


//                         <Button bg={theme.bgIten} border={theme.border} shadow={theme.shadow} colorfont={theme.color} onClick={() => returnPokemons()}>
//                             volta
//                         </Button>
//                     </Ul>
//                 </DivFil>
//             ) :

//                 <Ul data-testid='lista'>

//                     {
//                         pokemons.map((poke, index) => {

//                             return (
//                                 <>

//                                     <Iten bg={theme.bgCard} bord={theme.border} shadow={theme.shadow} bghover={theme.bgHoverCard} key={index}>
//                                         <Link to={`pokemon/${poke.id}`} >
//                                             <img src={poke.sprites.front_default} alt={poke.name} />

//                                             <H3 textcor={theme.color}>{poke.name}</H3>
//                                         </Link>
//                                     </Iten>
//                                 </>
//                             )
//                         })
//                     }
//                 </Ul>
//             }





//             {
//                 maxPokemon ? (
//                     <P>Number maximum is 20 Pokemons </P>
//                 ) : ''
//             }







//             {
//                 !saiButton ? (

//                     <DivButtons>

//                         <Button bg={theme.bgIten} border={theme.border} shadow={theme.shadow} colorfont={theme.color} onClick={() => addPoke()} >More Pokemons</Button>

//                         {buttonLess ? (

//                             <Button bg={theme.bgIten} border={theme.border} shadow={theme.shadow} colorfont={theme.color} onClick={() => lessPoke()} >Less Pokemons</Button>

//                         ) : ''}

//                         {/* <ToggleTheme data-testid='btnTheme' /> */}


//                     </DivButtons>

//                 ) :
//                     ''
//             }

//         </SectionContainer >
//     )

// }