import React, {useState, useEffect} from 'react';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FilterListIcon from '@material-ui/icons/FilterList';
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function createRow(street, city, state, zip, capdate) {
  return {street, city, state, zip, capdate };
}

// custom stable sort algorithm where we can use cmp=(ascending or descending) to determine sort 
function stableSort(array, cmp) {
  const stabilizedArray = array.map((item, index) => [item,index]);

  // function argument passed into sort here makes use of current cmp function
  stabilizedArray.sort((a,b) => {
    const order = cmp(a[0], b[0]);
    if(order !== 0) return order; // positive or negative indicates relative order found so return value
    return a[1] - b[1];
  });
  return stabilizedArray.map(item => item[0]);
}

function desc(a, b, orderBy) {
  if(b[orderBy] < a[orderBy]) {
    return -1;
  }
  if(b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a,b) => desc(a,b,orderBy): (a,b) => -desc(a,b,orderBy);
}

// ----------------------- Enhanced Table Header ---------------------------
function EnhancedTableHead(props) {
  const {classes, order, orderBy, onRequestSort, rowCount} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((header, index) => (
          <TableCell
            key={header.id}
            sortDirection={orderBy === header.id ? order : false}
          >
            <TableSortLabel 
              active={orderBy === header.id}
              direction={order}
              onClick={createSortHandler(header.id)}
            >
              {header.label}
              {orderBy === header.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))} 
      </TableRow>
    </TableHead>
  )
}

const headerCells = [
  // {id:"name", label:"Name"},
  {id:"street", label:"Street"},
  {id:"city", label:"City"},
  {id:"state", label:"State"},
  {id:"zip", label:"Zip"},
  {id:"capdate", label:"Capture Date"}
]

// ----------------------- export function ----------------------------------
export default function TableContent() {
  // data variable to store address data
  // initialized to empty arrays
  const [data, setData] = useState({
    names:[],
    street:[],
    city:[],
    state:[],
    zip:[],
    capdate:[]});
  const [dataRows, setDataRows] = useState([]);
  const classes = useStyles();
    
  // fetches data from db and populates <data> variable
  useEffect(() => {
    const fetchData = async () => {
      // console.log("FETCH");
      const result = await fetch("http://localhost:9000/dbdisplay/loadmain",{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {        
        // read attribute values into temp arrays
        let tempNames = JSON.parse(res.names);
        let tempStreet = JSON.parse(res.streets);
        let tempCity = JSON.parse(res.cities);
        let tempState = JSON.parse(res.state);
        let tempZip = JSON.parse(res.zips);
        let tempCapDate = JSON.parse(res.capdates);

        // set state data to data in temp arrays
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


  // this effect is called upon change in <data> (after loading data from db) to populate dataRows
  useEffect(() => {
    // console.log("[useEffect2] At time of createDataRows call, data is length:", data["names"].length);
    const createRowsAsync = async() => {
      // console.log("[useEffect2][async] data.length:", data["names"].length)
      let newDataRows = []; 
      data["names"].map((addr, index) => 
        newDataRows.push(createRow( 
        data["street"][index], 
        data["city"][index], 
        data["state"][index], 
        data["zip"][index], 
        data["capdate"][index])
      ))
      // console.log("newData")
      setDataRows(newDataRows);
    }
    createRowsAsync();
    // console.log("[useEffect2] dataRows.length:", dataRows.length);
  }, [data]);

  // Pagination Implmentation
  const [page, setPage] = React.useState(0); // reads value from useState into page (page = 0)
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  
  const[order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState("capdate") 

  const handleChangePage = (event, newPage) => {
    // console.log("newPage:", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset page to first page
  };

  const handleRequestSort = (event, currentOrderReq) => {
    if(orderBy === currentOrderReq && order === 'desc') {
      // previous orderBy is the same as current order request and current order is desc -> change order to ascending
      setOrder('asc');
    }
    else {
      setOrder('desc');
    }
    setOrderBy(currentOrderReq);
  }

  // Material-UI Table 
  return(
    // conditional return -> if dataRows is populated, display data; else, display "loading"
    dataRows.length ?
    <Paper>
      <div>
        <Table stickyHeader>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={dataRows.length}
          />
          <TableBody>
            {
            stableSort(dataRows, getSorting(order, orderBy))
            .slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
            .map((addr, index) => (
              <TableRow>
                {/* <TableCell component="th" scope="row">{addr.name}</TableCell> */}
                <TableCell align="left">{addr.street}</TableCell>
                <TableCell align="left">{addr.city}</TableCell>
                <TableCell align="left">{addr.state}</TableCell>
                <TableCell align="left">{addr.zip}</TableCell>
                <TableCell align="left">{addr.capdate.substring(0,10)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[20,30,50]}
        component="div"
        count={data.names.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    : <div> Loading... </div>
  );
}
