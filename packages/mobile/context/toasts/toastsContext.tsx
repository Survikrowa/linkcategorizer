import React, { createContext, useReducer } from 'react';
import { ToastAndroid } from 'react-native';

type Action = { type: 'ShowToast'; payload: { message: string; duration: 'SHORT' | 'LONG' } };
type Dispatch = (action: Action) => void;
type State = null;
type ToastsProviderProps = {
  children: React.ReactNode;
};

export const ToastsContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
);

const toastsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ShowToast': {
      ToastAndroid.show(action.payload.message, ToastAndroid[action.payload.duration]);
      return null;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const ToastsProvider = ({ children }: ToastsProviderProps) => {
  const [state, dispatch] = useReducer(toastsReducer, null);
  const value = { state, dispatch };
  return <ToastsContext.Provider value={value}>{children}</ToastsContext.Provider>;
};
