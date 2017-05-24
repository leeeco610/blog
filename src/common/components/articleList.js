import React, { Component } from "react"
import { render } from 'react-dom'
import { Link, IndexLink, browserHistory } from 'react-router'
import * as actions from '../actions/index'

const ArticleItem = ({ data }) => {
    return <li> <Link to =  {{pathname: "/" + encodeURI(data.name) + "/" + encodeURI(data.time.day) + "/" + encodeURI(data.title)}}>
        <div className = "title" > { data.title } </div>  <div className = "describe"> { data.content ? data.content.substr(0, 50) : "" }... </div> 
        </Link> 
         <div className = "info" > 作者： { data.name }&nbsp;&nbsp;
            阅读量：{ data.pv } &nbsp;&nbsp;
            发布时间：{ data.time.minute }&nbsp;&nbsp;
            分类: <Link to = {{ pathname : '/',query : { category : data.category }}} >{ data.category == 1 ? "web开发" : "node开发"}</Link>
         </div>  
    </li>
}
export class PageLi extends Component {

    constructor(props) {
        super(props)
        this._alert = this.props.actions._alert
    }

    swtichPage(i, type) {
        
        if (this.props.type == 'index') {
            this.props.actions.ajaxData('index', i)
            this.input.value = ""
            browserHistory.push('/?page='+i)
            // browserHistory.push({
            //     pathname: '/',
            //     query: { page: i }
            // })
        } else if (this.props.type == "category") {
            this.props.actions.ajaxData(this.props.type, i)
            this.input.value = ""
            browserHistory.push({
                pathname: '/',
                query: { page: i ,category: this.props.query.category }
            })
        } else if (this.props.type == "search") {
            this.props.actions.ajaxData(this.props.query.keyword, i)
            this.input.value = ""
            browserHistory.push({
                pathname: 'search',
                query: { page: i, keyword: this.props.query.keyword }
            })
        }

    }

    urlParams(i){

        if(this.props.type == 'index'){
            return '/?page='+i
        }else if(this.props.type == "category"){
            return '/?category='+this.props.query.category+'&page='+i
        }else if(this.props.type == "search"){
            return '/search?keyword='+this.props.query.keyword+'&page='+i
        }

    }

    prev(pageCurrent){
        
        if (pageCurrent <= 1) { 
            this._alert("已经是第一页了"); 
            return 
        };
        this.swtichPage(Number(pageCurrent) - 1) 

    }

    next(pageCurrent,len){
        
        if (pageCurrent >= len) { 
            this._alert("已经是最后一页了")
            return 
        }
        this.swtichPage(Number(pageCurrent) + 1) 
    }

    jump(len){

        if (this.input.value <= 0) {
            this._alert("你输入的页码不正确，请重新输入")
            return
        };
        if (this.input.value > len) {
            this._alert("你输入的页码超过最大页数，请重新输入")
            return
        }
        this.swtichPage(Number(this.input.value), "jump")
    
    }

    render() {

        let pageTmp = [],
            pageList = this.props.pageList,
            len = pageList && Math.ceil(pageList.count / pageList.limitNum), //页码最大条数
            pageCurrent = this.props.query.page || 1, //当前处于第几页
            maxPage = 7, //页码最多展示几页
            edgePage = 4 ||maxPage % 2 ? Math.floor(maxPage / 2) : maxPage / 2

        if(len<=1){
            return <div></div>
        }

        if (pageCurrent <= maxPage - edgePage) {

            if (len <= maxPage) {
                for (let i = 1; i <= len; i++) {

                    pageTmp.push( < li key = { i }> 
                        < Link to = { this.urlParams(i) } activeClassName = "active" >{ i }< /Link></li> )
                }
            } else {
                for (let i = 1; i <= maxPage; i++) {
                    pageTmp.push( < li key = { i }> 
                        < Link to = { this.urlParams(i) } activeClassName = "active">{ i }< /Link></li> )
                }
            }

        } else if (pageCurrent > len) {

            console.error("页码错误")

        } else if (pageCurrent >= len - edgePage) {

            if (len <= maxPage - 1) {
                for (let i = 1; i <= pageCurrent; i++) {
                    pageTmp.push( < li key = { i }> 
                        < Link to = { this.urlParams(i) } activeClassName = "active">{ i }< /Link></li> )
                }
            } else {
                for (let i = len - (maxPage - 1); i <= len; i++) {
                    pageTmp.push( < li key = { i }> 
                        < Link to = { this.urlParams(i) } activeClassName = "active">{ i }< /Link></li> )
                }
            }

        } else {

            for (let i = pageCurrent - edgePage; i <= (Number(pageCurrent) + edgePage); i++) {
                pageTmp.push( < li key = { i }> 
                    < Link to = { this.urlParams(i) } activeClassName = "active">{ i }< /Link></li> )
            }
            
        }
        return <div className = "pageListBox">
                <ul className = "pageList">
                    <li onClick = { ()=>{this.prev(pageCurrent)} }>
                        <a className = "pageBtn">上一页</a>
                    </li>
                    { pageTmp }
                    <li onClick = { ()=>{this.next(pageCurrent,len)} }>
                        <a className = "pageBtn"> 下一页 </a>
                    </li>
                    <li><input type = "text" ref = { el => { this.input = el } } /></li>
                    <li onClick = { ()=>{this.jump(len)} }>
                        <a className = "pageBtn pageJumpBtn">跳转</a>
                    </li>
                </ul>
            </div>

    }
}

export class ArticleList extends Component {
   
    componentWillReceiveProps(nextProps){
        
        if (nextProps.type == "index") {
            if (this.props.query.page != nextProps.query.page) {
                this.props.actions.ajaxData(nextProps.type, nextProps.query.page)
            }
        } else if (nextProps.type == "category") {
            if (this.props.query.category != nextProps.query.category || (this.props.query.page != nextProps.query.page)) {
                this.props.actions.ajaxData(nextProps.type, {'category' :nextProps.query.category ,'page':nextProps.query.page})
            }
        } else if (nextProps.type == "search"){
            if (this.props.query.keyword != nextProps.query.keyword || (this.props.query.page != nextProps.query.page)) {
                this.props.actions.ajaxData(nextProps.type, {'keyword' :nextProps.query.keyword,'page':nextProps.query.page})
            }
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldComponentUpdate,是否修需要渲染',nextProps,nextState)
    //     if (this.props.articleList) {
    //         console.log(this.props.articleList[0]['_id']!=nextProps.articleList[0]['_id'])
    //         return this.props.articleList[0]['_id'] != nextProps.articleList[0]['_id'] 
    //     }
    //     return true
    //     // if (this.props.articleList) {
    //     //     var i = location.hash.match(/page=\d+/) ? location.hash.match(/page=\d+/).join('').match(/\d/)[0] : ''
    //     //     var category = location.hash.match(/category=\d+/) ? location.hash.match(/category=\d+/).join('').match(/\d/)[0] : ''
    //     //     if (this.props.type == "index1") {
    //     //         if ((this.props.query.page || i) && this.props.query.page != i) {
    //     //             this.props.actions.ajaxData(this.props.type, i)
    //     //             return false
    //     //         }
    //     //         return true
    //     //     } else if (this.props.type == "category") {
    //     //         if ((this.props.query.page || i) && this.props.query.page != i) {
    //     //             this.props.actions.ajaxData(this.props.type, i)
    //     //             return false
    //     //         }
    //     //         return true
    //     //     } else if (this.props.type == "search"){
    //     //         if (this.props.query.keyword && (this.props.query.page || i) && this.props.query.page != i) {
    //     //             this.props.actions.ajaxData(this.props.query.keyword, i)
    //     //             return false
    //     //         }
    //     //         return true
    //     //     }
    //     //     return true
    //     // }
    //     // return true
    // }
    render() {
        
        let articleTmp = [],
            articleList = this.props.articleList
        if (articleList) {
            let data = articleList
            for (let i = 0; i < data.length; i++) {
                    articleTmp.push( <ArticleItem key = { i } data = { data[i] } /> )
                }
            }
            return <div> <ul className = "articleList"> { articleTmp.length ? articleTmp : "暂无搜索结果" } </ul></div>
        }
    }
