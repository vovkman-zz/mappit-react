/**
 * Created by liamvovk on 2017-02-04.
 */


import React, {Component} from 'react'

import '../css/map-marker.css'

export default class MapMarker extends Component {
    render () {
        var marker = this.props.marker;
        return (
            <div className="map-marker">
                <span className="pintext">
                    <div className="flex-column">
                        <div className="flex-row">
                            <p style={{
                                fontSize:"12px",
                                borderColor: '#D3D3D3',
                                borderBottom: 'solid thin #000',
                                paddingBottom: '3px',
                                paddingLeft: "10px",
                                paddingRight: "35px",
                                paddingTop: "2.5px"}}
                            >{marker['name']}
                            </p>
                        </div>
                    </div>
                </span>
                <div className='pin bounce'>

                </div>
                <div className='pulse'></div>
            </div>
        )
    }
}