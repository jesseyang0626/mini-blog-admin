import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const JyAlert = ({title='111',alertVisible=false}) => {

  return (
    <Alert color="info" isOpen={alertVisible}>
      {title}
    </Alert>
  );
}

export default JyAlert;