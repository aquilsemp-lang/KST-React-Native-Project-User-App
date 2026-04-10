import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n, { saveLanguage } from '../src/i18n';
import Icons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../store/themeContext';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English'  },
  { code: 'hi', label: 'Hindi',   native: 'हिंदी'     },
  { code: 'mr', label: 'Marathi', native: 'मराठी'     },
  { code: 'ta', label: 'Tamil',   native: 'தமிழ்'     },
  { code: 'bn', label: 'Bengali', native: 'বাংলা'     },
  { code: 'gu', label: 'Gujarati',native: 'ગુજરાતી'   },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ'     },
  { code: 'te', label: 'Telugu',  native: 'తెలుగు'    },
];

export default function AppLanguage() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [selected, setSelected] = useState(i18n.language);
  const [saved, setSaved] = useState(i18n.language);

  const handleSave = async () => {
    await i18n.changeLanguage(selected);
    await saveLanguage(selected);
    setSaved(selected);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('select_language')}</Text>
      <Text style={[styles.subTitle, { color: colors.subText }]}>{t('language_description')}</Text>

      <FlatList
        data={LANGUAGES}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, { backgroundColor: colors.card }, selected === item.code && styles.selected]}
            onPress={() => setSelected(item.code)}
          >
            <View style={[styles.iconBox, { backgroundColor: colors.border }]}>
              <Icons name="language-outline" size={24} color={colors.icon} />
            </View>
            <Text style={[styles.native, { color: colors.text }]}>{item.native}</Text>
            <View style={[styles.checkBox, selected === item.code && styles.checkBoxSelected]}>
              {selected === item.code && (
                <Icons name="checkmark" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.saveButton, selected === saved && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={selected === saved}
      >
        <Text style={styles.saveBtnTxt}>{t('save') ?? 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:          { flex: 1, padding: 10, backgroundColor: '#000' },
  title:              { fontSize: 24, fontWeight: 'bold', marginBottom: 12, color: '#fff' },
  subTitle:           { fontSize: 14, color: '#999', marginBottom: 12 },
  item:               { flexDirection: 'row', alignItems: 'center', padding: 15,
                        borderRadius: 14, marginBottom: 10, backgroundColor: '#1a1a1a' },
  selected:           { backgroundColor: 'rgba(232, 117, 26, 0.1)', borderColor: '#E8751A', borderWidth: 1.5 },
  native:             { fontSize: 18, flex: 1, color: '#fff' },
  iconBox:            { width: 40, height: 40, borderRadius: 10, backgroundColor: '#2a2a2a',
                        justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  checkBox:           { width: 26, height: 26, borderRadius: 13, borderWidth: 2,
                        borderColor: '#555', justifyContent: 'center', alignItems: 'center' },
  checkBoxSelected:   { backgroundColor: '#E8751A', borderColor: '#E8751A' },
  saveButton:         { borderRadius: 12, backgroundColor: '#E8751A', height: 50,
                        alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  saveButtonDisabled: { backgroundColor: '#7a3a0d', opacity: 0.6 },
  saveBtnTxt:         { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#fff' },
});