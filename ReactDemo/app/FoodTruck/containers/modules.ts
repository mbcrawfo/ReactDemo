import { makeConfirmationModalContainer } from '../../modules/ConfirmationModal';
import { makeTruckEditorContainer } from '../../modules/TruckEditor';
import { getConfirmationModalState, getTruckEditorState } from '../store';

export const ConfirmationModalContainer = makeConfirmationModalContainer(getConfirmationModalState);

export const TruckEditorContainer = makeTruckEditorContainer(getTruckEditorState);
