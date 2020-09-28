import React from 'react';
var style = {
  backgroundColor: '#343a40',
  borderTop: '1px solid #E7E7E7',
  textAlign: 'center',
  paddingBottom: '2rem',
  paddingTop: '0.5rem',
  color: 'white',
  position: 'fixed',
  left: '0',
  bottom: '0',
  height: '20px',
  width: '100%',
};

function Footer() {
  return (
    <div>
      <div style={style}>
        <span>© Copyright 2020 PlaceShare</span>
      </div>
    </div>
  );
}

export default Footer;
