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
                height: 350,
                top: 0,
                left: 0
            },
            curTop: 0,
            mouseX: 0,
            mouseY: 0,
            selectedText: '',
            type: 'dragend',
            dragStart: 0,
            dragBarStart: 0
        };
        this.deletePopUp = this.deletePopUp.bind(this);
        this.getPlaceData = this.getPlaceData.bind(this);
        this.scrollPopUpLocation = this.scrollPopUpLocation.bind(this);
        this.setDragStyle = this.setDragStyle.bind(this);
        this.setMouseLocation = this.setMouseLocation.bind(this);
        this.setPopUpLocation = this.setPopUpLocation.bind(this);
    }
    deletePopUp () {
        $('div').remove('.mappit-unique-root');
    }
    getPlaceData() {
        var query = window.getSelection().toString();
        var service = new google.maps.places.PlacesService(null);
        service.textSearch(query, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                }
            }
        });

        return placeData = {
            address: place.formatted_address,
            coords: place.geometry.location,
            name: place.name,
            placeId: place.place_id
        };
    }
    setDragStyle (event) {
        var mapBar = document.createElement('span');
        mapBar.style.opacity = 0;
        event.dataTransfer.setDragImage(mapBar, 0, 0);
        this.setPopUpLocation(event);
    }
    setMouseLocation () {
        if (window.getSelection().anchorNode != null) {
            var boundingLocation = window.getSelection().getRangeAt(0).getBoundingClientRect();
            if (this.state.mouseX == 0) {
                this.setState({
                    mouseX: boundingLocation.top,
                    mouseY: boundingLocation.left,
                    curTop: boundingLocation.top,
                    style: {
                        position: 'absolute',
                        width: 500,
                        height: 350,
                        top: boundingLocation.top + window.pageYOffset,
                        left: boundingLocation.left
                    }
                })
            }
        }
    }
    setPopUpLocation (event) {
        var mapBoxDims = document.getElementsByClassName('map-wrapper')[0].getBoundingClientRect();
        if (event.type == 'dragstart') {
            if (event.pageX != 0 || event.pageY != 0) {
                this.setState({dragStart: event.pageX, dragBarStart: mapBoxDims.left, type: 'drag'})
            }
        } else {
            if (event.pageX != 0 || event.pageY != 0) {
                var mapClientX = (event.pageX - this.state.dragStart) >= 0 ?
                    (this.state.dragBarStart + event.pageX - this.state.dragStart) :
                    (this.state.dragBarStart - (this.state.dragStart - event.pageX));
                var mapClientY = event.pageY;
                this.setState({
                    style: {
                        position: 'absolute',
                        width: 500,
                        height: 350,
                        left: mapClientX,
                        top: mapClientY
                    },
                    curTop: event.clientY,
                    type: event.type
                })
            }
        }

    }
    scrollPopUpLocation (event) {
        //console.log(mapBar['map-bar']);
        var mapClientX = this.state.style.left;
        var mapClientY = this.state.curTop + window.pageYOffset;
        this.setState({
            style: {
                position: 'absolute',
                width: 500,
                height: 350,
                left: mapClientX,
                top: mapClientY
            }
        })

    }
    componentWillMount () {
        //console.log(this.getPlaceData());
        this.setMouseLocation();
        window.addEventListener('scroll', this.scrollPopUpLocation);
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.scrollPopUpLocation);

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
                <div className="map-bar"
                     draggable="true"
                     onDragStart={this.setDragStyle}
                     onDrag={this.setPopUpLocation}>
                    <div className="map-title">mappit</div>
                    <span onClick={this.deletePopUp} className="map-close glyphicon glyphicon-remove"/>
                </div>
                <div className="map-wrapper container-fluid" id="map-wrapper">
                </div>
                <div className="map-details container-fluid">
                </div>
            </div>
        )
    }
}

{/*<GoogleMap*/}
    {/*bootstrapURLKeys={{key: this.props.API_KEY}}*/}
    {/*defaultCenter={this.props.center}*/}
    {/*defaultZoom={this.props.zoom}>*/}
    {/*<MapMarker {...marker1['coords']} marker={marker1} />*/}
    {/*<MapMarker {...marker2['coords']} marker={marker2} />*/}
{/*</GoogleMap>*/}
{/*<div id="map-bar"*/}
     {/*draggable="true"*/}
     {/*onDragStart={this.setDragStyle}*/}
     {/*onDrag={this.setPopUpLocation}*/}
     {/*onDragEnd={this.setPopUpLocation}*/}
     {/*className="map-bar well well-sm">*/}
{/*</div>*/}
