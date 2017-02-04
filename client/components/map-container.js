/**
 * Created by liamvovk on 2017-02-04.
 */

import React, { Component } from 'react'

import GoogleMap from 'google-map-react'
import MapMarker from './map-marker'

import '../css/map-container.css'

export default class MapContainer extends Component {
    static defaultProps = {
        center: {lat: 59.938043, lng: 30.337157},
        zoom: 9,
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
    };
    constructor(props) {
        super(props);
        this.state = {
            style: {
                position: 'absolute',
                width: 500,
                height: 500,
                top: 0,
                left: 0
            }
        };
        this.setPopUpLocation = this.setPopUpLocation.bind(this);
    }
    setPopUpLocation (event) {
        this.setState({style: {
            position: 'absolute',
            width: 500,
            height: 500,
            top: event.pageY,
            left: event.pageX
        }})
    }
    componentWillMount () {
        window.addEventListener('mousemove', this.setPopUpLocation);
    }
    componentWillUnmount () {
        window.removeEventListener('mousemove', this.setPopUpLocation);
    }
    render () {
        var marker1 = {};
        var marker2 = {};
        marker1['coords'] = {
            lat: 59.955413,
            lng: 30.337844
        };
        marker1['name'] = 'test 1';
        marker2['coords'] = this.props.greatPlaceCoords;
        marker2['name'] = 'test 2';
        return (
            <div className="map-container container-fluid" style={this.state.style}>
                <GoogleMap
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}>
                    <MapMarker {...marker1['coords']} marker={marker1} />
                    <MapMarker {...marker2['coords']} marker={marker2} />
                </GoogleMap>
            </div>
        )
    }
}