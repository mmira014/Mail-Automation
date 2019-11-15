import React from 'react'

// ------------- Functions -------------------------

function getAddrList(addrList) {
    for (var i = 0; i < 100; ++i) {
        var newUser = {
        id: i+1,
        name: 'john'+(i.toString()), 
        street: i.toString()+(' street st'),
        city: 'john'+(i.toString())+('\'s city'),
        state: 'john'+(i.toString())+('\'s state'),
        zipcode: '12345'
        };
        addrList.push(newUser);
    }
}


class TableContent extends React.Component {
  /*
    constructor(props) {
      super(props);
      getAddrList(this.props.userArray);
    }
    */
    constructor(props){
    super(props);
    this.state={
      names: [],
      street: [],
      city: [],
      state: [],
      zip: [],
      capdate: []
    };
  }

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
        //TODO: store db stuff in variables
        
        this.setState({
          names: JSON.parse(res.names),
          street: JSON.parse(res.streets),
          city: JSON.parse(res.cities),
          state: JSON.parse(res.state),
          zip: JSON.parse(res.zips),
          capdate: JSON.parse(res.capdates)
        })
        

        console.log(this.state.names);
        console.log(this.state.street);
        console.log(this.state.city);
        console.log(this.state.state);
        console.log(this.state.zip);
        console.log(this.state.capdate);
      });
  }


  componentDidMount(){
      this.callAPI();
  }
  
    render() {
      return (
        <tbody>
          {this.state.names.map((addr, index) => {
            return (
              <tr class="table">
                <td>{this.state.names[index]}</td>
                <td>{this.state.street[index]}</td>
                <td>{this.state.city[index]}</td>
                <td>{this.state.state[index]}</td>
                <td>{this.state.zip[index]}</td>
                <td>{this.state.capdate[index]}</td>
              </tr>
            )})
          }
        </tbody>
      );
    }
  }

export default TableContent;