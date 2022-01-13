import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'

const Map = ({ searchResults }) => {

    const [selectedLocation, setSelectedLocation] = useState('')

    const coordinates = searchResults?.map(res => ({
        longitude: res.long,
        latitude: res.lat
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 'calc(100vh - 92px)',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/lucadiba/ckyd1dk544hw114s82ife1409"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        >
            {
                searchResults?.map(res => (
                    <div key={res.long}>
                        <Marker
                            longitude={res.long}
                            latitude={res.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p onClick={() => setSelectedLocation(res.title)} className="cursor-pointer text-2xl">📌</p>
                        </Marker>

                        {
                            selectedLocation === res.title &&
                            <Popup
                                onClose={() => setSelectedLocation('')}
                                longitude={res.long}
                                latitude={res.lat}
                                closeOnClick={true}
                            >
                                {res.title}
                            </Popup>}
                    </div>
                ))
            }
        </ReactMapGL>
    )
}

export default Map
