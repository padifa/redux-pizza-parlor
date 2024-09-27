import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const SET_PIZZAS = "SET_PIZZAS";
const ADD_ORDER = "ADD_ORDER";
const CUSTOMER_ORDER = "CUSTOMER_ORDER";

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

const initialPizzaState = {
  pizzas: [],
  orders: [],
  customer: {},
};

const pizzaReducer = (state = initialPizzaState, action) => {
  switch (action.type) {
    case SET_PIZZAS:
      return {
        ...state,
        pizzas: action.payload,
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload], //{id: '1', quantity: 1}
      };
    case CUSTOMER_ORDER:
      return {
        ...state,
        customer: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pizza: pizzaReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;
