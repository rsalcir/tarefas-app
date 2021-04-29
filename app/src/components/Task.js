import React from 'react';
import { 
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import commonStyles from '../commonStyles';

export default (props) => {
    const doneOrNotStyle = props.doneAt ? {textDecorationLine: 'line-through'} : {}; 
    const taskDate =  props.doneAt ? props.doneAt : props.estimateAt;

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name= 'trash' size={30} color='#FFF'></Icon>
            </TouchableOpacity>
        )
    };

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name= 'trash' size={20} color='#FFF' style={styles.excludeIcon}></Icon>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    };

    return (
        <Swipeable renderRightActions={getRightContent}
            renderLeftActions={getLeftContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.description, doneOrNotStyle]}>{props.description}</Text>
                <Text style={styles.date}>{getFormattedDate(taskDate)}</Text>    
            </View>
        </View>
        </Swipeable>
    );
}

function getCheckView(doneAt) {
    if(doneAt) {
        return (
            <View style={styles.done}>
                <Icon name= 'check' size={20} color='#FFF'></Icon>
            </View>
        );
    }
    return (
        <View style={styles.pending}></View>
    );
}

function getFormattedDate(date){
   return moment(date).locale('pt-br').format('ddd, D [de] MMMM'); 
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 16
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 13
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    }
});