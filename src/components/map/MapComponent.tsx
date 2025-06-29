import React, {useState, useEffect} from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import {
    Autocomplete,
    TextField,
    CircularProgress,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import {iranProvinces} from "../../utils/ProvinceUtils/ProvinceUtils";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ChangeView: React.FC<{ center: [number, number] }> = ({center}) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 13);

    }, [center, map]);
    return null;
};

function ClickToAddMarker({
                              setMarkerPosition,
                              setMarkerLabel,
                              setAddress
                          }: {
    setMarkerPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
    setMarkerLabel: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
}) {
    useMapEvents({
        click(e) {
            const {lat, lng} = e.latlng;
            setMarkerPosition([lat, lng]);
            axios
                .get('https://nominatim.openstreetmap.org/reverse', {
                    params: {
                        lat: lat,
                        lon: lng,
                        format: 'json',
                        addressdetails: 1,
                        'accept-language': 'fa',
                    },
                })
                .then((response) => {
                    const address = response.data.display_name;
                    setAddress(address);
                })
                .catch(() => {
                    setAddress('Not Found!');
                });
        },
    });
    return null;
}

type OptionType = {
    label: string;
    lat: number;
    lon: number;
};

const provinces = iranProvinces;

interface MapComponentProps {
    provin?: string;
    setAddr: React.Dispatch<React.SetStateAction<string>>;
    setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
    initialPosition?: [number, number] | null;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}


const MapComponent: React.FC<MapComponentProps> = ({
                                                       provin = 'Tehran',
                                                       setAddr,
                                                       city,
                                                       setCity,
                                                       setPosition,
                                                       initialPosition = null,
                                                   }) => {
    const [province, setProvince] = useState<string>(provin.toLowerCase());
    const [center, setCenter] = useState<[number, number]>([35.6892, 51.389]); // Tehran
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(false);
    const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
    const [markerLabel, setMarkerLabel] = useState<string>('');

    useEffect(() => {
        if (province) {
            const p = provinces.find((p) => p.id === province);
            if (p) {
                setCenter([p.lat, p.lon]);
                if (!city && p.cities && p.cities.length > 0) {
                    setCity(p.cities[0].name);
                }
            }
        }
        setInputValue('');
        setOptions([]);
        setMarkerLabel('');
    }, [province]);

    useEffect(() => {
        if (province && city) {
            const p = provinces.find((p) => p.id === province);
            const c = p?.cities.find((c) => c.name === city);
            if (c) setCenter([c.lat, c.lon]);
        }
        setInputValue('');
        setOptions([]);
        setMarkerLabel('');
    }, [city, province]);

    useEffect(() => {
        if (initialPosition) {
            setCenter(initialPosition);
            setMarkerPosition(initialPosition);
        }
    }, [initialPosition]);



    useEffect(() => {
        if (inputValue.length < 3 || !province || !city) {
            setOptions([]);
            return;
        }

        const query = `${inputValue}, ${city}, ${provinces.find((p) => p.id === province)?.name || ''}`;

        const delayDebounceFn = setTimeout(() => {
            setLoading(true);
            axios
                .get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                        'accept-language': 'fa',
                    },
                })
                .then((response) => {
                    const places = response.data.map((place: any) => ({
                        label: place.display_name,
                        lat: parseFloat(place.lat),
                        lon: parseFloat(place.lon),
                    }));
                    setOptions(places);
                    setLoading(false);
                })
                .catch(() => {
                    setOptions([]);
                    setLoading(false);
                });
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [inputValue, province, city]);

    return (
        <Box sx={{width: '100%', maxWidth: 700, margin: '0 auto', padding: 2}}>
            <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="province-label">Province</InputLabel>
                <Select disabled
                        labelId="province-label"
                        value={province}
                        label="Province"
                        onChange={(e) => setProvince(e.target.value)}
                >
                    {provinces.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth sx={{mb: 2}}>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                    labelId="city-label"
                    value={city}
                    label="City"
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!province}
                >
                    {province &&
                        provinces
                            .find((p) => p.id === province)
                            ?.cities.map((cityName) => (
                            <MenuItem key={cityName.name} value={cityName.name}>
                                {cityName.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>

            <Autocomplete
                freeSolo
                disableClearable
                options={options}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
                onInputChange={(_, value) => setInputValue(value)}
                onChange={(_, value) => {
                    if (value && typeof value !== 'string') {
                        setCenter([value.lat, value.lon]);
                        setMarkerPosition([value.lat, value.lon]);
                        setMarkerLabel(value.label);
                    }
                }}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Searching place or street ..."
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />

            <Box sx={{height: '50vh', marginTop: 3}}>
                <MapContainer center={center} zoom={13} style={{height: '100%', width: '100%'}}>
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeView center={center}/>
                    {markerPosition && (
                        <Marker position={markerPosition}>
                            <Popup>{markerLabel}</Popup>
                        </Marker>
                    )}
                    <ClickToAddMarker
                        setAddress={setAddr}
                        setMarkerPosition={(pos) => {
                            setMarkerPosition(pos);
                            setPosition(pos);
                        }}
                        setMarkerLabel={setMarkerLabel}
                    />
                </MapContainer>
            </Box>
        </Box>
    );
};

export default MapComponent;
