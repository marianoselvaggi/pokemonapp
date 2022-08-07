import { useState } from 'react';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { Grid, Card, Button, Container, Text, Image} from '@nextui-org/react';
import confetti from 'canvas-confetti';

import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts';
import { PokemonFullResponse, PokemonListResponse, SmallPokemon } from '../../interfaces';
import { localFavorites } from '../../utils';
import { getPokemonInfo } from '../../components/ui/getPokemonInfo';

interface Props {
    pokemon: PokemonFullResponse,
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
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
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    return {
        paths: data.results.map((pokemon: SmallPokemon) => (
            {
                params: {
                    name: pokemon.name
                }
            }
        )),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    
    return {
        props: {
            pokemon: await getPokemonInfo(name),
        }
    }
}

export default PokemonByNamePage;
