import { EntityRepository, Repository } from 'typeorm';
import { Pokemon } from '../entities';
import { GetActivePokemonsArgs } from '../resolvers/types/pokemon-args';

@EntityRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {
  findActivePokemon(args: GetActivePokemonsArgs): Promise<Pokemon[]> {
    const {
      southWestLatitude,
      northEastLatitude,
      southWestLongitude,
      northEastLongitude
    } = args;

    const queryBuilder = this.createQueryBuilder('pokemon')
      .where(
        'pokemon.latitude >= :southWestLatitude AND pokemon.latitude <= :northEastLatitude',
        { southWestLatitude, northEastLatitude }
      )
      .andWhere(
        'pokemon.longitude >= :southWestLongitude AND pokemon.longitude <= :northEastLongitude',
        { southWestLongitude, northEastLongitude }
      )
      .andWhere(
        "pokemon.disappearTime > CONVERT_TZ(FROM_UNIXTIME(:disappearTime), @@session.time_zone, '+00:00')",
        {
          disappearTime: Math.round(Date.now() / 1000)
        }
      );

    return queryBuilder.getMany();
  }
}
