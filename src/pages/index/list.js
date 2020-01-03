import React from "react";
import { Table, Pagination ,PaginationItem,PaginationLink , Button, Form, FormGroup, Label, Input, FormText,Spinner } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {invokeCloudFunction} from '../../api'
export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
            articles:[]
        }
    }

    componentWillMount(){
        this.getArticleList()
    }
    getArticleList = ()=>{
        this.setState({loading:true})
        const {assessToken} = this.props
        invokeCloudFunction(assessToken,`getArticleList`,{a:2,b:3},"travel-pet-1").then(res=>{
            console.log(res)
            this.setState({loading:false})
            if(res.errcode == 0){
                const funcRs= JSON.parse(res.resp_data)
                if(funcRs.errMsg == 'collection.get:ok'){
                    this.setState({articles:funcRs.data})
                }else{
                    alert('query wrong')
                }
            }else{
                alert(res)
            }
        }).catch(res=>{
            alert(res)
            this.setState({loading:false})
        })
    }


    render() {
        const {loading} = this.state
        return <div>

            { loading && <Spinner style={{ width: '3rem', height: '3rem' }} />}
            {!loading && <div><Table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>operation</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.articles.map(a=>{
                        return  <tr key={a._id}>
                                    <td>{a.title}</td>
                                    <td>{a.author}</td>
                                    <td>
                                        <Button>delete</Button>
                                        <Button>edit</Button>
                                    </td>
                                </tr>
                    })}
                   
                </tbody>
            </Table>
            <Pagination size="lg" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink first href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink last href="#" />
      </PaginationItem>
      </Pagination>
                </div>
            }
        </div>
    }
}

