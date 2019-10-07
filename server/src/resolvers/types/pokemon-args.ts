import { InputType } from 'type-graphql';
import { LocationAwareArgs } from './common-args';

@InputType()
export class GetActivePokemonsArgs extends LocationAwareArgs {}
