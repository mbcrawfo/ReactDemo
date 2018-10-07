import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { actions, RootAction } from './actions';
import { IEpicServices, rootEpic } from './epics';
import { rootReducer, RootState } from './reducers';

export { actions, RootState, IEpicServices };
export * from './selectors';

export const configureStore = (preloadedState: Partial<RootState>, services: IEpicServices) =>
{
    const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, IEpicServices>({
        dependencies: services,
    });

    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(epicMiddleware, createLogger())
    );

    epicMiddleware.run(rootEpic);

    return store;
};
