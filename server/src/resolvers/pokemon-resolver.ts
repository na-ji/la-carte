import { Arg, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PokemonRepository } from '../repositories/pokemon-repository';
import { Pokemon } from '../entities';
import { GetActivePokemonsArgs } from './types/pokemon-args';

@Resolver(of => Pokemon)
export class PokemonResolver {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: PokemonRepository
  ) {}

  @Query(returns => [Pokemon])
  pokemons(@Arg('args') args: GetActivePokemonsArgs): Promise<Pokemon[]> {
    return this.pokemonRepository.findActivePokemon(args);
  }
}
