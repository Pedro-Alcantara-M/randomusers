import React from 'react';
import { useRoutes } from 'react-router-dom';
import { StateProvider } from './context/state'
import { initialState, reducer } from './context/reducer'
import routes from './routes'

function App() {
  const routing = useRoutes(routes);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App" >
        {routing}
      </div>
    </StateProvider >
  );
}

export default App;
