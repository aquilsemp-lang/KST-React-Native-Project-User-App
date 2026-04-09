import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView , Image} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Profile = ({navigation}) => {

  const { t } = useTranslation();
  const localImage = require('../images/app_logo.png');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>

        <Image
          source={localImage}
          style={{ width: 120, height: 120, resizeMode: 'contain', alignSelf: 'center', marginTop: 50 }}
        />

        <Text style={styles.welcomeText}>
          {t('welcome_to')} <Text style={styles.welcomeOrange}>KissaShuru</Text>
        </Text>

        <Text style={styles.subText}>
          {t('profile_description')}
        </Text>

        <TouchableOpacity
          style={styles.signInButton}
          activeOpacity={0.85}
          onPress={()=>navigation.navigate('SignIn')}
        >
          <Text style={styles.signInText}>
            {t('sign_in')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.85}
          onPress={()=>navigation.navigate('CreateAccount')}
        >
          <Text style={styles.createText}>
            {t('create_account')}
          </Text>
        </TouchableOpacity>

        <View style={styles.featureList}>

          <View style={styles.featureRow}>
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIconText}>🔖</Text>
            </View>
            <Text style={styles.featureText}>
              {t('save_watchlist')}
            </Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIconText}>📱</Text>
            </View>
            <Text style={styles.featureText}>
              {t('control_tv')}
            </Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIconText}>🕐</Text>
            </View>
            <Text style={styles.featureText}>
              {t('continue_watching')}
            </Text>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
};


const ORANGE = '#E8751A';
const DARK_BG = '#0D0D0D';
const CARD_BG = '#1A1A1A';
const WHITE = '#FFFFFF';
const GRAY = '#888888';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
  container: {
    flex: 1,
    backgroundColor: DARK_BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 32,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 36,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTextTop: {
    color: ORANGE,
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 1,
  },
  logoTagline: {
    color: ORANGE,
    fontStyle: 'italic',
    fontSize: 13,
    marginTop: 2,
  },

  // Welcome
  welcomeText: {
    color: WHITE,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeOrange: {
    color: ORANGE,
  },
  subText: {
    color: GRAY,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },

  // Buttons
  signInButton: {
    width: '100%',
    backgroundColor: ORANGE,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  signInText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  createButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#333333',
    marginBottom: 50,
  },
  createText: {
    color: WHITE,
    fontWeight: '600',
    fontSize: 16,
  },

  // Features
  featureList: {
    width: '100%',
    gap: 22,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, 
    marginLeft: 28,
    marginTop: 18
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1E1207',
    borderWidth: 1,
    borderColor: '#3D1F00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconText: {
    fontSize: 18,
  },
  featureText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
});

export default Profile;
