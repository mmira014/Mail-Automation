import React from 'react'
import FilterOptions from '../Components/FilterOptions'
import InvalidContent from '../Components/InvalidContent'
import MainBar from '../Components/MainBar'

class InvalidAddrPage extends React.Component {
    render() {
      return (
        <div>
            <FilterOptions/>
            <div className="main">
              <MainBar content={"Invalid Addresses"}/>
              {/*<table class="table">
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
                </table>*/}
                <InvalidContent userArray={[]}/>
            </div>
          </div>
      );
    }


}

export default InvalidAddrPage;

