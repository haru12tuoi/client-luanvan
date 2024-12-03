import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";

const customIcon = new L.Icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapStreet = ({ coords, address }) => {
    const { posts } = useSelector(state => state.post)
    return (
        <div style={{ height: "300px" }}>
            <MapContainer
                center={[coords.lat, coords.lng]}
                zoom={6}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
                    <Popup>
                        {posts[0]?.address || "Địa chỉ không xác định."}
                    </Popup>
                    {address && <Popup>
                        {address || "Địa chỉ không xác định."}
                    </Popup>}
                </Marker>
            </MapContainer>
        </div>
    );
}

export default MapStreet;
