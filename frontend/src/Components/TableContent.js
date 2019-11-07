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

export default TableContent;