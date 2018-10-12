import { AnyAction } from 'redux';

import { ConfirmationModalState } from './reducers';

export interface IConfimationModalData
{
    readonly title: string;
    readonly text: string;
    readonly acceptAction: AnyAction;
    readonly cancelAction: AnyAction;
    readonly acceptButtonText?: string;
    readonly cancelButtonText?: string;
}

export type StateSelector = <TRootState>(state: TRootState) => ConfirmationModalState;
