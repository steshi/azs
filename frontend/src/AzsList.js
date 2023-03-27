import  React from 'react';
import  AzsService  from  './components/AzsService';
import {MyMarker, DopInfo} from './components/MyMarker'

import { MapContainer, TileLayer} from 'react-leaflet';

import './css/BaseCss.css';
import "../node_modules/leaflet/dist/leaflet.css";

// https://blog.logrocket.com/react-leaflet-tutorial/

const azsService = new AzsService();

export const AzsContext = React.createContext({});

const  AzsList = () => {
    const [stations, setStatons] = React.useState([]);
    const [selectedAzs, setSelectedAzs] = React.useState(null)

    React.useEffect(()=> {
        azsService.getStations().then((result) => setStatons(result.data))
    },[]);

    return (
        <AzsContext.Provider value={{selectedAzs, setSelectedAzs}}>
            <div>
                {selectedAzs ? <DopInfo/> : <div className='dopinfo'>Select Azs<hr /></div>}
                <MapContainer center={[55, 49]} zoom={7} scrollWheelZoom={true}>
                {stations.map((station) => <MyMarker currStation={station} />)}
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=''
                />
                </MapContainer>
                
        </div>
        </AzsContext.Provider>
        );
}

export  default  AzsList;
