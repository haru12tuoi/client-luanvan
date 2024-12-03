import React, { memo } from 'react'
import GoogleMapReact from 'google-map-react'
import icons from '../ultils/icon';
const { FaLocationPin } = icons

const Position = ({ text, icon }) => <div className='flex items-center gap-1 flex-col'><span className='bg-white shadow-md p-2 text-sm rounded-md'>{text}</span>{icon}</div>;

const Map = ({ coords, address }) => {
    return (
        <div style={{ height: '300px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
                defaultCenter={coords}
                defaultZoom={11}
                center={coords}
            >
                <Position
                    lat={coords?.lat}
                    lng={coords?.lng}
                    icon={<FaLocationPin size={24} color='red' />}
                    text={address}
                />
            </GoogleMapReact>
        </div>
    )
}

export default memo(Map)
