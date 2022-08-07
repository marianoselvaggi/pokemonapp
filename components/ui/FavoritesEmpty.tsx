import { Container, Text, Image } from '@nextui-org/react';

const FavoritesEmpty = () => {

  return (
    <Container css={{
        flexDirection:'column',
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        height: 'calc(100vh - 100px)',
    }}>
        <Text h1>No favorites</Text>
        <Image
            width={250}
            height={250}
            css={{
                opacity: 0.5
            }}
            alt='No favorites'
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg'
        />
    </Container>
  )
};

export default FavoritesEmpty;
