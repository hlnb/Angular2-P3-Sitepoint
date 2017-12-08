import { Injectable } from '@angular/core';
import {Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//constant import
import { FORECAST_KEY, FORECAST_ROOT} from '../constants/constants';

@Injectable()
export class WeatherService{
    
    constructor(private jsonp: Jsonp){}
    getCurrentLocation(): [number,number]{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude,  "|" ,pos.coords.longitude); //TODO REMOVE
                return[pos.coords.latitude, pos.coords.longitude]
            },
        error => console.error("Unable to get the postion -", error));
        }else{
            console.error{"Geolocation is not available"};
            return [0,0]

        }
    }

    getCurrentWeather(lat: number, long: number):Observable<any>{
        const url = FORECAST_ROOT + FORECAST_KEY +"/"+ lat + ","+long;
        const queryParams = "?callback=JSONP_CALLBACK";

        return this.jsonp.get(url + queryParams)
        .map(data => data.json())
        .catch(err => {
            console.error("unable to get weather data - ", err);
            return Observable.throw(err.json());
        });
    }
 }


