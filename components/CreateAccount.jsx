import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {registerUser, stateNames} from '../services/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { useToastStore } from '../store/toastStore';
import { useTranslation } from 'react-i18next';

const CreateAccount = ({ navigation }) => {
  const { t } = useTranslation();
  const {showToast} = useToastStore();
  const localImage = require('../images/app_logo.png');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [stateItems, setStateItems] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);

  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorPinCode, setErrorPinCode] = useState('');
  const [errorSelectedState, setErrorSelectedState] = useState('');
  const [errorCity, setErrorCity] = useState('');

  const handleStates = async () => {
    if (stateItems.length > 0) return;
    setLoadingStates(true);
    try {
      const state_names = await stateNames();
      const formatted = state_names.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setStateItems(formatted);
    } catch (error) {
      console.log('Error loading states', error.message);
    } finally {
      setLoadingStates(false);
    }
  };

  const handleCreateAccount = async () => {
    let hasError = false;

    if (!firstName) {
      setErrorFirstName(t('first_name_required'));
      hasError = true;
    }
    if (!lastName) {
      setErrorLastName(t('last_name_required'));
      hasError = true;
    }
    if (!email) {
      setErrorEmail(t('email_required'));
      hasError = true;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorEmail(t('invalid_email'));
      hasError = true;
    }
    if (!phoneNumber) {
      setErrorPhoneNumber(t('phone_required'));
      hasError = true;
    }
    if (phoneNumber.length !== 10) {
      setErrorPhoneNumber(t('invalid_phone_10'));
      hasError = true;
    }
    if (!pinCode) {
      setErrorPinCode(t('pin_code_required'));
      hasError = true;
    }
    if (!selectedState) {
      setErrorSelectedState(t('state_required'));
      hasError = true;
    }
    if (!city) {
      setErrorCity(t('city_required'));
      hasError = true;
    }
    if (!password) {
      setErrorPassword(t('password_required'));
      hasError = true;
    }
    if (password.length < 6) {
      setErrorPassword(t('password_min_length'));
      hasError = true;
    }
    if (!confirmPassword) {
      setErrorConfirmPassword(t('confirm_password_required'));
      hasError = true;
    }
    if (password !== confirmPassword) {
      setErrorConfirmPassword(t('password_mismatch'));
      hasError = true;
    }

    if (hasError) return;

    try {
      const data = await registerUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: password,
        pin_code: pinCode,
        state_id: selectedState,
        city: city,
      });
      console.log('Success', data);
      showToast(t('user_registered_success'), 'success');
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Registration error', error.message);
      showToast(error.message, 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Image source={localImage} style={styles.logo} />
          <Text style={styles.title}>{t('create_account')}</Text>
          <Text style={styles.subtitle}>{t('join_app')}</Text>
        </View>

        <View style={styles.body}>

          <View style={styles.nameRow}>

            <View style={styles.nameField}>
              <Text style={styles.label}>{t('first_name')}</Text>
              <View style={styles.inputWrapper}>
                <Icons name="person-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  placeholder={t('first')}
                  placeholderTextColor="#999"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    setErrorFirstName('');
                  }}
                  style={styles.inputWithIcon}
                />
              </View>
              {errorFirstName ? <Text style={styles.errorText}>{errorFirstName}</Text> : null}
            </View>

            <View style={styles.nameField}>
              <Text style={styles.label}>{t('last_name')}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder={t('last')}
                  placeholderTextColor="#999"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    setErrorLastName('');
                  }}
                  style={styles.inputWithIcon}
                />
              </View>
              {errorLastName ? <Text style={styles.errorText}>{errorLastName}</Text> : null}
            </View>

          </View>

          <Text style={styles.label}>{t('email')}</Text>
          <View style={styles.inputWrapper}>
            <Icons name="mail-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder={t('email_placeholder')}
              placeholderTextColor="#999"
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text);
                setErrorEmail('');
              }}
              style={styles.inputWithIcon}
            />
          </View>
          {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}

          <Text style={styles.label}>{t('phone_number')}</Text>
          <View style={styles.inputWrapper}>
            <Icons name="call-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder={t('enter_phone_number')}
              placeholderTextColor="#999"
              value={phoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setErrorPhoneNumber('');
              }}
              style={styles.inputWithIcon}
            />
          </View>
          {errorPhoneNumber ? <Text style={styles.errorText}>{errorPhoneNumber}</Text> : null}

          <Text style={styles.label}>{t('pin_code')}</Text>
          <View style={styles.inputWrapper}>
            <Icons name="pin" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder={t('pin_code_placeholder')}
              placeholderTextColor="#999"
              value={pinCode}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setPinCode(text);
                setErrorPinCode('');
              }}
              style={styles.inputWithIcon}
            />
          </View>
          {errorPinCode ? <Text style={styles.errorText}>{errorPinCode}</Text> : null}

          <Text style={styles.label}>{t('state')}</Text>
          <DropDownPicker
            open={open}
            value={selectedState}
            items={stateItems}
            setOpen={(val) => {
              setOpen(val);
              if (val) handleStates();
            }}
            setValue={(val) => {
              setSelectedState(val);
              setErrorSelectedState('');
            }}
            setItems={setStateItems}
            placeholder={t('select_state')}
            loading={loadingStates}
            activityIndicatorColor="#E8751A"
            searchable={true}
            searchPlaceholder={t('search_state')}
            searchTextInputStyle={{ color: '#fff', borderColor: 'gray', borderRadius: 8, fontSize: 16 }}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.dropdownText}
            placeholderStyle={styles.dropdownPlaceholder}
            flatListProps={{ nestedScrollEnabled: true }}
            listMode="SCROLLVIEW"
          />
          {errorSelectedState ? <Text style={styles.errorText}>{errorSelectedState}</Text> : null}

          <Text style={styles.label}>{t('city')}</Text>
          <View style={styles.inputWrapper}>
            <Icons name="location-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder={t('city_placeholder')}
              placeholderTextColor="#999"
              value={city}
              onChangeText={(text) => {
                setCity(text);
                setErrorCity('');
              }}
              style={styles.inputWithIcon}
            />
          </View>
          {errorCity ? <Text style={styles.errorText}>{errorCity}</Text> : null}

          <Text style={styles.label}>{t('password')}</Text>
          <View style={styles.inputWrapper}>
            <Icons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder={t('password_placeholder')}
              placeholderTextColor="#999"
              value={password}
              secureTextEntry={!showPassword}
              onChangeText={(text) => {
                setPassword(text);
                setErrorPassword('');
              }}
              style={styles.inputWithIcon}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#999" />
            </TouchableOpacity>
          </View>
          {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}

          <Text style={styles.label}>{t('confirm_password')}</Text>
          <View style={styles.inputWrapper}>
            <Icons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
            <TextInput
              placeholder={t('reenter_password')}
              placeholderTextColor="#999"
              value={confirmPassword}
              secureTextEntry={!showConfirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrorConfirmPassword('');
              }}
              style={styles.inputWithIcon}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#999" />
            </TouchableOpacity>
          </View>
          {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}

          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={styles.buttonText}>{t('create_account')}</Text>
          </TouchableOpacity>

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>{t('already_have_account')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInLink}>{t('sign_in')}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  subtitle: {
    color: '#fff',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 20,
  },
  nameField: {
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginTop: 14,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    paddingVertical: 12,
  },
  errorText:{
    fontSize: 15,
    color:'#ff4d4d',
    marginTop:10,
    marginBottom:4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#2D0A0A',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#7B1C1C',
  },
  button: {
    backgroundColor: '#E8751A',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#fff',
  },
  signInLink: {
    fontSize: 16,
    color: '#E8751A',
    fontWeight: 'bold',
  },
  dropdown: { 
    backgroundColor: '#1a1a1a', 
    borderColor: 'gray', 
    borderRadius: 10, 
    marginBottom: 4 
  },
  dropdownContainer: {
    backgroundColor: '#1a1a1a', 
    borderColor: 'gray', 
    borderRadius: 10 
  },
  dropdownText: { 
    color: '#fff', 
    fontSize: 16 
  },
  dropdownPlaceholder: { 
    color: '#999' 
  },
});