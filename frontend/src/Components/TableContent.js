import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import TablePagination from '@material-ui/core/TablePagination'

export default function TableContent() {
  // const [data, callAPI] = useState({
  //   names:[],
  //   street:[],
  //   city:[],
  //   state:[],
  //   zip:[],
  //   capdate:[]});

  const [data, setData] = useState({
    names:["test!"],
    street:["test!"],
    city:["test!"],
    state:["test!"],
    zip:["test!"],
    capdate:["test!"]});
    
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:9000/dbdisplay/loadmain",{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
                  
        // data["names"] = JSON.parse(res.names);
        // data["street"] = JSON.parse(res.streets);
        // data["city"] = JSON.parse(res.cities);
        // data["state"] = JSON.parse(res.state);
        // data["zip"] = JSON.parse(res.zips);
        // data["capdate"] = JSON.parse(res.capdates);
        let tempNames = JSON.parse(res.names);
        let tempStreet = JSON.parse(res.streets);
        let tempCity = JSON.parse(res.cities);
        let tempState = JSON.parse(res.state);
        let tempZip = JSON.parse(res.zips);
        let tempCapDate = JSON.parse(res.capdates);

          setData({
            names: [...tempNames],
            street: [...tempStreet],
            city:[...tempCity],
            state:[...tempState],
            zip:[...tempZip],
            capdate:[...tempCapDate]
          });
        });
    };
    fetchData();
  }, []);

  // Pagination Function Start
  // const [page, setPage] = React.useState(0); // reads value from useState into page (so page = 0)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Material-UI Table Below
  return(
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">Name</TableCell>
            <TableCell align="right">Street</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Zip</TableCell>
            <TableCell align="right">Capture Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data["names"].map((addr, index) => (
            <TableRow key="testkey">
              <TableCell component="th" scope="row">{data["names"][index]}</TableCell>
              <TableCell align="right">{data["street"][index]}</TableCell>
              <TableCell align="right">{data["city"][index]}</TableCell>
              <TableCell align="right">{data["state"][index]}</TableCell>
              <TableCell align="right">{data["zip"][index]}</TableCell>
              <TableCell align="right">{data["capdate"][index].substring(0,10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <TablePagination
        rowsPerPageOPtions={[20,30,50]}
        component="div"
        count={this.state.names.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
