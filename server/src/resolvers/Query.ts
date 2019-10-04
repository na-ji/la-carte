import { Photon } from '@generated/photon'

async function pokemons(parent: Object, args: Object, context: any) {
    const photon: Photon = context.photon;

    const pokemons = await photon.pokemon.findMany({
        last: 10,
        orderBy: {
            disappearTime: 'desc'
        }
    });

    return pokemons;
}

export {
    pokemons,
}
