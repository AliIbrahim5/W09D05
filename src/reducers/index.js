import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./Login";

const reducers = combineReducers({ signIn });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();



