import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';

export default function LocationMarker({ setPinedLocation }: any) {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [address, setAddress] = useState<string>('');
    const map = useMap();

    useEffect(() => {
        const handleClick = async (e: any) => {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);

            try {
                const response = await axios.get(
                    'https://nominatim.openstreetmap.org/reverse',
                    {
                        params: {
                            format: 'json',
                            lat,
                            lon: lng,
                        },
                        headers: {
                            'Accept-Language': 'fa',
                        },
                    }
                );

                if (response.data && response.data.display_name) {
                    setAddress(response.data.display_name);
                    setPinedLocation({
                        lat,
                        lng,
                        addr: response.data.display_name,
                    });
                } else {
                    console.log('no address found!');
                }
            } catch (error) {
                console.error('error in fetching address', error);
            }
        };

        map.on('click', handleClick);

        return () => {
            map.off('click', handleClick);
        };
    }, [map, setPinedLocation]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>{address || 'fetching address ...'}</Popup>
        </Marker>
    );
}
