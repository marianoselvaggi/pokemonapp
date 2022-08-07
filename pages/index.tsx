import type { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { pokeApi } from '../api'

import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
};

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokemons list">
      <Grid.Container gap={2} justify={'center'}>
        {
          pokemons.map((pokemon: SmallPokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg

  const pokemons: SmallPokemon[] = data.results.map((pokemon: SmallPokemon) => {
    const id = (pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '') || 0) as number;
    return {
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    }
  });

  return {
    props: {
      pokemons: pokemons,
    }
  }
}

export default HomePage;
