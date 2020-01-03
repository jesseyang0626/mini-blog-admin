import React from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { invokeCloudFunction } from '../../api'
export default class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            articles: [],
            pageSize: 10,
            pageNum: 1,
            deleteModalShow: false,
        }
    }

    componentWillMount() {
        this.getArticleList()
    }
    getArticleList = () => {
        this.setState({ loading: true })
        const { assessToken } = this.props
        const { pageSize, pageNum } = this.state
        invokeCloudFunction(assessToken, `getArticleList`, { pageSize, pageNum }, "travel-pet-1").then(res => {
            console.log(res)
            this.setState({ loading: false })
            if (res.errcode == 0) {
                const funcRs = JSON.parse(res.resp_data)
                if (funcRs.errMsg == 'collection.get:ok') {
                    this.setState({ articles: funcRs.data })
                } else {
                    alert('query wrong')
                }
            } else {
                alert(res)
            }
        }).catch(res => {
            alert(res)
            this.setState({ loading: false })
        })
    }

    lastPage = () => {
        let { pageNum } = this.state
        pageNum--
        if (pageNum < 1) pageNum = 1
        this.setState({ pageNum }, () => {
            this.getArticleList()

        })

    }
    nextPage = () => {
        let { pageNum } = this.state
        pageNum++
        this.setState({ pageNum }, () => {
            this.getArticleList()

        })
    }
    deleteArticle = (id) => {
        this.deleteModalToggle()
        const { assessToken } = this.props
        let _ = this
        invokeCloudFunction(assessToken, `deleteArticle`, { id }, "travel-pet-1").then(res => {
            console.log(res)
            this.setState({ loading: false })
            if (res.errcode == 0) {
                const funcRs = JSON.parse(res.resp_data)
                console.log(funcRs)
                _.getArticleList()
            } else {
                alert(res)
            }
        }).catch(res => {
            alert(res)
            this.setState({ loading: false })
        })
    }


    deleteModalToggle=()=>{
        this.state.deleteModalShow = !this.state.deleteModalShow
        this.setState()
    }
    render() {
        const { loading, articles, pageNum, deleteModalShow } = this.state
        return <div style={{ width: '100%' }}>

            {loading && <Spinner style={{ width: '3rem', height: '3rem' }} />}
            {!loading && <div style={{ width: '100%' }}><Table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>operation</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.articles.map(a => {
                        return <tr key={a._id}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>
                                <Button onClick={() => { this.deleteArticle(a._id) }}>delete</Button>
                                <Button>edit</Button>
                            </td>
                        </tr>
                    })}
                    {this.state.articles.length == 0 && <span>no more</span>}

                </tbody>
            </Table>
                <Pagination size="lg" aria-label="Page navigation">
                    <PaginationItem>
                        <PaginationLink first onClick={() => { this.lastPage() }} disabled={pageNum == 1} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink last onClick={() => { this.nextPage() }} disabled={articles.length == 0} />
                    </PaginationItem>
                </Pagination>
            </div>
            }

            <Modal isOpen={deleteModalShow} toggle={() => { }} >
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>this.setState({deleteModalShow:false})}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={()=>this.deleteModalToggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }
}

