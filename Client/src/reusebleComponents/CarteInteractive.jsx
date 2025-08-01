import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import getUserLocation from "../utilities/weather/getUserLocation";
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Définir l'icône du marqueur
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Remplacer l'icône par défaut
L.Marker.prototype.options.icon = DefaultIcon;

export default function CartInteractive() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        getUserLocation()
            .then(position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la géolocalisation:", error);
            });
    }, []);

    return (
        <div>
            {latitude && longitude && (
                <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: '200px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>Votre position actuelle</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
}
