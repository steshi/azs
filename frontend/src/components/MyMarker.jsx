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
  return (
      <>
      <b>{selectedAzs.azstype__name === 'tatneft' ? 'TATneft' : 'GazProm'}</b> <hr /><br/>
        {info.dop_inf.address}<br/><br />
        <div>
		<hr />
          <table className='center'>
            <thead >
              <tr height="28px" >
            	<th width="50%" border="solid white">
                  марка                
                </th>
              <th width="50%">
                  цена                
              </th>
            </tr>
            </thead>
            <tbody>
              {info.benzines.map((fuel) => <tr ><td>{fuel.benzine__name}</td><td>{fuel.cost}</td></tr>)}
            </tbody>
          </table>
        </div>
<br /><hr /><br />
        {info.dop_inf.services}
      </>
        

  )
}

export const MyMarker = (props) => {
    const {setSelectedAzs, selectedAzs} = React.useContext(AzsContext)
    const {currStation} = props;

	return (
      <Marker position={[currStation.lat, currStation.lon]}
        icon={currStation.azstype__name=== 'gazprom' ? gpIcon: tatIcon}
        eventHandlers={{
          click: () => setSelectedAzs(currStation),
        }}>

			<Popup>
          This station id: {currStation.id}
          
        </Popup>
      </Marker>
    )
};

export const PriceRange = (props) => {
  const {lowCosters} = React.useContext(AzsContext)
  const [selectedFuelType, setSelectedFuelType] = React.useState('')
  const [howered, setHowered] = React.useState(false)
  const handle92click = (e) => {
	setSelectedFuelType('ai92')
	console.log(92, lowCosters, 222, selectedFuelType)
	console.log(333, lowCosters[selectedFuelType])

  }
  const handle95click = (e) => {
	console.log(95, e)
	setSelectedFuelType('ai95')
  }
  const handleDTclick = (e) => {
	console.log('DT', e)
	setSelectedFuelType('DT')
  }

	const CheapestTable = (props) => {

		return (
			<table className='center'>
				<thead>
					<th width={'80px'}>
						id AZS
					</th>
					<th width={'80px'}>
						бензин
					</th>
					<th width={'80px'}> цена
					</th>
				</thead>
				<tbody>
					{lowCosters[selectedFuelType].map((el) => <tr onClick={(e)=> console.log(123, e)}><td>{el.azs__id}</td><td>{el.benzine__name}</td><td>{el.cost}</td> </tr>)}
				</tbody>
			</table>
		); 
	} 

  return (
	<div className='pricerange'>
		<div>
			<button onClick={handle92click}>92</button>
			<button onClick={handle95click}>95</button>
			<button onClick={handleDTclick}>ДТ</button>
		</div>
		<div>
				{lowCosters[selectedFuelType] && <CheapestTable />}
		</div>

	</div>
    
  )
};
