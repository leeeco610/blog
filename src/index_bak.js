/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2016-09-05 00:58:23
 * @version $Id$
 */
//import 'babel-polyfill'
import 'fetch-ie8';
import 'es5-shim';
import 'es5-shim/es5-sham'
import 'es6-shim';
// import 'es6-shim/es6-sham'
// import 'es6-promise'

import React, { Component } from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider, connect } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from "redux"
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory } from 'react-router'
import * as actions from './js/actions/index'

import stores from './js/reducers/index'
import Index from './js/components/index'
import MobBox from './js/containers/mobBox'
import Nav from './js/containers/nav'
import TipsBox from './js/containers/tipsBox'


import "./less/style.less"
import './form/css/form.css'


let store = createStore(
    stores,
    applyMiddleware(thunkMiddleware)
)
const About = {
    path: 'about',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./js/components/about'))
        })
    }
}
const Search = {
    path: 'search',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./js/components/search'))
        })
    }
}
const Details = {
    path: '/:name/:date/:title',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./js/components/details'))
        })
    }
}
const Publish = {
    path: 'publish',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./js/components/publish'))
        })
    }
}
const ReactForm = {
    path: 'ReactForm',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./form/containers/App'))
        })
    }
}
const Page404 = {
    path: '*',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./js/components/page404'))
        })
    }
}

class App extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        let WinH = document.documentElement.clientHeight
        let wrap = document.querySelector('.container')
        wrap.style.minHeight = (WinH - 270) + "px"
    }
    render(){
        console.log(this.props.location.query)
        return <div className="page">
            <Nav/>
            <div className="navBox">
                <ul className="nav content">
                    <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
                    <li><Link to="/publish" activeClassName="active">发布文章</Link></li>
                    <li><Link to="/about" activeClassName="active">关于网站架构</Link></li>
                    <li><Link to="/ReactForm" activeClassName="active">DIY表单</Link></li>
                </ul>
            </div>
            <div className="container content">{this.props.children || <Index query={ this.props.location.query } />}</div>
            <MobBox />
            <Foot/>
            <TipsBox/>
        </div>
    }
}
const Foot = () => ( < div className = "Footer" > 源码： < a target = "_blank"
    href = "https://github.com/hechuanhua/blog" > https: //github.com/hechuanhua/blog</a></div>
)

const rootRoute = {
    component: 'div',
    childRoutes: [{
        path: '/',
        component: App,
        childRoutes: [
            Publish,
            About,
            Search,
            Details,
            ReactForm,
            Page404
        ]
    }]
}
render(( 
    < Provider store = { store } >
        < Router history = { hashHistory } routes = { rootRoute } >< /Router> 
    < /Provider>
), document.getElementById("APP"))
