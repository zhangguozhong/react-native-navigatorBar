import { observable,action,computed } from 'mobx';

export default class NavigatorStore {

    @observable navigationOptions = {};
    @observable navigatorParams = {};

    @action setNavigatorBar(navigationOptions) {
        this.navigationOptions = navigationOptions;
    }
    @computed get getNavigationOptions() { return this.navigationOptions; }

    @action setParameters(params) {
        this.navigatorParams = params;
    }
    @computed get getNavigatorParams() { return this.navigatorParams; }
}