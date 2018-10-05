import { EntitiesAction } from './entities';
import { TrucksListAction } from './trucksList';

export type RootAction = EntitiesAction | TrucksListAction;
