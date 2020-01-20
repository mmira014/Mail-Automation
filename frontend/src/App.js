import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom'
import FilterOptions from './Components/FilterOptions'
import TableContent from './Components/TableContent'
import InvalidContent from './Components/InvalidContent'
import HomePage from './Pages/Homepage'
import UploadPage from './Pages/Upload'
import InvalidAddrPage from './Pages/InvalidAddr'
import HeatMap from './Pages/Heatmap.js'
import ManualAdd from './Pages/ManualAdd';

var userArr = [];
const user = {
  id: '1',
  name: 'john smith',
  street: '1234 street st',
  city: 'john\'s city',
  state: 'john\'s state',
  zipcode: '12345'
}

// ------------ Classes ----------------------------------

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/upload" component={UploadPage} />
        <Route path="/invalid" component={InvalidAddrPage} />
        <Route path="/heatmap" component={HeatMap} />
        <Route path="/manualadd" component={ManualAdd} />
      </BrowserRouter>
    );
  }
}

export default App;
