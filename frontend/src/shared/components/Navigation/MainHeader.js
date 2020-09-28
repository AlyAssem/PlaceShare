import React from 'react';

import './MainHeader.css';

const MainHeader = (props) => {
  return (
    <header className='main-header'>
      <React.Fragment>{props.children}</React.Fragment>
    </header>
  );
};

export default MainHeader;
