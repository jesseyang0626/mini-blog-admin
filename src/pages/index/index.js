import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Container, Nav, NavItem, NavLink, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import HeadNav from './headNav.js'
import List from './list.js'
import New from './new.js'
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessToken:"29_oHv9_AJGI7HeNqHo6hCxwiqMXdnjBT-MSnRqrnR-kM7V3YCtHHH6viq96oo0tZhP-rlMgjja2koTwTVEdtQcyS7PUTno8j0Oy0xt3tcFQizOg0D0nYZ9U6jW5XSTfsQKOY9qQ42uHOcHypgnUTNcAFAXWQ"
            ,
            navs:[
                {key:0,name:'list',href:'/'},
                {key:1,name:'edit',href:'/home'},
                {key:2,name:'3',href:'/home'},
                {key:3,name:'4',href:'/home'},
            ],
            articles:[
                {id:0,title:'222',author:'333'},
                {id:1,title:'24',author:'2323'},
                {id:2,title:'22123212',author:'434'},
            ],
            currentNavKey:0
        };
    }

    render() {
        const {assessToken} =  this.state
        return <div>
            <Container className="themed-container">
                assesstoken<Input value={this.state.assessToken}
                    onChange={(e)=>{this.setState({assessToken:e.target.value})}}
                ></Input>
                <Row >
                    <HeadNav links = {this.state.navs} onChange={(i)=>{this.setState({currentNavKey:i})}}></HeadNav>
                </Row>
                <Row>
                    {this.state.currentNavKey == 0 && <List assessToken={assessToken} datas={this.state.articles}></List>}
                    {this.state.currentNavKey == 1 && <New assessToken={assessToken}></New>}
                    {this.state.currentNavKey == 2 && <div><a href={'https://mp.weixin.qq.com/debug/'}>open get </a></div>}
                    
                </Row>
            </Container>

        </div>
    }
}

