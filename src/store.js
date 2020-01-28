import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import tableReducer from "./reducers/table-reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  tableReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
