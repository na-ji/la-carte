import { EntityRepository, Repository } from 'typeorm';

import { Pokestop } from '../entities';
import { GetPokestopArgs } from '../resolvers/types/pokestop-args';

@EntityRepository(Pokestop)
export class PokestopRepository extends Repository<Pokestop> {
  findPokestop(parameters: GetPokestopArgs): Promise<Pokestop[]> {
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
