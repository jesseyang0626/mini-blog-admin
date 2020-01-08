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
import JyLoading from '../../component/JyLoading'
export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _id:'',
            mdContent:'',
            htmlContent:'',
            title:'',
            author:'Jesse Yang',
            loading:false
        }
        this.mdParser = new MarkdownIt()
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    componentWillMount(){
        const {currentArticleId,accessToken,isLogin} = this.props
        console.log(currentArticleId)
            let _ = this
        if(currentArticleId){
            invokeCloudFunction(accessToken,`getArticleDetail`,{id:currentArticleId},"travel-pet-1").then(res=>{
                console.log(res)
                this.setState({loading:false})
                if(res.errcode == 0){
                    const funcRs= JSON.parse(res.resp_data)
                   console.log(funcRs.data)
                    _.setState({...this.state,...funcRs.data})
                }else{
                    isLogin(false)
                }
            }).catch(res=>{
                isLogin(false)
                this.setState({loading:false})
            })
        }
    }

    handleEditorChange( {html,text}){
        console.log('handleEditorChange', html, text)
        this.setState({htmlContent:html,mdContent:text})
    }
    saveArticle=(operation)=>{
        const {accessToken,changeTab,isLogin} = this.props
        const {htmlContent,mdContent,title,author,_id} = this.state
        if(!title || !author){
            alert('can not save')
            return 
        }

        let params = {
            _id,
            title,
            author,
            mdContent,
            htmlContent,
            status:operation
        }
        this.setState({loading:true})
        invokeCloudFunction(accessToken,`addArticle`,params,"travel-pet-1").then(res=>{
            console.log(res)
            this.setState({loading:false})
            if(res.errcode == 0){
                const funcRs= JSON.parse(res.resp_data)
               console.log(funcRs)
               changeTab(0)
            }else{
                isLogin(false)
            }
        }).catch(res=>{
            isLogin(false)
            this.setState({loading:false})
        })
    }
    render() {
        const { data } = this.props
        let {author,title,loading,mdContent} = this.state
        return <div style={{ width: '100%' }}>
            <Button color="primary" onClick={()=>{this.saveArticle('save')}}>save</Button>
            <Button color="info" onClick={()=>{this.saveArticle('submit')}}>submit</Button>
            <hr></hr>
            title:<Input invalid={!title}  value={title} onChange={(e)=>{this.setState({title:e.target.value})}}></Input>
            author:<Input invalid={!author} value={author} onChange={(e)=>{this.setState({author:e.target.value})}}></Input>
            content:
            <div style={{ height: "800px" }}>
                <MdEditor
                    value={mdContent}
                    renderHTML={(text) => this.mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
            </div>
            <JyLoading visible={loading}></JyLoading>
        </div>
    }
}

