import React, { useState } from 'react'
import MainBar from '../Components/MainBar';

/* address consist of:
    * Name (user supplied)
    * Street (user supplied)
    * City (user supplied)
    * State (user supplied)
    * Zip (user supplied)
    * File (null for manual)
    * Capture Data (use current date)
    * Latitude (use google api)
    * Longitude (use google api)
    * Valid (use google api)
*/

// NOTE: we have to feed this through google geocoding api lookup to get lat/lng/valid

// to do: add manual add from file
export default function ManualAdd() {

    // these are html input elements and their values must be accessed using ".value"
    let name_element = "";
    let street_element = "";
    let city_element = "";
    let state_element = "";
    let zip_element = "";

    const [data, set_Data] = useState([]);

    const handleInput = (event) => {
        console.log("test")
        event.preventDefault()

        console.log("name:"+name_element.value)
        // TODO: get values and store in newData
        let newData = {
            name: name_element.value,
            street: street_element.value,
            city: city_element.value,
            state: state_element.value,
            zip: zip_element.value,
            file: null,
            cap_date: new Date().toISOString().slice(0, 19).replace('T', ' '), 
            lat: "",
            lng: "",
            valid: "valid"
        }
        console.log("[handleInput] Data is: "+ newData.zip);
        data.push(newData);
        insert(data)
    }

    const insert = async() => {
        console.log("FINISH ENDPOINT")
    }

    // redirect after successful submit
    const redirect = 0;

    return(
        <div>
            <MainBar content={"Manual Add"} />
            <form onSubmit={handleInput}>
                <ul style={{"list-style-type":"square"}}>
                    <li>
                        <label>Enter name: </label>
                        <input type="text" name="data" ref={input => name_element = input}/>
                    </li>
                    <li>
                        <label>Enter street: </label>
                        <input type="text" name="data" ref={input => street_element = input}/>
                    </li>
                    <li>
                        <label>Enter city: </label>
                        <input type="text" name="data" ref={input => city_element = input}/>
                    </li>
                    <li>
                        <label>Enter state: </label>
                        <input type="text" name="data" ref={input => state_element = input}/>
                    </li>
                    <li>
                        <label>Enter zip: </label>
                        <input type="text" name="data" ref={input => zip_element = input}/> 
                    </li>
                </ul>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}   