import { FC, ReactNode, useState, useEffect } from 'react';
import Head from "next/head";

import ReactPlayer from 'react-player/youtube'

import { NavBar } from '../ui';

interface Props {
    children: ReactNode;
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location;

export const Layout: FC<Props> = ({ children, title }) => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    setVideoUrl('https://www.youtube.com/watch?v=tIRm3JoeV3k');
  }, []);
  
  return (
    <>
        <Head>
            <title>{ title || 'PokemonApp' }</title>
            <meta name="author" content="Mariano Selvaggi" />
            <meta name="description" content={`Info about ${title}`} />
            <meta name="keywords" content={`${title}, pokemon, pokedex`} />
            <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
            <meta property="og:description" content={`Info about pokemon ${title}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <NavBar />

        <ReactPlayer width={'100%'} height={100} url={videoUrl} style={{
          flexDirection: 'row'
        }} />

        <main style={{
          padding: '0x 20px'
        }}>
            { children }
        </main>
    </>
  )
}
