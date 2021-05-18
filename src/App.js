import React, { Suspense} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/index';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<p>loading...</p>}>
      <Routes />
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
