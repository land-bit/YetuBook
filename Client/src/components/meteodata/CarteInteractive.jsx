import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
export default function CartInteractive({latitude, longitude}) {
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
    )
}