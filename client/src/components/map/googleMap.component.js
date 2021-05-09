
import React, { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import {formatRelative} from 'date-fns';
import '@reach/combobox/styles.css';
import './googleMap.css';
import usePlacesAutocomplete, {getGeocode,getLatLng,} from "use-places-autocomplete";
import {Combobox,ComboboxInput,ComboboxPopover,
        ComboboxList,ComboboxOption,} from "@reach/combobox";


const libraries = ['places']
const locZoom = 17;
const mapContStyle = { 
  width: '50vw',
  height: '73vh',
};
const center = { 
    lat : 31.25321, 
    lng : 34.786875
};


 const options= {
    styles: [{'featureType': "administrative.country",
            "elementType": "geometry",
            "stylers": [{"visibility": "simplified"},{"hue": "#ff0000"}]
        }],
        disableDefaultUI: true,
        zoomControl:true,
        // mapTypeControl:true,

 }


const fraKey = 'AIzaSyCTwmmUbksAqfSEKLn9fR4oSVbBimBrXvk';


//________________Map finction_______________//

function Map() {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: fraKey,
    libraries,    
  })

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      { lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      }, 
       ]); 
     }, 
     []);

  const mapRef = React.useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(locZoom);
    // mapRef.current.setMarkers();
  }, []);

  return (
    <div className='mapCon'>
        <h2>safe city</h2>
        <Locate panTo={panTo} />
        <Search panTo={panTo} /> 
        {isLoaded? (<GoogleMap
        mapContainerStyle={mapContStyle}
        center= {center}
        zoom={14}
        options= {options}
        onClick ={onMapClick}
        onLoad={onMapLoad}
      >
          {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
             url: `/PushPin.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>had event  {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <>loading...</>}
   
  </div>
  )
}

export default (Map)


function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                zoom: 2
              });
            },
            () => null
          );
        }}
      >
        <img src='/greenHome.svg' alt='my location' />
      </button>
    );
  }
  
  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { 
        lat :()=> 31.253883, 
        lng :()=> 34.785856
    },
        radius: 15000,
      },
    });
  
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log(" Error: ", error);
      }
    };
  
    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }


