# react-native-navigatorBar


## Installation

npm install --save react-native-navigation-bar or yarn add react-native-navigation-bar

react-native link react-native-device-info


## Demo

```javascript

App.js
import { NavigatorPush } from 'react-navigation-props-helper';

type Props = {};
export default class App extends Component<Props> {
    componentWillMount() {
        serverEnv.currentEnv = 'test';
        configHeader.setHeaders({test:'value'});

        httpClient.requestAction({method:'POST',server:'tms',apiUrl:'test/url'}, (data) => {
            console.log('callback', data);
        });
    }
    render() {
        return (
            <Provider rootStore={store}>
                <View style={styles.container}>
                    <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
                    <AppContainer screenProps={{ statusBarHeight:StatusBar.currentHeight }} ref={navigatorRef => { NavigatorPush.setTopLevelNavigator(navigatorRef); }}/>
                </View>
            </Provider>
        );
    }
}

TestPage.js
import React,{ Component } from 'react';
import { View } from 'react-native';
import { observer } from 'mobx-react';
import { NavigatorBarContainer } from 'react-native-navigation-bar';

@NavigatorBarContainer
@observer
export default class TestPage extends Component {
    componentDidMount() {
        const { navigatorStore } = this.props;
        navigatorStore.setNavigatorBar({
            title:'动态设置导航条标题',
            rightViews:[{ text:'提交',onClick:this.onClick,id:'就是打酱油的' }],
            style:{ backgroundColor:'blue' }
        });

        navigatorStore.setParameters({ rightDisable:true });
    }

    onClick = (id) => {
        console.log(id);
    };

    render() {
        return(
            <View style={{flex:1}}>

            </View>
        );
    }
}

```
