import React from 'react';
import { 
    Platform,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Gravatar } from 'react-native-gravatar';
import commonStyles from '../commonStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default (props) => {
    
    const optionsGravatar = {
        email: props.navigation.getParam('email'),
        secure: true
    };

    const logOut = () => {
        delete axios.defaults.headers.common['Authorization'];
        AsyncStorage.removeItem('userData');
        props.navigation.navigate('AuthOrApp');
    };

    return (
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.headerDesc}>
                    <Text style={styles.title}>Tarefas</Text>
                    <Gravatar style={styles.avatar} 
                        options={optionsGravatar}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>
                            {props.navigation.getParam('name')}
                        </Text>
                        <Text style={styles.email}>
                            {props.navigation.getParam('email')}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={logOut}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800'/>
                    </View>            
                </TouchableOpacity>
            </View>
            <DrawerItems { ...props }/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    headerDesc: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        fontSize: 30,
        marginTop: Platform.OS === 'ios' ? 70 : 30,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        backgroundColor: '#222',
        margin: 10
    },
    userInfo:{
        marginLeft: 10
    },
    name: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.mainText,
        marginBottom: 5
    }, 
    email: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        color: commonStyles.colors.subText,
        marginBottom: 5
    },
    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    }
});