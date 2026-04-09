import { Animated, View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToastStore } from '../store/toastStore';

const Toast = () => {
  const { toast } = useToastStore();
  const toastAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    if (toast.visible) {
      Animated.spring(toastAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction:8, 
      }).start();
    } else {
      Animated.timing(toastAnim, {
        toValue: -500,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        toast.type === 'success' ? styles.toastSuccess : styles.toastError,
        { transform: [{ translateX: toastAnim }] },
      ]}
    >
      <Ionicons
        name={toast.type === 'success' ? 'checkmark-circle' : 'close-circle'}
        size={22}
        color="#fff"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.toastText}>{toast.message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: Platform.OS==='android'
       ? StatusBar.currentHeight + 10 : 50,
    left: 16,
    right: 16,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 8,
    marginTop: 6,
  },
  toastSuccess: {
    backgroundColor: 'rgba(232, 117, 26, 0.35)',
    borderLeftWidth: 4,
    borderLeftColor: '#E8751A',
  },
  toastError: {
    backgroundColor: '#3a1e1e',
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});