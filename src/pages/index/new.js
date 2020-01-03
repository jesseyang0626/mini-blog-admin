import React from "react";
import { Table, Container, Nav, NavItem, NavLink, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import {invokeCloudFunction} from '../../api'
export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mdContent:'',
            htmlContent:'',
            title:'',
            author:'Jesse Yang',


        }
        this.mdParser = new MarkdownIt()
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    handleEditorChange( {html,text}){
        console.log('handleEditorChange', html, text)
        this.setState({htmlContent:html,mdContent:text})
    }
    saveArticle=()=>{
        const {assessToken,changeTab} = this.props
        const {htmlContent,mdContent,title,author} = this.state
        let params = {
            title,
            author,
            mdContent,
            htmlContent
        }
        invokeCloudFunction(assessToken,`addArticle`,params,"travel-pet-1").then(res=>{
            console.log(res)
            this.setState({loading:false})
            if(res.errcode == 0){
                const funcRs= JSON.parse(res.resp_data)
               console.log(funcRs)
               changeTab(0)
            }else{
                alert(res)
            }
        }).catch(res=>{
            alert(res)
            this.setState({loading:false})
        })
    }
    render() {
        const { data } = this.props
        let {author,title} = this.state
        return <div style={{ width: '100%' }}>
            <Button color="primary" onClick={()=>{this.saveArticle()}}>submit/update</Button>
            <hr></hr>
            title:<Input value={title} onChange={(e)=>{this.setState({title:e.target.value})}}></Input>
            author:<Input value={author} onChange={(e)=>{this.setState({author:e.target.value})}}></Input>
            content:
            <div style={{ height: "800px" }}>
                <MdEditor
                    value={''}
                    renderHTML={(text) => this.mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
            </div>
        </div>
    }
}

