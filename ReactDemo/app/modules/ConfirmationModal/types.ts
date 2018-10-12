import { AnyAction } from 'redux';

import { ConfirmationModalState } from './reducers';

export interface IConfirmationModalData
{
    readonly title: string;
    readonly text: string;
    readonly acceptAction: AnyAction;
    readonly cancelAction: AnyAction;
    readonly acceptButtonText?: string;
    readonly cancelButtonText?: string;
}

export const DefaultConfirmationModalData: IConfirmationModalData =
{
    title: '',
    text: '',
    acceptAction: { type: '' },
    cancelAction: { type: '' },
};

export type StateSelector<TRootState> = (state: TRootState) => ConfirmationModalState;
