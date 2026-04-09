import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Switch } from 'react-native';
import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useTheme } from '../store/themeContext';
import { useTranslation } from 'react-i18next';

const UserLoginScreen = ({ navigation }) => {

  const { t } = useTranslation();

  const localImage = require('../images/default_image.png');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();

  const token = useAuthStore((state) => state.token);
  console.log('User token:', token);

  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.profileHeader}>
          <View>
            <Icons
              name="person"
              size={60}
              color="#E8751A"
              style={{
                borderRadius: 40,
                borderWidth: 2,
                borderColor: '#E8751A',
                padding: 6,
                marginTop: 10
              }}
            />
          </View>

          <View>
            <Text style={styles.name}>
              {user?.first_name} {user?.last_name}
            </Text>

            <View style={styles.mobileRow}>
              <Icons name="mail-outline" size={22} color="#999" style={styles.icon} />
              <Text style={styles.mobileNumber}>{user?.email}</Text>
            </View>

            <View style={styles.mobileRow}>
              <Icons name="call-outline" size={22} color="#999" style={styles.icon} />
              <Text style={styles.mobileNumber}>{user?.mobile}</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}

        <Text style={styles.label}>{t('account')}</Text>

        <View style={styles.listView}>

          <TouchableOpacity
            style={styles.subListView}
            onPress={() => navigation.navigate('WatchlistScreen')}
          >
            <Icons name="bookmark-outline" size={28} color="white" style={styles.icon} />
            <Text style={styles.listText}>{t('my_watchlist')}</Text>
            <Icons name="chevron-forward" size={24} color="white" style={styles.chevron} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subListView}
            onPress={() => navigation.navigate('RentHistory')}
          >
            <Icons name="timer-outline" size={28} color="white" style={styles.icon} />
            <Text style={styles.listText}>{t('rent_history')}</Text>
            <Icons name="chevron-forward" size={24} color="white" style={styles.chevron} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subListView}
            onPress={() => navigation.navigate('RecordingScreen')}
          >
            <Icons name="videocam-outline" size={28} color="white" style={styles.icon} />
            <Text style={styles.listText}>{t('my_recordings')}</Text>
            <Icons name="chevron-forward" size={24} color="white" style={styles.chevron} />
          </TouchableOpacity>

        </View>

        {/* Preferences Section */}

        <Text style={styles.label}>{t('preferences')}</Text>

        <View style={styles.listView}>

          <TouchableOpacity
            style={styles.subListView}
            onPress={() => navigation.navigate('ContentLanguage')}
          >
            <Icon name="globe" size={26} color="white" style={styles.icon} />
            <Text style={styles.listText}>{t('content_languages')}</Text>
            <Icons name="chevron-forward" size={24} color="white" style={styles.chevron} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.subListView}
            onPress={() => navigation.navigate('AppLanguage')}
          >
            <Icons name="language-outline" size={28} color="white" style={styles.icon} />
            <Text style={styles.listText}>{t('app_language')}</Text>
            <Icons name="chevron-forward" size={24} color="white" style={styles.chevron} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.subListView}>
            <Icons name="moon-outline" size={24} color="white" style={styles.icon} />
            <Text style={styles.listText}>{t('dark_mode')}</Text>

            <Switch
              trackColor={{ false: '#ccc', true: '#E8751A' }}
              thumbColor="#fff"
              value={isDarkMode}
              onValueChange={toggleTheme}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>

        </View>

        {/* Logout */}

        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutButton}
        >
          <Icons name="log-out-outline" size={30} color="#E8751A" style={styles.icon} />
          <Text style={styles.ButtonText}>{t('logout')}</Text>
        </TouchableOpacity>

        {/* Logout Modal */}

        <Modal
          visible={showLogoutModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View style={styles.overlay}>

            <View style={styles.modalBox}>

              <Icons name="log-out-outline" size={50} color="#E8751A" style={{ marginBottom: 12 }} />

              <Text style={styles.modalTitle}>{t('logout')}</Text>

              <Text style={styles.modalMessage}>
                {t('logout_confirmation')}
              </Text>

              <View style={styles.buttonRow}>

                <TouchableOpacity
                  onPress={() => setShowLogoutModal(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelText}>{t('cancel')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={logout}
                  style={styles.logoutBtn}
                >
                  <Text style={styles.logoutText}>{t('logout')}</Text>
                </TouchableOpacity>

              </View>

            </View>

          </View>
        </Modal>

      </View>
    </ScrollView>
  );
};

export default UserLoginScreen;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#1a1a1a',
  },

  profileHeader:{
    flexDirection: 'row',
    padding: 20,
    paddingTop: 50,
    gap: 8,
  },
  profileImage:{
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop:8,
  },
  name:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  mobileRow:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 4,
    marginTop: 4,
  },
  mobileNumber:{
    fontSize: 14,
    color: '#999',
  },
  label:{
    fontSize: 14,
    marginTop: 18,
    marginLeft: 22,
    color: '#999',
    marginBottom: 8,
  },
  listView:{
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 14,
    backgroundColor:'#1a1a1a',
  },
  subListView:{
    flexDirection:'row',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
    height: 70,
    backgroundColor:'#1a1a1a',
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  listText:{
    flex:1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    marginLeft: 8
  },
  chevron:{
    marginLeft: 'auto',
  },
  icon:{
    marginRight: 4,
    marginLeft: 6,
  },
  logoutButton:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 40,
    marginBottom: 30,
  },
  ButtonText:{
    color:'#E8751A',
    marginLeft: 5,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    height: 50,
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#E8751A',
    alignItems: 'center',
    height: 50,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
