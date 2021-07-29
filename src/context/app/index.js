import React,{ createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';

export const AppContext = createContext();

export const useAppValue = () => useContext(AppContext);

export const AppProvider = ({children}) => (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AppContext.Provider>
);