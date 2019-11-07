import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

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
  
  callAPI(){   //requests the server data when the page loads
  
var data = {
  test: "Test"
}

    fetch("http://localhost:9000/dbdisplay/loadmain",{

      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

.then(res => res.json())
      .then(res => {
        console.log(res);

      });
  }


  componentDidMount(){

      this.callAPI();
  }
  
  render() {
    return (
      <div >
        <FilterOptions/>
        <div className="main">
          <header class="App-header">
            <b>A Million Thanks: Addresses</b>
          </header>
          <table class="table">
            <thead >
              <tr class="tableHeader">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Street</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Zipcode</th>
              </tr>
            </thead>
            <TableContent userArray={userArr}/>
          </table>
        </div>
      </div>
    );
  }
}

class TableContent extends React.Component {
  constructor(props) {
    super(props);
    getAddrList(this.props.userArray);
  }

  render() {
    return (
      <tbody>
        {this.props.userArray.map((addr, index) => {
          return (
            <tr class="table">
              <th>{addr.id}</th>
              <td>{addr.name}</td>
              <td>{addr.street}</td>
              <td>{addr.city}</td>
              <td>{addr.state}</td>
              <td>{addr.zipcode}</td>
            </tr>
          )})
        }
      </tbody>
    );
  }
}

class FilterOptions extends React.Component {
  render() {
    return (
      <div class="sidenav">
        <div class="accordion"><h2><u>Filter:</u></h2></div>
        <div class="panel"><p>test</p></div>
        <button class="accordion"><h3>City</h3></button>
        <div class="panel">sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text </div>
        <button class="accordion"><h3>State</h3></button>
        <div class="panel">sample text</div>
        <button class="accordion"><h3>Zipcode</h3></button>
        <div class="panel">sample text</div>
        <a href="#" class="uploadButton"><h1>Upload</h1></a>
      </div>
    );
  }
}

// ------------- Functions -------------------------

function getAddrList(addrList) {
  for (var i = 0; i < 100; ++i) {
    var newUser = {
      id: i+1,
      name: 'john'+(i.toString()), 
      street: i.toString()+(' street st'),
      city: 'john'+(i.toString())+('\'s city'),
      state: 'john'+(i.toString())+('\'s city'),
      zipcode: '12345'
    };
    userArr.push(newUser);
  }
}

// --------- filter accordion behavior ----------------
var accordion = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < accordion.length; ++i) {
  accordion[i].addEventListener("click", function(){
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    }
    else {
      panel.style.display = "block";
    }
  })
}

export default App;
