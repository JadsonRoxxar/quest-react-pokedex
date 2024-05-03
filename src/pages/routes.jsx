import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pokemons } from "./home"
import { Pokemon } from "./pokemonPage"

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Pokemons />} />
            <Route exact path='/pokemon/:id' element={<Pokemon />} />
        </Routes>
    </BrowserRouter>
)