import { makeConfirmationModalContainer } from '../../reusable-containers/ConfirmationModal';
import { getConfirmationModalState } from '../store';

export const ConfirmationModalContainer = makeConfirmationModalContainer(getConfirmationModalState);
