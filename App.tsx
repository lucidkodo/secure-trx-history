import 'react-native-gesture-handler';
import React, { ErrorInfo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from 'react-error-boundary';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, createTheme } from '@rneui/themed';

import MainStack from './navigation/MainStack';
import Generic from './screens/Errors/Generic';
import { buttonTitle, primaryBtn, secondaryBtn } from './screens/styles/global';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const theme = createTheme({
  components: {
    Button: (props) => {
      return {
        buttonStyle: {
          ...(props.isPrimary ? primaryBtn : secondaryBtn),
          width: 250,
        },
        radius: 20,
        titleStyle: buttonTitle,
      };
    },
  },
});

function errorHandler(err: Error, info: ErrorInfo) {
  console.error('Logging: ', err);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary FallbackComponent={Generic} onError={errorHandler}>
        <ThemeProvider theme={theme}>
          <MainStack />
          <StatusBar style="auto" />
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
