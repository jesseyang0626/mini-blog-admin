import React, { useState } from 'react';
import { Alert, Table, Pagination, PaginationItem, PaginationLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import JyAlert from '../../component/JyAlert'
import JyModal from '../../component/JyModal'
import JyLoading from '../../component/JyLoading'
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
            alertVisible: false,
            alertTitle: ''
        }
    }

    componentWillMount() {
        this.getArticleList()
    }
    getArticleList = () => {
        this.setState({ loading: true })
        const { accessToken,isLogin } = this.props
        const { pageSize, pageNum } = this.state
        invokeCloudFunction(accessToken, `getArticleList`, { pageSize, pageNum }, "travel-pet-1").then(res => {
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
                isLogin(false)
                // alert(res)
            }
        }).catch(res => {
            // alert(res)
            isLogin(false)
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
        this.setState({ deleteId: id })
        this.deleteModalToggle()
    }


    deleteModalToggle = () => {
        this.state.deleteModalShow = !this.state.deleteModalShow
        this.setState()
    }
    closeAlert = () => {
        setTimeout(() => {
            this.setState({ alertVisible: false })

        }, 3000)
    }
    onDeleteOk = (id) => {
        const { accessToken } = this.props
        const { deleteId } = this.state
        let _ = this
        invokeCloudFunction(accessToken, `deleteArticle`, { id }, "travel-pet-1").then(res => {
            console.log(res)
            this.setState({ loading: false })
            if (res.errcode == 0) {
                const funcRs = JSON.parse(res.resp_data)
                console.log(funcRs)
                _.getArticleList()
                _.setState({ alertTitle: '删除成功' })
                _.setState({ alertVisible: true })
                _.closeAlert()
            } else {
                _.setState({ alertTitle: '删除失败' })
                _.setState({ alertVisible: true })
                _.closeAlert()
            }
        }).catch(res => {
            alert(res)
            this.setState({ loading: false })
        })
        this.state.deleteModalShow = !this.state.deleteModalShow
        this.state.deleteId = ''
        this.setState()
    }
    render() {
        const { loading, articles, pageNum, deleteModalShow, alertVisible, alertTitle,deleteId } = this.state
        const {goToEdit} = this.props
        return <div style={{ width: '100%' }}>

            {/* {loading && <Spinner style={{ width: '3rem', height: '3rem' }} />} */}
            {!loading && <div style={{ width: '100%' }}>
                <Button onClick={() => { this.getArticleList() }}>refresh</Button>
                <JyAlert title={alertTitle} alertVisible={alertVisible}></JyAlert>
                <Table>
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
                                    <Button color="danger" onClick={() => { this.deleteArticle(a._id) }}>delete</Button>
                                    <Button color="info" onClick={()=>{goToEdit(a._id) }}>edit</Button>
                                    <Button color="warning">back to draft</Button>
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
            <JyModal
                isShow={deleteModalShow}
                onOk={this.onDeleteOk}
                onCancel={() => { this.setState({ deleteModalShow: false }) }}
                title="Are you sure to delete this?"
                id={deleteId}
            >
            </JyModal>
            <JyLoading visible={loading}></JyLoading>

        </div>
    }
}

