import { EntitiesAction } from './entities';
import { TruckDetailsAction } from './truckDetails';
import { TrucksListAction } from './trucksList';

export type RootAction = EntitiesAction | TrucksListAction | TruckDetailsAction;
