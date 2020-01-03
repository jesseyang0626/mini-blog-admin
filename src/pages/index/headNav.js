import React from "react";
import { Container, Nav, NavItem, NavLink, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export default class HeadNav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            currentKey:0
        }
    }
    onNavChange = (i)=>{
        this.setState({currentKey:i})
        const {onChange} = this.props
        onChange(i)
    }
    render() {
        const {links} = this.props
        const {currentKey} = this.state
        return <Nav tabs>
            {links.map((l, i) => {
                return <NavItem onClick={() => { this.onNavChange(i) }}>
                    <NavLink active={i==currentKey}>{l.name}
                          {/* <Link to={l.href}>{l.name}</Link> */}
                        </NavLink>
                </NavItem>
            })}

        </Nav>
    }
}

