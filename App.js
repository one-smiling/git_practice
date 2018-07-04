/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 //修改文件
//分支dev修改文件
import {computed, observable, action} from "mobx";
import { inject, observer } from 'mobx-react/native';

import {Button,View,Text} from "react-native";
import React,{ Component } from 'react';
import { Provider as MobxProvider } from 'mobx-react/native';


class MyState {
    @observable num1 = 0;
    @observable num2 = 100;
    @computed get total() {
        return this.num1 + this.num2;
    }
}

class MyStateActions {
    constructor ({myState}) {
        this.myState = myState;
    }

    @action addNum1 = () => {
        this.myState.num1 ++;
    };
    @action addNum2 = () => {
        this.myState.num2 ++;
    };
}

const mobxState = {
    myState:new MyState
}
const mobxActions = {
    myStateActions:new MyStateActions(mobxState)
}

@inject('myState','myStateActions') @observer
class AllNum extends Component{
    render () {
        return (
            <Text>num1 + num2 = {this.props.myState.total}</Text>
        )
    }
}

@inject('myState','myStateActions') @observer
class Main extends Component{
    render() {
        return (
            <View>
                <Text>num1 = {this.props.myState.num1}</Text>
                <Text>num2 = {this.props.myState.num2}</Text>
                <View>
                    <Button onPress={this.props.myStateActions.addNum1} title='num1 + 1'/>
                </View>
            </View>
        )
    }
}

@observer
export default class App extends React.Component {
    render() {
        return (
            <MobxProvider {...mobxState} {...mobxActions} >
                <View style={{paddingTop:20}}>
                    <Main />
                    <AllNum />
                </View>
            </MobxProvider>
        );
    }
}
