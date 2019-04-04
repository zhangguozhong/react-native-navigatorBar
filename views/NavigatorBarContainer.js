import React,{ Component } from 'react';
import { View,StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import NavigatorBar from './NavigatorBar';
import NavigatorStore from '../store/navigatorStore';
import { withMappedNavigationProps,NavigatorPush } from 'react-navigation-props-helper';

@withMappedNavigationProps
@observer
export default (WrappedComponent) => class extends Component {
    constructor(props) {
        super(props);
        this.navigatorStore = new NavigatorStore();
    }

    goBack = () => { NavigatorPush.goBack(); };
    render() {
        const { hideNavBar } = this.navigatorStore.getNavigationOptions;
        const { rightDisable } = this.navigatorStore.getNavigatorParams;
        const { statusBarHeight } = this.props;
        return (
            <View style={styles.mainView}>
                { !hideNavBar? <NavigatorBar goBack={this.goBack} statusBarHeight={statusBarHeight} navigator={this.navigatorStore.getNavigationOptions} rightDisable={rightDisable}/> :null }
                <WrappedComponent {...this.props} navigatorStore={this.navigatorStore}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    mainView:{
        flex:1
    }
});