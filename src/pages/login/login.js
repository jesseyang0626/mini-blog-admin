import React from "react";
import { Modal,ModalBody,ModalFooter,Input,Button} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token:''
        }
    }

    render() {
        const { isShow ,onSave} = this.props
        return <Modal isOpen={isShow}  >
            <ModalBody>
                <div>
                <p>fbc1eb50f578ba35b11d4ff61b39847b wx9bbf102997e7c9d9</p>
                <a href={'https://mp.weixin.qq.com/debug/'} target="_blank">token失效。点击这里获取token，粘贴到下方</a>
                    <Input onChange={(e)=>{this.setState({token:e.target.value})}}></Input>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {onSave(this.state.token)}}>Ok</Button>{' '}
            </ModalFooter>
        </Modal>
    }
}

