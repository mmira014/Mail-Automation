import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import FilterOptions from './Components/FilterOptions'
import TableContent from './Components/TableContent'

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
