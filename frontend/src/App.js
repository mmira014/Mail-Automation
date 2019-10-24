import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */

  return (
    <body>
      <div class="sidenav">
        <a href="#">City</a>
        <a href="#">State</a>
        <a href="#">Zipcode</a>
        <a href="#">Upload</a>
        <a href="#"></a>
      </div>

      <div className="main">
        <header className="header">
          <b>HOMEPAGE</b>
        </header>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Zipcode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{getName(user)}</td>
              <td>{user.street}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.zipcode}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  );
}

const user = {
  id: '1',
  name: 'john smith',
  street: '1234 street st',
  city: 'john\'s city',
  state: 'john\'s state',
  zipcode: '12345'
}

function getName(user) {
  return user.name;
}

// function getAddrList(addrList) {
//   for(var i = 0; i < addrList.size();++i) {
//     <th>{addrList[i].id}</th>
//     <th>{addrList[i].name}</th>
//     <th>{addrList[i].street}</th>
//     <th>{addrList[i].city}</th>
//     <th>{addrList[i].state}</th>
//     <th>{addrList[i].zipcode}</th>
//   }
// }


export default App;
