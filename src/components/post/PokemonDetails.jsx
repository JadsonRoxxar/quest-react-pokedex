import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPokemonsDetails } from "../Services/GetPokemonDetails"
import { styled } from "styled-components"
import BannerPokeball from '../../assets/bannerpoke.svg'

import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"


function PokemonDetails() {


    const [pokeDetail, setPokeDetail] = useState([])

    const { id } = useParams()

    useEffect(() => {
        async function catchPokeDetails() {
            try {
                const response = await getPokemonsDetails(id)
                setPokeDetail(response)
            } catch (e) {
                console.error('Error to get pokémon details', e)
            }
        }
        catchPokeDetails()
    }, [id])
    const limitCaracter = (description_ability, maxLength) => {
        return description_ability.length > maxLength ? description_ability.substring(0, maxLength) + '...' : description_ability;
    };

    return (
        <Section>
            <Card>
                <Img src={BannerPokeball} alt="banner pokeball" />

                <Name>
                    <Div>
                        <Link to={'/'}>
                            <FiArrowLeft size={48} />
                        </Link>
                        <P>{pokeDetail.name}</P>
                        <Span>#0{pokeDetail.id}</Span>
                    </Div>
                </Name>
                <Image>
                    <Img2 src={pokeDetail.sprites?.front_default} alt={pokeDetail.name} />
                </Image>
                <div>
                    <H3>Type:</H3>
                    <Types>
                        {
                            pokeDetail.types && pokeDetail.types.map((types, index) => {
                                return (
                                    <Type key={index}>{types.type.name}</Type>
                                )
                            })
                        }
                    </Types>
                </div>

                <Moves>
                    <H3>Moves:</H3>
                    <Div2>
                        {
                            pokeDetail.moves && pokeDetail.moves.slice(0, 3).map((moves, index) => {
                                return (
                                    <Span2 key={index}>{moves.move.name}</Span2>
                                )
                            })
                        }
                    </Div2>
                </Moves>
                <Inv>
                    💫
                </Inv>
                <Skills>

                    <div>
                        <H3>Abilities:</H3>
                    </div>

                    <Skill>
                        {
                            pokeDetail.abilities && pokeDetail.abilities.slice(0, 3).map((skill, index) => (
                                <Skill key={index}>
                                    <SkillName>{skill.ability.name}</SkillName>
                                    <SkillDesc>{limitCaracter(skill.ability.description_ability, 255)}</SkillDesc>
                                </Skill>
                            ))
                        }
                    </Skill>
                </Skills>
            </Card>

        </Section>
    )
}

const Section = styled.section`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 0.25rem;
gap: 1.25rem;
flex-wrap: wrap;
`
const Card = styled.div`
    width: 22.5rem;
    max-width: 100%;
    height: 55rem;
    padding: 0.025rem;
    border-radius: 0.5rem;
    background-color: var(--card-color);
    position: relative;
&:after {
    content: ' ';
    width: 22rem;
    height: 25.75rem;
    background-color: var(--white);
    position: absolute;
    bottom: 0.25rem;
    left: 0.25rem;
    border-radius: 0.5rem;
    z-index: 1;
}
`
const Img = styled.img`
position: absolute;
right: 0.625rem;
top: 0.313rem;
opacity: 0.1;
`

const Name = styled.div`
width: 100%;
display: flex;
align-items: center;
margin-bottom: 1.5rem;
position: relative;
color: var(--blue);
text-transform: capitalize;
font-weight: 700;
`
const Div = styled.div`
display: flex;
justify-content: center;
justify-content: space-between;
align-items: center;
gap: 0.5rem;
`
const P = styled.p`
font-size: 1.5rem;
text-transform: uppercase;
color: var(--blue)
`
const Span = styled.span`
font-size: 0.75rem;
margin: 0 0 0 6.5rem;
color: var(--blue)
`
const Image = styled.div`
width: 100%;
height: auto;
display: flex;
justify-content: center;
margin-bottom: 0.25rem;
`
const Img2 = styled.img`
z-index: 2;
width: 12.5rem;
height: 12.5rem;
`

const Types = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
text-transform: capitalize;
gap: 1rem;
margin-bottom: 1rem; 
`
const Type = styled.span`
padding: 0.125rem 0.5rem;
background-color: var(--gray);
border-radius: 0.625rem;
font-size: 0.625rem;
font-weight: 700;
color: var(--yellow);
z-index: 2;
`

const Moves = styled.div`
position: relative;
z-index: 2;
width: 100%;
text-transform: capitalize;
display: flex;
align-items: center;
flex-direction: column;
margin-bottom: 1rem;
`
const H3 = styled.h3`
font-size: 0.875rem;
color: var(--blue);
position: relative;
z-index: 10;
margin-bottom: 1rem;
letter-spacing: 0.125rem;
`
const Div2 = styled.div`
gap: 8px;
display: flex;
`
const Span2 = styled.span`
font-size: 0.625rem;
padding: 0.188rem 0.5rem;
background-color: var(--gray);
color: var(--yellow);
font-weight: 700;
border-radius: 0.625rem;
text-transform: capitalize;
letter-spacing: 0.125rem;
text-align: center;
`
const Inv = styled.div`
display: none;
color:var(--white);
`

const Skills = styled.div`
width: 100%;
height: auto;
position: relative;
z-index:2;
display: flex;
flex-direction: column;
`
const Skill = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 1rem;
padding: 0.313rem 0.625rem;
`
const SkillName = styled.p`
font-size: 0.875rem;
font-weight: 400;
text-transform: capitalize;
`
const SkillDesc = styled.span`
font-size: 0.625rem;
font-weight: 200;
color: var(--gray);
`

export { PokemonDetails }