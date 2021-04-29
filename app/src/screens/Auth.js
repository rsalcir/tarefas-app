import React, { Component } from 'react';
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import { server, showError, showSucess } from '../common';

const initialState = { 
    name:'',
    email:'',
    password:'',
    confirmPassword: '',
    stageNew: false
};

export default class Auth extends Component {

    state = {
       ...initialState
    }

    signinOrSignup = () => {
        if(this.state.stageNew) {
            this.singup();
        } else {
            this.signin();
        }
    }

    singup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            });
            showSucess('Usuário cadastrado!');
            this.setState({ ...initialState });
        } catch (error) {
            showError(error);
        }
    }

    signin = async () => {
        try {
            const response = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            });
            AsyncStorage.setItem('userData', JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`
            this.props.navigation.navigate('Home', response.data);
        } catch (error) {
            showError(error);
        }
    }

    render() {
        const validations = [];
        validations.push(this.state.email && this.state.email.includes('@'));
        validations.push(this.state.password && this.state.password.length >= 6);
       
        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3);
            validations.push(this.state.confirmPassword === this.state.password);
        }

        const validForm = validations.reduce((total, atual) => total && atual);

        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Tarefas</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                    </Text>
                    { this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' value={this.state.name}
                            style={styles.input} onChangeText={name => this.setState({name})}/>
                    }
                    <AuthInput icon='at' placeholder='E-mail' value={this.state.email}
                        style={styles.input} onChangeText={email => this.setState({email})}/>
                    <AuthInput icon='lock' placeholder='Senha' 
                        value={this.state.password} secureTextEntry={ true }
                        style={styles.input} onChangeText={password => this.setState({password})}/>
                     { this.state.stageNew &&
                        <AuthInput icon='lock' placeholder='Confirmação de Senha' 
                            value={this.state.confirmPassword} secureTextEntry={ true }
                            style={styles.input} onChangeText={confirmPassword => this.setState({confirmPassword})}/>
                    }
                    <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Cadastrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonStage} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secundary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%',
        borderRadius: 7
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7  
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    buttonStage: {
        padding: 10
    }
});
