import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { RootAction } from './actions';
import { IEpicServices, rootEpic } from './epics';
import { rootReducer, RootState } from './reducers';

export { RootState, IEpicServices };

export const configureStore = (preloadedState: Partial<RootState>, services: IEpicServices) =>
{
    const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, IEpicServices>({
        dependencies: services,
    });

    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(rootEpic);

    return store;
};
