import React, { useState } from 'react';
import { Button,Modal ,ModalBody,ModalFooter} from 'reactstrap';

const JyModal = ({isShow=false,title='',onOk=()=>{},onCancel=()=>{},id=''}) => {

  return (
    <Modal isOpen={isShow}  >
                <ModalBody>
                    {title}
               </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => onOk(id)}>Ok</Button>{' '}
                    <Button color="secondary" onClick={() => onCancel() }>Cancel</Button>
                </ModalFooter>
            </Modal>
  );
}

export default JyModal;