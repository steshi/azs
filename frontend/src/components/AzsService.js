import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class AzsService{
	constructor(){}
	
	getStations(neLat, neLng, swLat, swLng) {
		const url = `${API_URL}/stations/${neLat}/${neLng}/${swLat}/${swLng}/`;
		return axios.get(url).then(response => response.data);
	}  
 
	getInformStationById(id){
		const url = `${API_URL}/inform/${id}/`;
		return axios.get(url).then(response => response.data);
	}
	getMap(z, x, y){
		const url = `${API_URL}/map/${z}/${x}/${y}.pbf/`;
		return axios.get(url).then(response => response.data);
	}
}
