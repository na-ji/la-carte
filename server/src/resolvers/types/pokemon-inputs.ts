import { InputType } from 'type-graphql';
import { LocationAwareInput } from './common-inputs';

@InputType()
export class GetActivePokemonsInput extends LocationAwareInput {}
