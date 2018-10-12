import { makeConfirmationModalContainer } from '../../modules/ConfirmationModal';
import { getConfirmationModalState } from '../store';

export const ConfirmationModalContainer = makeConfirmationModalContainer(getConfirmationModalState);
