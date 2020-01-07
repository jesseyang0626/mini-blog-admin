import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import { Container, Nav, NavItem, NavLink, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import HeadNav from './headNav.js'
import List from './list.js'
import New from './new.js'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assessToken:"29_yBMENu4E-Rc2ULJ6oqv3EhN1oYvmA4BjjnOkRZT5OdY1UTG9unnJuZ0eNer2WtN0v15t4xe5F8IzHCkl6LD4H7q81yaukE6QFgssFNLfYSXp0YTy6mpvJItlXC4XWXdADAEDE"
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
                <Button onClick={()=>{}}>refresh</Button>
                assesstoken<Input value={this.state.assessToken}
                    onChange={(e)=>{this.setState({assessToken:e.target.value})}}
                ></Input>
                <Row >
                    <HeadNav links = {this.state.navs} onChange={(i)=>{this.setState({currentNavKey:i})}}></HeadNav>
                </Row>
                <Row>
                    {this.state.currentNavKey == 0 && <List assessToken={assessToken} datas={this.state.articles}></List>}
                    {this.state.currentNavKey == 1 && <New assessToken={assessToken} changeTab={(e)=>this.setState({currentNavKey:e})}></New>}
                    {this.state.currentNavKey == 2 && <div><a href={'https://mp.weixin.qq.com/debug/'}>open get </a></div>}
                    
                </Row>
            </Container>

        </div>
    }
}

export default withRouter(Index)