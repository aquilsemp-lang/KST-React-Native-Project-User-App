import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icons from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { get_content_language, save_user_language } from '../services/auth';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import { useTranslation } from 'react-i18next';

const ContentLanguage = () => {

  const { t } = useTranslation();

  const { showToast } = useToastStore();
  const user = useAuthStore((state) => state.user);
  const userLanguages = useAuthStore((state) => state.userLanguages);
  const setUserLanguages = useAuthStore((state) => state.setUserLanguages);

  const [saving, setSaving] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(userLanguages || []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const lang_data = await get_content_language();
        setLanguages(Array.isArray(lang_data) ? lang_data : lang_data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (userLanguages && userLanguages.length > 0) {
      setSelected(userLanguages);
    }
  }, [userLanguages]);

  const toggleLanguage = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSaveLang = async () => {
    try {
      setSaving(true);

      const save_lang_data = await save_user_language(user.id, selected);

      setUserLanguages(selected);

      showToast(t('content_languages') + ' saved successfully!', 'success');

    } catch (error) {
      console.log('Save error', error.message);
      showToast(t('content_languages') + ' save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E8751A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.Title}>
        {t('content_languages')}
      </Text>

      <Text style={styles.subtitle}>{t('content_language_desc')}</Text>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.id);

          return (
            <TouchableOpacity
              style={[styles.langRow, isSelected && styles.langRowSelected]}
              onPress={() => toggleLanguage(item.id)}
            >
              <View style={styles.iconBox}>
                <Icons name="globe" size={22} color="#fff" />
              </View>

              <Text style={styles.langName}>{item.name}</Text>

              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                {isSelected && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={[styles.saveButton, selected.length === 0 && styles.saveButtonDisabled]}
        onPress={handleSaveLang}
        disabled={selected.length === 0}
      >
        <Text style={styles.saveButtonText}>
          {saving
            ? 'Saving...'
            : selected.length > 0
            ? `Save (${selected.length} selected)`
            : 'Save (0 selected)'}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default ContentLanguage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  Title:{
    fontSize: 24,
    color:'white',
    textAlign:'left',
    fontWeight:'bold',
    marginBottom: 10,

  },
  subtitle: {
    color: '#999',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  langRowSelected: {
    borderColor: '#E8751A',
    backgroundColor: 'rgba(232, 117, 26, 0.1)',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  langName: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#E8751A',
    borderColor: '#E8751A',
  },

  saveButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#E8751A',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#7a3d0d',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});