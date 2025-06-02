import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import {Box, Typography} from "@mui/material";
import L, {DivIcon} from "leaflet";
import "leaflet/dist/leaflet.css";
import {iranProvinces} from "../../utils/ProvinceUtils";

export interface Location {
    lat: number;
    lon: number;
    label?: string;
    status?: "success" | "warning" | "error" | "normal";
    id?: string;
}

interface ProvinceMapMarkersProps {
    provinceId?: string;
    locations: Location[];
    zoom?: number;
    onMarkerClick?: (location: Location) => void;
}

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({
                                                                              center,
                                                                              zoom,
                                                                          }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const createSvgIcon = (color: string): DivIcon => {
    const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" >
    <path fill="${color}" stroke="white" stroke-width="3" d="M16 41C9 30 2 23 2 14a14 14 0 0 1 28 0c0 9-7 16-14 27z"/>
    <circle fill="white" cx="16" cy="14" r="7"/>
  </svg>
  `;
    return L.divIcon({
        className: "",
        html: svg,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -40],
    });
};


const statusColors: Record<string, string> = {
    success: "#4CAF50", // سبز
    warning: "#FF9800", // نارنجی
    error: "#F44336",   // قرمز
    normal: "#2196F3",  // آبی پیش‌فرض
};

const ProvinceMapMarkers: React.FC<ProvinceMapMarkersProps> = ({
                                                                   provinceId = "tehran",
                                                                   locations,
                                                                   zoom = 10,
                                                                   onMarkerClick
                                                               }) => {
    const [center, setCenter] = useState<[number, number]>([35.6892, 51.389]);

    useEffect(() => {
        const province = iranProvinces.find((p) => p.id === provinceId.toLowerCase());
        if (province) {
            setCenter([province.lat, province.lon]);
        }
    }, [provinceId]);

    return (
        <Box sx={{height: "60vh", width: "100%"}}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{height: "100%", width: "100%"}}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeView center={center} zoom={zoom}/>
                {locations.map((location, idx) => {
                    const {lat, lon, label, status} = location;
                    const color = statusColors[status ?? "normal"] ?? statusColors.normal;
                    const icon = createSvgIcon(color);
                    return (
                        <Marker
                            key={idx}
                            position={[lat, lon]}
                            icon={icon}
                            eventHandlers={{
                                click: () => {
                                    onMarkerClick?.(location);
                                }
                            }}
                        >
                            {label && (
                                <Popup>
                                    <Typography sx={{direction: 'rtl !important'}}>
                                        {label}
                                    </Typography>
                                </Popup>
                            )}
                        </Marker>
                    );
                })}

            </MapContainer>
        </Box>
    );
};

export default ProvinceMapMarkers;
