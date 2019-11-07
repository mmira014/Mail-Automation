import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Link} from 'react-router-dom'
import FilterOptions from './Components/FilterOptions'
import TableContent from './Components/TableContent'
import HomePage from './Pages/Homepage'
import UploadPage from './Pages/Upload'

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
        // TODO: store db stuff in variables
      });
  }


  componentDidMount(){

      this.callAPI();
  }
  
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/upload" component={UploadPage} />
      </BrowserRouter>
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
