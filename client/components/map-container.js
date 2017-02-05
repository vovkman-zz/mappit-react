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
        greatPlaceCoords: {lat: 59.724465, lng: 30.080121},
        API_KEY: 'AIzaSyD0n19aMeQbPiWHFTc08PiNNjf4v7ZXgHQ'
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
            },
            mouseX: 0,
            mouseY: 0,
            selectedText: ''
        };
        this.deletePopUp = this.deletePopUp.bind(this);
        this.setDragStyle = this.setDragStyle.bind(this);
        this.setMouseLocation = this.setMouseLocation.bind(this);
        this.setPopUpLocation = this.setPopUpLocation.bind(this);
        this.setSelectedText = this.setSelectedText.bind(this);
    }
    deletePopUp () {
        $('div').remove('.mappit-unique-root');
    }
    setDragStyle (event) {
        var mapBar = document.createElement('span');
        mapBar.style.opacity = 0;
        event.dataTransfer.setDragImage(mapBar, 0, 0);
    }
    setMouseLocation (event) {
        if (this.state.mouseX == 0) {
            this.setState({
                mouseX: event.clientX,
                mouseY: event.clientY,
                style: {
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    top: event.clientY,
                    left: event.clientX
                }
            })
        }
    }
    setPopUpLocation (event) {
        //console.log(mapBar['map-bar']);
        var mapClientX = event.clientX;
        var mapClientY = event.clientY;
        if (event.pageX != 0) {
            this.setState({
                style: {
                    position: 'absolute',
                    width: 500,
                    height: 500,
                    left: mapClientX,
                    top: mapClientY
                }
            })
        }
    }
    setSelectedText () {
        this.setState({
            selectedText: window.getSelection().toString()
        })
    }
    componentWillMount () {
        console.log(window.getSelection().toString());
        window.addEventListener('mouseup', this.setMouseLocation);
    }
    componentWillUnmount () {
        window.removeEventListener('mouseup', this.setMouseLocation);

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
            <div className="map-container container-fluid flex-column" style={this.state.style}>
                <div id="map-bar"
                     draggable="true"
                     onDragStart={this.setDragStyle}
                     onDrag={this.setPopUpLocation}
                     onMouseUp={this.setPopUpLocation}
                     className="map-bar well well-sm">
                    <div className="map-title">mappit<span onClick={this.deletePopUp} className="map-close glyphicon glyphicon-remove"/></div>
                </div>
                <div className="map-wrapper container-fluid">
                    <GoogleMap
                        bootstrapURLKeys={{key: this.props.API_KEY}}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}>
                        <MapMarker {...marker1['coords']} marker={marker1} />
                        <MapMarker {...marker2['coords']} marker={marker2} />
                    </GoogleMap>
                </div>
                <div className="map-details container-fluid">

                </div>
            </div>
        )
    }
}