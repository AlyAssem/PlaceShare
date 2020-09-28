import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = (props) => {
  // React hook used to referenece to a dom object.
  const mapRef = useRef();

  const { center, zoom } = props;

  //This hook will run after the jsx is rendered.
  //So the error of not seeing the ref is fixed.
  //and whenever center and zoom changes.
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    //   Creates a new Marker in the center of the map.
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
