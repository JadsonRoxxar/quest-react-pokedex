import styled from "styled-components";
import { PokemonDetails } from "../components/post/PokemonDetails";

const Pokemon = () => {
    return (
        <Div>
            <PokemonDetails />
        </Div>
    )
}
export { Pokemon }

const Div = styled.div`
Width:100%;
`