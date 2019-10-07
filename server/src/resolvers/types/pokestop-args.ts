import { InputType } from 'type-graphql';
import { LocationAwareArgs } from './common-args';

@InputType()
export class GetPokestopArgs extends LocationAwareArgs {}
