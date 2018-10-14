import { ActionType, createAction } from 'typesafe-actions';

export const truckEditorActions = {
    show: createAction('truckEditorModal/show',
        resolve => (truckId: number) => resolve(truckId)
    ),

    submit: createAction('truckEditorModal/submit',
        resolve => (truckId: number) => resolve(truckId)
    ),

    cancel: createAction('truckEditorModal/cancel',
        resolve => (truckId: number) => resolve(truckId)
    ),
};

export type TruckEditorAction = ActionType<typeof truckEditorActions>;
