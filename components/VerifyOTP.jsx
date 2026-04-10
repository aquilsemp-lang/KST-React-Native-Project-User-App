import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { verifyOTP, sendOTP, userLogin, dashboardData } from '../services/auth';
import { useAuthStore } from '../store/authStore';
import { useDashboardStore } from '../store/dashboardStore';
import { useToastStore } from '../store/toastStore';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeContext';

const VerifyOTP = ({ navigation, route }) => {

  const { t } = useTranslation();
  const { colors } = useTheme();
  const { showToast } = useToastStore();

  const { phoneNumber } = route.params;
  const localImage = require('../images/app_logo.png');

  const [otp, setOtp] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [error, setError] = useState('');

  const { setUser } = useAuthStore.getState();
  const setDashboardData = useDashboardStore((state) => state.setDashboardData);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCanResend(true);
    }, 30000);

    return () => clearTimeout(timeout);
  }, []);

  const handleOTP = async () => {
    if (!otp) {
      setError(t('enter_otp'));
      return;
    }
    if (otp.length !== 4) {
      setError(t('valid_otp'));
      return;
    }
    try {
      const otp_data = await verifyOTP({ mobile: phoneNumber, otp: otp });
      if (!otp_data.ok) {
        showToast(t('otp_mismatch'), 'error');
        return;
      }
      const user_data = await userLogin({ mobile: phoneNumber });
      if (user_data.status) {
        setUser(user_data.data, user_data.data.api_token);
      } else {
        showToast(user_data.message, 'error');
      }
      const dashboard_data = await dashboardData(user_data.data.api_token);
      if (dashboard_data.status) {
        setDashboardData(dashboard_data.data);
      }
    } catch (error) {
      showToast(t('otp_mismatch'), 'error');
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    setOtp('');
    try {
      await sendOTP(phoneNumber);
      setResendMessage(t('otp_sent'));
      showToast(t('otp_sent'), 'success');
      setCanResend(false);
      setTimeout(() => {
        setCanResend(true);
        setResendMessage('');
      }, 30000);
    } catch (error) {
      setResendMessage(error.message);
      showToast(error.message, 'error');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Image
          source={localImage}
          style={styles.logo}
        />

        <Text style={[styles.title, { color: colors.text }]}>{t('verify_otp')}</Text>

        <Text style={[styles.subtitle, { color: colors.text }]}>
          {t('enter_code')} {phoneNumber}
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={[styles.body, { backgroundColor: colors.background }]}>

        <Text style={[styles.label, { color: colors.text }]}>{t('verification_code')}</Text>

        <TextInput
          placeholder="0 0 0 0"
          placeholderTextColor={colors.subText}
          value={otp}
          keyboardType="phone-pad"
          maxLength={4}
          textAlign="center"
          onChangeText={(text) => {
            setOtp(text);
            setError('');
          }}
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
        />

        <TouchableOpacity
          onPress={handleOTP}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {t('verify_login')}
          </Text>
        </TouchableOpacity>

        <View style={styles.changeNumberRow}>

          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.changeNumberLink, { color: colors.text }]}>
              {t('change_number')} |
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={!canResend}
          >
            <Text
              style={[
                styles.resendText,
                !canResend && styles.resendDisabled
              ]}
            >
              {canResend ? t('resend_otp') : t('resend_otp_in')}
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.signUpRow}>

          <Text style={[styles.signUpText, { color: colors.text }]}>
            {t('no_account')}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={styles.signUpLink}>
              {t('sign_up')}
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
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
    fontSize: 18
  },
  body: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 2,
    marginLeft: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    fontSize: 28,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    marginTop:10,
    marginBottom:4,
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
    marginTop: 70,
    gap: 8,
  },
  changeNumberRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 4,
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
  changeNumberLink: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  resendText: {
    color: '#E8751A',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  resendDisabled: {
    color: '#999',
  },
});