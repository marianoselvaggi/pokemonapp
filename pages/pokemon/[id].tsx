import { useState, useEffect } from 'react';

import { GetStaticProps, GetStaticPaths, NextPage } from 'next'

import { Layout } from '../../components/layouts';
import pokeApi from '../../api/pokeApi';
import { PokemonFullResponse } from '../../interfaces';
import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react';
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { getPokemonInfo } from '../../components/ui/';

interface Props {
    pokemon: PokemonFullResponse,
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {  
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));  

  const toogleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return; 

    confetti({
      spread: 160,
      angle: 120,
      particleCount: 200,
      origin: {
        x: 1,
        y: 0,
      }
    });
  }
    
  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{ padding: '5px'}} gap={ 2 }>
            <Grid xs={12} sm={4}>
                <Card isHoverable>
                    <Card.Body>
                        <Card.Image 
                        src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} 
                        alt={pokemon.name}
                        height={200} 
                        width={'100%'} />
                    </Card.Body>
                </Card>    
            </Grid>
            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{ justifyContent: 'space-between', padding: '$10' }}>
                        <Text transform='capitalize' h1>{pokemon.name}</Text>
                        <Button 
                            color='gradient' 
                            ghost={!isInFavorites}
                            onPress={toogleFavorites}>
                                {isInFavorites ? 'Remove from Favorites' : 'Save in Favorites'}
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Text size={30}>Sprites:</Text>
                        <Container direction='row' display='flex' gap={0}>
                            <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={ 100 } />
                            <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={ 100 } />
                            <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={ 100 } />
                            <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={ 100 } />
                        </Container>
                    </Card.Body>
                </Card>
            </Grid>
        </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemonList = [...Array(151)].map((val,index) => `${index + 1}`);
    
    return {
        paths: pokemonList.map((id) => ({
            params: {
                id,
            },
        })),
        // fallback: false
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string; };

    const pokemon = await getPokemonInfo(id);

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            pokemon,
        },
        revalidate: 86400,
    }
}

export default PokemonPage;