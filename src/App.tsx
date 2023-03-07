import React from 'react';
import Marketplace from './views/Marketplace';
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="App overflow-hidden">
      <Provider store={store}>
        <Marketplace />
      </Provider>
    </div>
  );
}

export default App;
