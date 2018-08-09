import React, {Component} from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {Route, Switch} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/counter'
import styles from './app.less'

const A = props => {
    return (
        <div style={{height: 300,width: 400, background: 'yellow'}}>
            我是a
        </div>
    )
}

const B = props => {
    return (
        <div style={{height: 300,width: 400, background: 'red'}}>
            
        </div>
    )
}

const C = props => {
    return (
        <div style={{height: 300,width: 400, background: 'green'}}>
            我是C
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return state
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    // actions: bindActionCreators({...actions}, dispatch),
    linkToA: ()=>dispatch(push('/a')),
    linkToB: ()=>dispatch(push('/b')),
    linkToC: ()=>dispatch(push('/c')),
})
@connect(mapStateToProps, mapDispatchToProps)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {

    }
    render() {
        return (
            <div>
                {/* <h1 className={styles.title}>{this.props.count}</h1>
                <button onClick={this.props.actions.increase}>增加</button>
                <button onClick={this.props.actions.decrease}>减少</button>
                <button onClick={this.props.actions.asyncIncrease}>异步增加</button> */}
                <Switch>
                    <Route exact path="/" component={A} />
                    <Route exact path="/a" component={A} />
                    <Route exact path='/b' component={B} />
                    <Route exact path='/c' component={C} />
                </Switch>
                <button onClick={() => {this.props.linkToA()}}>A</button>
                <button onClick={() => {this.props.linkToB()}}>B</button>
                <button onClick={() => {this.props.linkToC()}}>C</button>
            </div>
        )
    }
}

export default App