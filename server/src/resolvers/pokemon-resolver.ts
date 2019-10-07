import { Arg, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PokemonRepository } from '../repositories/pokemon-repository';
import { Pokemon } from '../entities';
import { GetActivePokemonsInput } from './types/pokemon-inputs';

@Resolver(Pokemon)
export class PokemonResolver {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: PokemonRepository
  ) {}

  @Query(returns => [Pokemon])
  pokemons(
    @Arg('parameters') parameters: GetActivePokemonsInput
  ): Promise<Pokemon[]> {
    return this.pokemonRepository.findActivePokemon(parameters);
  }
}
