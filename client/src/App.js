import React from 'react'
import './App.css';
import { Route } from 'react-router';
import User from './components/user/user.component';
import map from './components/map/googleMap.component';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div>
      <navBar/>
        
      <BrowserRouter>
        
        <Route exact path='/' component={User} />
        <Route exact path='/map' component={map} />
      </BrowserRouter>

    </div>
  );
}

export default App;
