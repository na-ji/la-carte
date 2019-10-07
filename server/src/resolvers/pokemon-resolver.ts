import { Resolver, Query, Field, Float, Arg, InputType } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PokemonRepository } from '../repositories/pokemon-repository';
import { Pokemon } from '../entities/pokemon';

@InputType()
export class GetActivePokemonsInput {
  @Field(type => Float)
  southWestLatitude: number;

  @Field(type => Float)
  southWestLongitude: number;

  @Field(type => Float)
  northEastLatitude: number;

  @Field(type => Float)
  northEastLongitude: number;
}

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
