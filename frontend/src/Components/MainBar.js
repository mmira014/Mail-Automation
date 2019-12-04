import React from 'react'
import {Link} from 'react-router-dom'

export default function MainBar(props) {
     return (
        <Link to="/" class="App-header"><b>A Million Thanks: {props.content}</b></Link>
     );
}