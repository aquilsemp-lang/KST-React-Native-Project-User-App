import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {sendOTP} from '../services/auth';
import { useToastStore } from '../store/toastStore';
import { useTranslation } from 'react-i18next';

const SignIn = ({ navigation }) => {
  const { t } = useTranslation();
  const {showToast} = useToastStore();
  const localImage = require('../images/app_logo.png');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors]= useState('');

  const handleSignIn= async ()=>{
    if(!phoneNumber){
      setErrors(t('phone_required'));
      return;
    }
    if(phoneNumber.length !== 10){
      setErrors(t('invalid_phone'));
      return;
    }
    setErrors('');
    try{
      const otpData= await sendOTP(phoneNumber);
      console.log('Success', otpData);
      showToast(t('otp_sent_success'), 'success');
      navigation.navigate('VerifyOTP', {phoneNumber: phoneNumber});      
    }
    catch(error){
      console.log('Error',error.message);
      showToast(error.message, 'error');
    }
  };

  return (
      <View style={styles.container}>

        <View style={styles.header}>

          <Image
            source={localImage}
            style={styles.logo}
          />

          <Text style={styles.title}>
            {t('welcome_back')}
          </Text>

          <Text style={styles.subtitle}>
            {t('signin_subtitle')}
          </Text>

        </View>

      {errors ? <Text style={styles.errorText}>{errors}</Text> : null}

        <View style={styles.body}>

          <Text style={styles.label}>
            {t('phone_number')}
          </Text>

          <TextInput
            placeholder={t('enter_phone_number')}
            placeholderTextColor="#999"
            value={phoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={(text) => {
                    setPhoneNumber(text);
                    setErrors('');
          }}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSignIn}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {t('continue')}
            </Text>
          </TouchableOpacity>

          <View style={styles.signUpRow}>

            <Text style={styles.signUpText}>
              {t('dont_have_account')}
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <Text style={styles.signUpLink}>
                {t('sign_up')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingBottom: 25,
    backgroundColor: '#000',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
  },
  body: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 20,
    backgroundColor: 'black',
    color: 'white',
  },
  button: {
    backgroundColor: '#E8751A',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  errorText:{
    fontSize: 15,
    color:'#ff4d4d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2D0A0A',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#7B1C1C',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    gap: 8,
  },
  signUpText: {
    fontSize: 16,
    color: '#fff',
  },
  signUpLink: {
    fontSize: 16,
    color: '#E8751A',
    fontWeight: 'bold',
  },
});