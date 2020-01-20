import '../App.css'

import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Link} from 'react-router-dom'
import {Accordion, AccordionItem} from 'react-light-accordion'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ManualAdd from '../Pages/ManualAdd'

import 'react-light-accordion/demo/css/index.css'
import { makeStyles } from '@material-ui/core/styles';

export default function FilterOptions() {
  const [city_options, setCity_Options] = useState([]);
  const [state_options, setState_Options] = useState([]);
  const [zip_options, setZip_Options] = useState([]);

  useEffect(() => {
    let newCityOptions = [
      {name: "first city", city_id: "1", city_count:"1"},
      {name: "next city", city_id: "2", city_count:"1"},
      {name: "last city", city_id: "3", city_count:"1"}
    ]

    let newStateOptions = [
      {name: "first state", id: "1", count:"1"},
      {name: "next state", id: "2", count:"1"},
      {name: "last state", id: "3", count:"1"},
    ]

    let newZipOptions = [
      {code: "first zip", id: "1", count:"1"},
      {code: "next zip", id: "2", count:"1"},
      {code: "last zip", id: "3", count:"1"},
    ]

    setCity_Options(newCityOptions);
    setState_Options(newStateOptions);
    setZip_Options(newZipOptions);
    
  }, []);

  return (
    <div class="sidenav">
      <Link to="/invalid" class="invalidButton"><h1>Invalid</h1></Link>
      <Accordion atomic={true}>
        <AccordionItem title="State">
        <Autocomplete 
            id="state-auto"
            options={state_options}
            getOptionLabel={state_options => state_options.name}
            renderInput={params =>(
              <TextField {...params} label="Enter a state" fullWidth variant="filled"/>
            )}
            />
        </AccordionItem>
        <AccordionItem title="City">
          <Autocomplete 
            id="city-auto"
            options={city_options}
            getOptionLabel={city_options => city_options.name}
            renderInput={params =>(
              <TextField {...params} label="Enter a city name" fullWidth variant="filled"/>
            )}
            />
        </AccordionItem>
        <AccordionItem title="Zipcode">
          <Autocomplete 
            id="zip-auto"
            options={zip_options}
            getOptionLabel={zip_options => zip_options.code}
            renderInput={params =>(
              <TextField {...params} label="Enter a zipcode" fullWidth variant="filled"/>
            )}
            />
        </AccordionItem>
      </Accordion>

      <Link to="/manualadd">Manual Add</Link>
      <Link to="/upload" class="uploadButton"><h1>Upload</h1></Link>
      <Link to="/heatmap" class="heatmapButton"><h2>Heatmap</h2></Link>
    </div>
  );
}