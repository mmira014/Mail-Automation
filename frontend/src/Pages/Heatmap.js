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
      heatmapPoints: [
          {lat: 37.782, lng: -122.447},
          {lat: 37.782, lng: -100}
        ]
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
    })
  }

  componentDidMount(){
      this.callAPI();
  }

  render() {

    const apiKey = {key: 'AIzaSyCetpay9unzzY9ILi4F5bUUOr6DK3UHpuc'}
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