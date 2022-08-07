import { useState, useEffect } from 'react';

import { NextPage } from 'next';

import { Layout } from '../../components/layouts';
import { FavoritesEmpty } from '../../components/ui/';
import { localFavorites } from '../../utils';
import { FavoritesPokemon }  from '../../components/pokemon/';

const FavoritesPage: NextPage = () => {

  const [pokemons, setPokemons] = useState<number[]>([]);

  useEffect(() => {
    setPokemons(localFavorites.pokemons);
  }, [])
  

  return (
    <Layout title='Favories'>
        {!pokemons.length 
        ? (
          <FavoritesEmpty />
          )
        : (
          <FavoritesPokemon pokemons={pokemons} />
        )}
    </Layout>
  )
}

export default FavoritesPage;
