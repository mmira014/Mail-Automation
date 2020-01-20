 /* global google */
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MainBar from '../Components/MainBar'


class HeatMap extends Component {
  static defaultProps = {
    center: {
      lat: 39.0119,
      lng: -98.11
    },
    zoom: 4
  }

  constructor(props) {
    super(props)
    this.state = {
      heatmapVisible: true,
      heatmapPoints: []
    }
  }

  callAPI(){
    var data = {
      message: "hi"
    }
    fetch("http://localhost:9000/heatmap/heatmap",{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res =>{
      console.log(res);

      var tempLat = JSON.parse(res.Lat);
      var tempLng = JSON.parse(res.Lng);
      var heatmapArray = [];
      for (var i = 0; i < tempLat.length; i++) {
      	let temp = {
      		lat: 0, lng: 0
      	};

      	temp.lat = tempLat[i];
      	temp.lng = tempLng[i];
      	//console.log(temp);
      	heatmapArray.push(temp);
      }
	  this.setState( {
	  	heatmapPoints: heatmapArray
	  })     
      console.log(heatmapArray);

    })
  }

  componentDidMount(){
      this.callAPI();
  }

  render() {

    const apiKey = {key: null} // REPLACE
    const heatMapData = {
      positions: this.state.heatmapPoints,
    options: {
      radius: 20,
      opacity: 0.6
    }
    }

    console.log(this.state)

    return (
      <div>
        <MainBar content={"Address Distribution Map"}/>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            ref={(el) => this._googleMap = el}
            bootstrapURLKeys={apiKey}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            heatmapLibrary={true}
            heatmap={heatMapData}
          >
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default HeatMap