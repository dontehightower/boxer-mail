import React from 'react';

const Landing = () => {
  const styles = {
    height: '80vh',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <div style={styles}>
      <h1>Boxer Mail</h1>
      <p>A harder working email tool</p>
    </div>
  );
};

export default Landing;
