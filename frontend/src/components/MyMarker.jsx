import  React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from "leaflet";
import gp_icon from '.././imgs/gp.svg';
import tat_icon from '.././imgs/tat.svg';
import  AzsService  from  '../components/AzsService';


const azsService = new AzsService();

const gpIcon = new L.Icon({
    iconUrl: gp_icon,
    iconSize: new L.Point(35, 35),
  });
const tatIcon = new L.Icon({
    iconUrl: tat_icon,
    iconSize: new L.Point(30, 30),
  });

// const StationInfo = (props) => {
//   const {id} = props;
//   const [stationInfo, setStationInfo] = React.useState({});
//   React.useEffect(() => {
//     azsService.getInformStationById(id).then((result) => setStationInfo(result))
//   },[]);
//   console.log(1111, stationInfo)
//   return(
//     <ul>
//       {stationInfo.benzines.map((fuel) => <li>{fuel.benzine__name} ___ {fuel.cost} </li>)}
//     </ul>
//   )
// }

const MyMarker = (props) => {
    const {currStation} = props;
    return (
      <Marker position={[currStation.lat, currStation.lon]}
        icon={currStation.azstype__name=== 'gazprom' ? gpIcon: tatIcon}>
        <Popup>
          This station id: {currStation.id}
          {/* <StationInfo id={currStation.id}/> */}
        </Popup>
      </Marker>
    )
};

export default MyMarker;