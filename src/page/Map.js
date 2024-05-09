import { useEffect } from "react";

function Map(){

  useEffect(() => {
    const infowindow = new window.naver.maps.InfoWindow();

    const onSuccessGeolocation = (position) => {
      const location = new window.naver.maps.LatLng(position.coords.latitude, position.coords.longitude);

      const map = new window.naver.maps.Map('map', {
        center: location,
        zoom: 17,
      });

      const marker = new window.naver.maps.Marker({
        position: location,
        map: map,
      });

      infowindow.setContent('<div style="padding:20px;">Current location</div>');
      infowindow.open(map, marker);
      console.log('Coordinates: ' + location.toString());
    };

    const onErrorGeolocation = () => {
      const center = new window.naver.maps.LatLng(37.3595704, 127.105399);

      const map = new window.naver.maps.Map('map', {
        center: center,
        zoom: 17,
      });

      infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5></div>');
      infowindow.open(map, center);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
    } else {
      const center = new window.naver.maps.LatLng(37.3595704, 127.105399);
      const map = new window.naver.maps.Map('map', {
        center: center,
        zoom: 17,
      });
      infowindow.setContent('<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation not supported</h5></div>');
      infowindow.open(map, center);
    }
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}>



    </div>
    
  );

}

export default Map;