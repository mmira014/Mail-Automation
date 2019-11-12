import React from 'react'
import FilterOptions from '../Components/FilterOptions'
import TableContent from '../Components/TableContent'

class HomePage extends React.Component {
    render() {
      return (
        <div>
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
                <TableContent userArray={[]}/>
              </table>
            </div>
          </div>
      );
    }
}

export default HomePage;