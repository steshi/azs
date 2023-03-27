import  React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from "leaflet";
import gp_icon from '.././imgs/gp.svg';
import tat_icon from '.././imgs/tat.svg';
import  AzsService  from  '../components/AzsService';
import { AzsContext } from '../AzsList';

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

export const DopInfo = () => {
  const {selectedAzs} = React.useContext(AzsContext)
  const [info, setInfo] = React.useState(null)
  React.useEffect(() => {
    azsService.getInformStationById(selectedAzs.id).then((result) => {
      setInfo(result)
    })
  }, [selectedAzs])
  if (!info) {
    return (
      <div className='dopinfo'>Select Azs<hr /></div>
    )
  }
  console.log(info)
  return (
      <div className='dopinfo'>
        <b>{selectedAzs.azstype__name === 'tatneft' ? 'TATneft' : 'GazProm'}</b> <hr /><br/>
        {info.dop_inf.address}<br/>
        <table className='pricetable'>
          <thead >
            <tr height="28px" >
          <th width="125px" border="solid white">
                марка                
            </th>
            <th width="125px">
                цена                
            </th>
          </tr>
          </thead>
          <tbody>
            {info.benzines.map((fuel) => <tr><td>{fuel.benzine__name}</td><td>{fuel.cost}</td></tr>)}
          </tbody>
        </table><br /><br /><hr /><br />
        {info.dop_inf.services}

      </div>
  )
}

export const MyMarker = (props) => {
    const {setSelectedAzs} = React.useContext(AzsContext)
    const {currStation} = props;
    return (
      <Marker position={[currStation.lat, currStation.lon]}
        icon={currStation.azstype__name=== 'gazprom' ? gpIcon: tatIcon}
        eventHandlers={{
          click: () => setSelectedAzs(currStation),
        }}>
        <Popup>
          This station id: {currStation.id}
          {/* <StationInfo id={currStation.id}/> */}
        </Popup>
      </Marker>
    )
};
