import { createContext, useState } from "react";
import { useReducer } from "react";

const initialState = {
  crds: {
    lat: null,
    long: null,
  },
  stores: [],
};
export const CoffeeStoreContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CRDS":
      return {
        ...state,
        crds: { lat: action.payload.lat, long: action.payload.long },
      };
    case "UPDATE_STORES":
      return { ...state, stores: action.payload.stores };
    case "UPDATE":
      return {
        crds: { lat: action.payload.lat, long: action.payload.long },
        stores: action.payload.stores,
      };
    default:
      throw new Error("Action type not there!");
  }
};

export default (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CoffeeStoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CoffeeStoreContext.Provider>
  );
};
