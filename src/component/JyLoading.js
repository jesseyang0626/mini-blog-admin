import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import './index.css'
const JyLoading = ({visible=true}) => {

  return (
      <div className={'jy-loading'} style={{display:(visible?'flex':'none')}}>
          <Spinner color="primary" />
      </div>
  );
}

export default JyLoading;