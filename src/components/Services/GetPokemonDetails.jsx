import axios from "axios";

export async function getPokemonsDetails(id) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemonDetail = response.data

        for (const ability of pokemonDetail.abilities) {
            const response = await axios.get(ability.ability.url)
            const abilityDescription = response.data.effect_entries.find(description => description.language.name === "en").effect
            ability.ability.description_ability = abilityDescription
        }

        return pokemonDetail

    } catch (error) {
        console.error("Erro ao buscar detalhes dos pokemons", error)
    }
}