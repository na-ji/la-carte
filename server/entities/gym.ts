import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { GymDetails } from './gym-details';

@Entity()
@ObjectType()
@Index('gym_latitude_longitude', ['latitude', 'longitude'])
export class Gym {
  @Field(type => ID)
  @PrimaryColumn({
    type: 'varchar',
    name: 'gym_id',
    length: 50
  })
  id: string;

  @Field()
  @Column({
    type: 'smallint',
    name: 'team_id',
    width: 6
  })
  teamId: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'guard_pokemon_id',
    width: 6
  })
  guardPokemonId: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'slots_available',
    width: 6
  })
  slotsAvailable: number;

  @Field()
  @Column({
    type: 'tinyint',
    width: 1
  })
  enabled: boolean;

  @Field()
  @Column({ type: 'double' })
  latitude: number;

  @Field()
  @Column({ type: 'double' })
  longitude: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'total_cp',
    width: 6
  })
  totalCp: number;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'is_in_battle',
    width: 1
  })
  isInBattle: boolean;

  @Field({ nullable: true })
  @Column({
    type: 'smallint',
    nullable: true,
    width: 6
  })
  gender: number;

  @Field({ nullable: true })
  @Column({
    type: 'smallint',
    nullable: true,
    width: 6
  })
  form: number;

  @Field({ nullable: true })
  @Column({
    type: 'smallint',
    nullable: true,
    width: 6
  })
  costume: number;

  @Field({ nullable: true })
  @Column({
    type: 'smallint',
    nullable: true,
    name: 'weather_boosted_condition',
    width: 6
  })
  weatherBoostedCondition: number;

  @Field({ nullable: true })
  @Column({
    type: 'tinyint',
    nullable: true,
    width: 1
  })
  shiny: boolean;

  @Field()
  @Column({ name: 'last_modified', type: 'datetime' })
  @Index('gym_last_modified')
  lastModified: Date;

  @Field()
  @Column({ name: 'last_scanned', type: 'datetime' })
  @Index('gym_last_scanned')
  lastScanned: Date;

  @OneToOne(type => GymDetails)
  @JoinColumn({ name: 'gym_id', referencedColumnName: 'id' })
  gymDetails?: GymDetails;

  hasGymDetails(): boolean {
    return typeof this.gymDetails !== 'undefined';
  }

  @Field({ nullable: true })
  name?: string;

  getName(): string | null {
    if (this.hasGymDetails()) {
      return this.gymDetails.name;
    }

    return null;
  }

  @Field({ nullable: true })
  description?: string;

  getDescription(): string | null {
    if (this.hasGymDetails()) {
      return this.gymDetails.description;
    }

    return null;
  }

  @Field({ nullable: true })
  url?: string;

  getUrl(): string | null {
    if (this.hasGymDetails() && this.gymDetails.hasUrl()) {
      return this.gymDetails.url.replace('http://', '//');
    }

    return null;
  }
}
