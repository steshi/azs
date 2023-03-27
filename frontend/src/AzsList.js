import  React from 'react';
import  AzsService  from  './components/AzsService';
import MyMarker from './components/MyMarker'

import { MapContainer, TileLayer} from 'react-leaflet';
import L from "leaflet";


import './css/BaseCss.css';
import "../node_modules/leaflet/dist/leaflet.css";
import { data } from "./leaflet/example1";

// https://blog.logrocket.com/react-leaflet-tutorial/

const azsService = new AzsService();
export const AzsContext = React.createContext({});


const  AzsList = () => {
    const [stations, setStatons] = React.useState([]);

    React.useEffect(()=> {
        azsService.getStations().then((result) => setStatons(result.data))
    },[]);
    
    // const getAllStations = () => {
    //     azsService.getStations().then((result) => console.log(123, result));
    // }

    const informationById = (id) => {
        azsService.getInformStationById(id).then(function (result) {
            console.log(result);
        });
    }

    return (
        <AzsContext.Provider value={{stations, setStatons}}>
            <div>
            <MapContainer center={[55, 49]} zoom={7} scrollWheelZoom={true}>
                {/* <Markers/> */}
                {stations.map((station) => <MyMarker currStation={station} />)}
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=''
                />
                </MapContainer>
            
            {/* <button  onClick={getAllStations}> getAllStations </button> */}
            <button  onClick={() => informationById(1) }> informationById</button>
        </div>
        </AzsContext.Provider>
        
        );

}
export  default  AzsList;
