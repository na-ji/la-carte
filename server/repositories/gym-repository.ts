import { EntityRepository, Repository } from 'typeorm';

import { Gym } from '../entities';
import { GetGymArgs } from '../resolvers/types/gym-args';
import { GraphQLResolveInfo } from 'graphql';
import { queryHasField } from './pokestop-repository';

@EntityRepository(Gym)
export class GymRepository extends Repository<Gym> {
  findGyms(
    parameters: GetGymArgs,
    requestInfo: GraphQLResolveInfo
  ): Promise<Gym[]> {
    const {
      southWestLatitude,
      northEastLatitude,
      southWestLongitude,
      northEastLongitude
    } = parameters;

    const queryBuilder = this.createQueryBuilder('gym')
      .where(
        'gym.latitude >= :southWestLatitude AND gym.latitude <= :northEastLatitude',
        { southWestLatitude, northEastLatitude }
      )
      .andWhere(
        'gym.longitude >= :southWestLongitude AND gym.longitude <= :northEastLongitude',
        { southWestLongitude, northEastLongitude }
      );

    if (
      queryHasField(requestInfo.fieldNodes[0], 'name') ||
      queryHasField(requestInfo.fieldNodes[0], 'description') ||
      queryHasField(requestInfo.fieldNodes[0], 'url')
    ) {
      queryBuilder.leftJoinAndSelect('gym.gymDetails', 'gymDetails');
    }

    return queryBuilder.getMany();
  }
}
