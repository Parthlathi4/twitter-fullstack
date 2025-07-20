// src/Store/store.js

import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // ✅ use named import
import authReducer from "./Auth/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
});

const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

export default store; // ✅ export as default to fix index.js error
