import createSagaMiddleware from 'redux-saga'
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers';
import rootSaga from './sagas';

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: [saga]
});
saga.run(rootSaga);
export {store};