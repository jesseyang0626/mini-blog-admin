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
import Login from '../login/login'
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken:""
            ,
            navs:[
                {key:0,name:'列表',href:'/'},
                {key:1,name:'新增/编辑',href:'/home'},
                // {key:2,name:'accessPage',href:'/home'},
            ],
            currentNavKey:0,
            isLogin:true
        };
    }

    componentWillMount(){
        this.setState({accessToken:localStorage.getItem('article_token')})
    }

    onAccessTokenChange=(e)=>{
        this.setState({accessToken:e.target.value})
    }

    render() {
        const {accessToken,currentNavKey,currentArticleId,isLogin} =  this.state
        return <div>
            <Container className="themed-container">
                {/* <Button onClick={()=>{ localStorage.setItem("article_token",accessToken)}}>save token</Button>
                <Input value={this.state.accessToken}
                    onChange={(e)=>{this.setState({accessToken:e.target.value})}}
                ></Input> */}
                <Row >
                    <HeadNav currentKey={currentNavKey} links = {this.state.navs} onChange={(i)=>{this.setState({currentNavKey:i,currentArticleId:''})}}></HeadNav>
                </Row>
                <Row>
                    {this.state.currentNavKey == 0 && <List isLogin={(e)=>{this.setState({isLogin:e})}} accessToken={accessToken} goToEdit={(articleId)=>{this.setState({currentNavKey:1,currentArticleId:articleId})}} ></List>}
                    {this.state.currentNavKey == 1 && <New isLogin={(e)=>{this.setState({isLogin:e})}} currentArticleId={currentArticleId} isLogin={(e)=>{this.setState({isLogin:e})}} accessToken={accessToken} changeTab={(e)=>this.setState({currentNavKey:e})}></New>}
                    {/* {this.state.currentNavKey == 2 && <div><a href={'https://mp.weixin.qq.com/debug/'} target="_blank">open get accesstoken page</a></div>} */}
                    
                </Row>
            </Container>
            <Login isShow={!isLogin} onSave={(token)=>{
                this.setState({accessToken:token,isLogin:true})
                localStorage.setItem("article_token",token)
                // window.location.reload() 
            }}></Login>
        </div>
    }
}

export default withRouter(Index)