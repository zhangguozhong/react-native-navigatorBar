import React from 'react';
import { View,StyleSheet,Dimensions,Platform,Text,TouchableOpacity,Image } from 'react-native';
import DeviceUtils from '../utils/DeviceUtils';
const TITLE_OFFSET_CENTER_ALIGN = 70;
const NAVIGATOR_BAR_HEIGHT = 44;

export default function NavigatorBar(props) {
    const { navigator,statusBarHeight } = props;
    const { hideBackButton,centerView,title,rightViews,backView,style,tintColor } = navigator;
    const paddingTop = Platform.OS === 'ios'? DeviceUtils.ifIsIphoneX(44,20): !statusBarHeight ? 20: statusBarHeight;
    const height = Platform.OS === 'ios'? DeviceUtils.ifIsIphoneX(88,64): paddingTop + NAVIGATOR_BAR_HEIGHT;
    return(
        <View style={[styles.container,{ height,paddingTop },style]}>
            <View style={styles.back}>
                { !hideBackButton? (!backView ? renderBackButton(props) :backView) :null }
            </View>
            <View style={styles.centerView}>
                { !centerView ? <Text style={[styles.headTitle,{ color:!tintColor? 'white': tintColor }]} numberOfLines={1}>{ title }</Text> : centerView }
            </View>
            <View style={styles.right}>
                { !rightViews ? null: renderRightViews(props,rightViews) }
            </View>
        </View>
    );
}

function renderBackButton(props) {
    const { goBack,navigator } = props;
    const { interceptGoBack,backTitle,tintColor } = navigator;
    return(
        <TouchableOpacity style={styles.button} onPress={() => {
            if (interceptGoBack) {
                interceptGoBack && interceptGoBack();
            }else {
                goBack && goBack();
            }
        }}>
            <Image style={[styles.icon,{ tintColor:!tintColor? 'white':tintColor }]} source={require('../images/back.png')}/>
            { !backTitle ? null: <Text style={[styles.title,{ color:!tintColor? 'white': tintColor }]}>{ backTitle }</Text> }
        </TouchableOpacity>
    )
}
function renderRightViews(props,rightViews) {
    const { rightDisable,navigator } = props;
    const { tintColor } = navigator;
    return rightViews.map((item,index) => {
        const { onClick,text,id } = item;
        return(
            <TouchableOpacity disabled={rightDisable} style={styles.iconBtn} key={item+index} onPress={() => { onClick && onClick(id); }}>
                { typeof text === 'string' ? <Text style={[styles.title,{ color:!tintColor? 'white': tintColor }]}>{ text }</Text> : <Image style={[styles.icon,{ tintColor:!tintColor? 'white':tintColor }]} source={text}/> }
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
        alignItems:'center',
        marginLeft:8
    },
    button:{
        flexDirection:'row',
        alignItems:'center',
        width:TITLE_OFFSET_CENTER_ALIGN,
        height:NAVIGATOR_BAR_HEIGHT
    },
    title:{
        fontSize:15
    },
    centerView:{
        justifyContent:'center',
        alignItems:'center',
        height:NAVIGATOR_BAR_HEIGHT,
        flex:1
    },
    headTitle:{
        marginHorizontal:8,
        fontSize:Platform.OS === 'ios' ? 18 : 20,
        textAlign:'center'
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
        padding:4
    },
    iconBtn:{
        justifyContent:'center',
        alignItems:'center',
        height:32,
        width:32
    }
});