import { beforeAll, it } from "vitest";
import { render } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node"


import { PokemonList } from "./PokemonList";

it('PokemonList Component', () => {
    const worker = setupServer(
        rest.get('https://pokeapi.co/api/v2/pokemon', async (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        "count": 1302, "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
                        "previous": null, "results":
                            [{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
                            { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" },
                            { "name": "venusaur", "url": "https://pokeapi.co/api/v2/pokemon/3/" },
                            { "name": "charmander", "url": "https://pokeapi.co/api/v2/pokemon/4/" },
                            { "name": "charmeleon", "url": "https://pokeapi.co/api/v2/pokemon/5/" },
                            { "name": "charizard", "url": "https://pokeapi.co/api/v2/pokemon/6/" },
                            { "name": "squirtle", "url": "https://pokeapi.co/api/v2/pokemon/7/" },
                            { "name": "wartortle", "url": "https://pokeapi.co/api/v2/pokemon/8/" },
                            { "name": "blastoise", "url": "https://pokeapi.co/api/v2/pokemon/9/" },
                            { "name": "caterpie", "url": "https://pokeapi.co/api/v2/pokemon/10/" }]
                    }
                ])
            )
        })
    )
    beforeAll(() => {
        worker.listen();
    });

    it.skip('Should catch more pokemon into screen on button click', () => {
        render(<PokemonList />)


        const button = screen.getByText(/get task from api/i)
    });
});


// import { server } from '../../mocks/node'

// server.listen()

// async function app() {
//     const response = fetch('https://example.com/user')
//     const user = await response.json()
//     console.log(user)
// }

// app()