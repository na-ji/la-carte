import { Arg, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Pokestop } from '../entities';
import { PokestopRepository } from '../repositories/pokestop-repository';
import { LocationAwareInput } from './types/common-inputs';

@Resolver(Pokestop)
export class PokestopResolver {
  constructor(
    @InjectRepository(Pokestop)
    private readonly pokestopRepository: PokestopRepository
  ) {}

  @Query(returns => [Pokestop])
  pokestops(
    @Arg('parameters') parameters: LocationAwareInput
  ): Promise<Pokestop[]> {
    return this.pokestopRepository.findPokestop(parameters);
  }
}
