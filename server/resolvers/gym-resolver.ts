import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  ResolverInterface,
  Root,
  Info
} from 'type-graphql';
import { GraphQLResolveInfo } from 'graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Gym } from '../entities';
import { GymRepository } from '../repositories/gym-repository';
import { GetGymArgs } from './types/gym-args';

@Resolver(of => Gym)
export class GymResolver implements ResolverInterface<Gym> {
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: GymRepository
  ) {}

  @Query(returns => [Gym])
  gyms(
    @Arg('args') args: GetGymArgs,
    @Info() requestInfo: GraphQLResolveInfo
  ): Promise<Gym[]> {
    return this.gymRepository.findGyms(args, requestInfo);
  }

  @FieldResolver()
  name(@Root() gym: Gym): string | null {
    return gym.getName();
  }

  @FieldResolver()
  description(@Root() gym: Gym): string | null {
    return gym.getDescription();
  }

  @FieldResolver()
  url(@Root() gym: Gym): string | null {
    return gym.getUrl();
  }
}
