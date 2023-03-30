import  React from 'react';
import  AzsService  from  './components/AzsService';
import {MyMarker, DopInfo, PriceRange} from './components/MyMarker'

import { MapContainer, TileLayer} from 'react-leaflet';

import './css/BaseCss.css';
import "../node_modules/leaflet/dist/leaflet.css";

// https://blog.logrocket.com/react-leaflet-tutorial/

const azsService = new AzsService();

export const AzsContext = React.createContext({});

const  AzsList = () => {
    const [stations, setStatons] = React.useState([]);
    const [selectedAzs, setSelectedAzs] = React.useState(null)
    const [lowCosters, setLowCosters] = React.useState([])
    const [map, setMap] = React.useState(null)

    const onMove = React.useCallback(() => {
        if (map) {
            const extremePoints = map.getBounds();
            const northEast = extremePoints["_northEast"];
            const southWest = extremePoints["_southWest"];
    
            azsService.getStations(northEast.lat, northEast.lng, southWest.lat, southWest.lng).then(
            (result) => {
                setLowCosters(result.lowcosters)

                setStatons(result.data)
            })
        }
      }, [map]);
    
   
    React.useEffect(()=> {
        if (map) {
            const extremePoints = map.getBounds();
        const northEast = extremePoints["_northEast"];
        const southWest = extremePoints["_southWest"];
    
        azsService.getStations(northEast.lat, northEast.lng, southWest.lat, southWest.lng).then((result) => {
            setLowCosters(result.lowcosters)
            setStatons(result.data)
        })
        }
    },[map]);

    React.useEffect(() => {
        if(map){
            map.on('move', onMove)
            return () => map.off('move', onMove);
        }
    }, [map, onMove]);
    

    return (
        <AzsContext.Provider value={{selectedAzs, setSelectedAzs, lowCosters}}>
            <div style={{display: 'flex', 'flex-direction': 'row'}}>
                <div className='dopinfo' style={{display: 'flex', 'flex-direction': 'column'}}> 
                    <div className='dopinfo' style={{ width: '100%', minWidth: '150px'}}>
                        {selectedAzs ? <DopInfo/> : 'Select Azs'}
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <PriceRange/>
                    </div>
                </div>
 

                
                <MapContainer center={[55, 49]} zoom={7} scrollWheelZoom={true} ref={setMap}>
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
