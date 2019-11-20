import React from 'react'
import FilterOptions from '../Components/FilterOptions'
import InvalidContent from '../Components/InvalidContent'

class InvalidAddrPage extends React.Component {
    render() {
      return (
        <div>
            <FilterOptions/>
            <div className="main">
              <header class="App-header">
                <b>A Million Thanks: ERRORS</b>
              </header>
              <table class="table">
                <thead >
                  <tr class="tableHeader">
                    <th scope="col">Name</th>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Zipcode</th>
                    <th scope="col">Capture date</th>
                  </tr>
                </thead>
                <InvalidContent userArray={[]}/>
              </table>
            </div>
          </div>
      );
    }
}

export default InvalidAddrPage;

