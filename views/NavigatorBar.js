import React from 'react';
import { View,StyleSheet,Dimensions,Platform,Text,TouchableOpacity,Image } from 'react-native';
import DeviceUtils from '../utils/DeviceUtils';
const TITLE_OFFSET_CENTER_ALIGN = 70;
const NAVIGATOR_BAR_HEIGHT = 44;

export default function NavigatorBar(props) {
    const { navigator,statusBarHeight } = props;
    const { hideBackButton,centerView,title,rightViews,backView,style } = navigator;
    const paddingTop = Platform.OS === 'ios'? DeviceUtils.ifIsIphoneX(44,20): !statusBarHeight ? 20: statusBarHeight;
    const height = Platform.OS === 'ios'? DeviceUtils.ifIsIphoneX(88,64): paddingTop + NAVIGATOR_BAR_HEIGHT;

    return(
        <View style={[styles.container,{ height,paddingTop },style]}>
            <View style={styles.back}>
                { !hideBackButton? (!backView ? renderBackButton(props) :backView) :null }
            </View>
            <View style={styles.centerView}>
                { !centerView ? <Text style={styles.headTitle} numberOfLines={1}>{ title }</Text> : centerView }
            </View>
            <View style={styles.right}>
                { !rightViews ? null: renderRightViews(props,rightViews) }
            </View>
        </View>
    );
}

function renderBackButton(props) {
    const { goBack } = props;
    return(
        <TouchableOpacity style={styles.button} onPress={() => { goBack && goBack(); }}>
            <Image style={styles.icon} source={require('../images/back.png')}/>
            <Text style={styles.title}>返回</Text>
        </TouchableOpacity>
    )
}
function renderRightViews(props,rightViews) {
    const { rightDisable } = props;
    return rightViews.map((item,index) => {
        const { onClick,text,id } = item;
        return(
            <TouchableOpacity disabled={rightDisable} style={styles.iconBtn} key={item+index} onPress={() => { onClick && onClick(id); }}>
                { typeof text === 'string' ? <Text style={styles.title}>{ text }</Text> : <Image style={styles.icon} source={text}/> }
            </TouchableOpacity>
        );
    });
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:width,
        backgroundColor:'#2593fc'
    },
    back:{
        width:TITLE_OFFSET_CENTER_ALIGN,
        height:NAVIGATOR_BAR_HEIGHT,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        flexDirection:'row',
        alignItems:'center',
        width:TITLE_OFFSET_CENTER_ALIGN,
        height:NAVIGATOR_BAR_HEIGHT
    },
    title:{
        color:'white',
        fontSize:14
    },
    centerView:{
        justifyContent:'center',
        alignItems:'center',
        height:NAVIGATOR_BAR_HEIGHT,
        flex:1
    },
    headTitle:{
        marginHorizontal:8,
        fontSize:16,
        color:'white'
    },
    right:{
        width:TITLE_OFFSET_CENTER_ALIGN,
        height:NAVIGATOR_BAR_HEIGHT,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:8
    },
    icon:{
        height:24,
        width:24,
        marginLeft:8
    },
    iconBtn:{
        justifyContent:'center',
        alignItems:'center',
        height:30,
        width:30,
        marginLeft:4
    }
});