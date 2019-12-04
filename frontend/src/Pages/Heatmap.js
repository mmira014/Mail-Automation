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
        <MainBar content={"Addresses"}/>
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