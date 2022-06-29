import React from 'react';
import { GeneralProvider } from './contexts/GeneralContext';
import MainComponent from './components/MainComponent';

//___________________________________________________________________________________
const App = () => {
  return (
    <GeneralProvider>
      <MainComponent />
    </GeneralProvider>
  );
};

//___________________________________________________________________________________
export default App;
