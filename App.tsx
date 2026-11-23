import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AhirNavigator } from './src/navigation/AhirNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AhirNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}