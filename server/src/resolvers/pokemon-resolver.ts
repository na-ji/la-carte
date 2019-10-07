import { Resolver, Query, Field, Float, Arg, InputType } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PokemonRepository } from '../models/pokemon-repository';
import { Pokemon } from '../models/pokemon';

@InputType()
export class GetPokemonsParameters {
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
    @Arg('parameters') parameters: GetPokemonsParameters
  ): Promise<Pokemon[]> {
    return this.pokemonRepository.findCurrentPokemon(parameters);
  }
}
