import { PokemonResolver } from './pokemon-resolver';
import { PokestopResolver } from './pokestop-resolver';
import { GymResolver } from './gym-resolver';

export * from './pokemon-resolver';
export * from './pokestop-resolver';
export * from './gym-resolver';

export default [PokemonResolver, PokestopResolver, GymResolver];
