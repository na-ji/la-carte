import { EntityRepository, Repository } from 'typeorm';

import { LocationAwareInput } from '../resolvers/types/common-inputs';
import { Pokestop } from '../entities/pokestop';

@EntityRepository(Pokestop)
export class PokestopRepository extends Repository<Pokestop> {
  findPokestop(parameters: LocationAwareInput): Promise<Pokestop[]> {
    const {
      southWestLatitude,
      northEastLatitude,
      southWestLongitude,
      northEastLongitude
    } = parameters;

    const queryBuilder = this.createQueryBuilder('pokestop')
      .where(
        'pokestop.latitude >= :southWestLatitude AND pokestop.latitude <= :northEastLatitude',
        { southWestLatitude, northEastLatitude }
      )
      .andWhere(
        'pokestop.longitude >= :southWestLongitude AND pokestop.longitude <= :northEastLongitude',
        { southWestLongitude, northEastLongitude }
      );

    return queryBuilder.getMany();
  }
}
