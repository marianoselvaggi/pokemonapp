import { FC } from "react";
import { useRouter } from 'next/router';

import { Grid, Card } from "@nextui-org/react";

interface Props {
    id: number;
};

export const FavoritePokemonCard: FC<Props> = ({ id }) => {

    const router = useRouter();

    const onClickCard = () => {
        router.push(`/pokemon/${id}`);
    };

    return (
        <Grid xs={6} sm={3} xl={1} key={id} onClick={onClickCard}>
            <Card isHoverable isPressable css={{ padding: 10 }}>
            <Card.Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                width={'100%'}
                height={140}
            />
            </Card>
        </Grid>
    );
}
