import { TruckEditorState } from './reducers';

export type StateSelector<TRootState> = (state: TRootState) => TruckEditorState;
