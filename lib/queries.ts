import gql from 'graphql-tag';

export const POKESTOP_FIELDS = gql`
  fragment pokestopFields on Pokestop {
    id
    latitude
    longitude
    lastModified
    name
    image
    lureExpiration
    activeFortModifier
    lastUpdated
    incidentStart
    incidentExpiration
    incidentGruntType
  }
`;

export const QUEST_FIELDS = gql`
  fragment questFields on Quest {
    id
    type
    timestamp
    stardust
    pokemonId
    rewardType
    itemId
    itemAmount
    target
    condition
    template
    task
  }
`;

export const POKEMON_FIELDS = gql`
  fragment pokemonFields on Pokemon {
    id
    spawnpointId
    pokemonId
    latitude
    longitude
    lastModified
    disappearTime
    form
    costume
    cp
    cpMultiplier
    gender
    height
    weight
    individualAttack
    individualDefense
    individualStamina
    fastMove
    chargedMove
    weatherBoostedCondition
  }
`;

export const POKEMONS_QUERY = gql`
  query pokemons($args: GetActivePokemonsArgs!) {
    pokemons(args: $args) {
      ...pokemonFields
    }
  }
  ${POKEMON_FIELDS}
`;

export const POKESTOPS_QUERY = gql`
  query pokestops($args: GetPokestopArgs!) {
    pokestops(args: $args) {
      ...pokestopFields
      quest {
        ...questFields
      }
    }
  }
  ${POKESTOP_FIELDS}
  ${QUEST_FIELDS}
`;

export const RAW_DATA_QUERY = gql`
  query RawData(
    $pokemonArgs: GetActivePokemonsArgs!
    $pokestopArgs: GetPokestopArgs!
  ) {
    pokemons(args: $pokemonArgs) {
      ...pokemonFields
    }
    pokestops(args: $pokestopArgs) {
      ...pokestopFields
      quest {
        ...questFields
      }
    }
  }
  ${POKEMON_FIELDS}
  ${POKESTOP_FIELDS}
  ${QUEST_FIELDS}
`;
