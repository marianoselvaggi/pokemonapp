import Image from 'next/image';
import NextLink from 'next/link';

import { useTheme, Text, Spacer, Link } from '@nextui-org/react';

export const NavBar = () => {

    const { theme }  = useTheme();

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0x 20px',
        backgroundColor: theme?.colors.green100.value,
    }}>
        <Image 
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png' 
            alt='app icon'
            width='70px'
            height='70px'
        />
        <NextLink href="/">
            <Link>
                <Text color='white' h2>P</Text>
                <Text color='white' h3>okemon</Text>
            </Link>
        </NextLink>

        <Spacer css={{flex: 1}} />

        <NextLink href="/favorites">
            <Link>
                <Text color='white' style={{
                    paddingRight: '20px'
                }}>Favorites</Text>
            </Link>
        </NextLink>
    </div>
  )
}
