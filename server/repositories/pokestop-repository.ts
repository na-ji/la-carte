import { EntityRepository, Repository } from 'typeorm';

import { Pokestop } from '../entities';
import { GetPokestopArgs } from '../resolvers/types/pokestop-args';
import { FieldNode, GraphQLResolveInfo } from 'graphql';

// TODO : to extract
const queryHasField = (fieldNode: FieldNode, fieldName: string) => {
  if (fieldNode.name.value === fieldName) {
    return true;
  }

  if (fieldNode.selectionSet && fieldNode.selectionSet.selections.length > 0) {
    return fieldNode.selectionSet.selections.some(childFieldNode => {
      if (childFieldNode.kind === 'Field') {
        return queryHasField(childFieldNode, fieldName);
      }

      return false;
    });
  }

  return false;
};

@EntityRepository(Pokestop)
export class PokestopRepository extends Repository<Pokestop> {
  findPokestop(
    parameters: GetPokestopArgs,
    requestInfo: GraphQLResolveInfo
  ): Promise<Pokestop[]> {
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

    if (queryHasField(requestInfo.fieldNodes[0], 'quest')) {
      queryBuilder.leftJoinAndSelect(
        'pokestop.quest',
        'quest',
        // "DATE(from_unixtime(quest.timestamp, '%Y-%m-%d')) = CURDATE()"
        "DATE(from_unixtime(quest.timestamp, '%Y-%m-%d')) = '2019-10-22'"
      );
    }

    return queryBuilder.getMany();
  }
}
