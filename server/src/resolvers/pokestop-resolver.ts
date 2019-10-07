import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root
} from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Pokestop } from '../entities';
import { PokestopRepository } from '../repositories/pokestop-repository';
import { GetPokestopArgs } from './types/pokestop-args';

@Resolver(of => Pokestop)
export class PokestopResolver implements ResolverInterface<Pokestop> {
  constructor(
    @InjectRepository(Pokestop)
    private readonly pokestopRepository: PokestopRepository
  ) {}

  @Query(returns => [Pokestop])
  pokestops(@Arg('args') args: GetPokestopArgs): Promise<Pokestop[]> {
    return this.pokestopRepository.findPokestop(args);
  }

  @FieldResolver()
  image(@Root() pokestop: Pokestop): string | null {
    return pokestop.getCleanImage();
  }
}
