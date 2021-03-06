import 'react-native-gesture-handler';
import React from 'react';
import useCachedResources from './hooks/useCachedResources';
import { Navigation } from './navigation/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastsProvider } from './context/toasts/toastsContext';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <ToastsProvider>
        <Navigation />
      </ToastsProvider>
    </SafeAreaProvider>
  );
}
