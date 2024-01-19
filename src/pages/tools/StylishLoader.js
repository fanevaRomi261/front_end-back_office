// StylishLoader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const StylishLoader = ({ loading }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ClipLoader color="#51cbce" loading={loading} size={50} />
    </div>
  );
};

export default StylishLoader;
