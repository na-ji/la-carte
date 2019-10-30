import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryColumn, Index } from 'typeorm';

// @ObjectType()
abstract class ConditionWithPokemonType {
  // @Field(type => [Int], { name: 'pokemonType' })
  pokemon_type: number[];
}

// @ObjectType()
abstract class ConditionWithPokemonCategory {
  // @Field({ name: 'categoryName' })
  category_name: string;

  // @Field(type => [Int], { name: 'pokemonIds' })
  pokemon_ids: number[];
}

// @ObjectType()
abstract class ConditionWithThrowType {
  // @Field(type => Int, { name: 'throwType' })
  throw_type: number;

  // @Field()
  hit: boolean;
}

// @ObjectType()
abstract class QuestCondition {
  // @Field(type => Int)
  type: number;

  // @Field(type => ConditionWithPokemonType, {
  //   name: 'withPokemonType',
  //   nullable: true
  // })
  with_pokemon_type?: ConditionWithPokemonType;

  // @Field(type => ConditionWithPokemonCategory, {
  //   name: 'withPokemonCategory',
  //   nullable: true
  // })
  with_pokemon_category?: ConditionWithPokemonCategory;

  // @Field(type => ConditionWithThrowType, {
  //   name: 'withThrowType',
  //   nullable: true
  // })
  with_throw_type?: ConditionWithThrowType;
}

abstract class QuestReward {
  type: number;

  exp: number;

  item: {
    item: number;
    amount: number;
  };

  stardust: number;

  candy: {
    pokemon_id: number;
    amount: number;
  };

  avatar_template_id: string;
  quest_template_id: string;

  pokemon_encounter: {
    pokemon_id: number;
    use_quest_pokemon_encounter_distribuition: boolean;
    pokemon_display: {
      is_shiny: boolean;
      weather_boosted_value: number;
      weather_boosted_description: string;
      gender_value: number;
      form_value: number;
      costume_value: number;
      alignment: number;
    };
    is_hidden_ditto: boolean;
    ditto_display: {
      is_shiny: boolean;
      weather_boosted_value: number;
      weather_boosted_description: string;
      gender_value: number;
      form_value: number;
      costume_value: number;
      alignment: number;
    };
  };
}

@Entity({ name: 'trs_quest' })
@ObjectType()
export class Quest {
  @Field(type => ID)
  @PrimaryColumn({
    type: 'varchar',
    name: 'GUID',
    length: 50
  })
  id: string;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'quest_type',
    width: 3
  })
  @Index('quest_type')
  type: number;

  @Field()
  @Column({
    type: 'int',
    name: 'quest_timestamp',
    width: 11
  })
  timestamp: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_stardust',
    width: 4
  })
  stardust: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_pokemon_id',
    width: 4
  })
  pokemonId: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_reward_type',
    width: 3
  })
  rewardType: number;

  @Field()
  @Column({
    type: 'smallint',
    name: 'quest_item_id',
    width: 3
  })
  itemId: number;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'quest_item_amount',
    width: 2
  })
  itemAmount: number;

  @Field()
  @Column({
    type: 'tinyint',
    name: 'quest_target',
    width: 3
  })
  target: number;

  @Column({
    type: 'varchar',
    name: 'quest_condition',
    length: 500,
    nullable: true
  })
  condition?: string;

  getCondition(): QuestCondition[] {
    return JSON.parse(this.condition);
  }

  @Column({
    type: 'varchar',
    name: 'quest_reward',
    length: 1000,
    nullable: true
  })
  reward?: string;

  getReward(): QuestReward[] {
    return JSON.parse(this.reward);
  }

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'quest_template',
    length: 100,
    nullable: true
  })
  template?: string;

  @Field({ nullable: true })
  @Column({
    type: 'varchar',
    name: 'quest_task',
    length: 150,
    nullable: true
  })
  task?: string;
}
