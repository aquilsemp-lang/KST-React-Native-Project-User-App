import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { useWatchlistStore } from '../store/watchlistStore';
import Icons from 'react-native-vector-icons/Ionicons';
import IconClock from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeContext';

const WatchlistScreen = ({ navigation }) => {

  const { t } = useTranslation();
  const { colors } = useTheme();
  const { watchlist, removeFromWatchlist } = useWatchlistStore();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (watchlist.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Icons name="bookmark-outline" size={50} color="#E8751A" />

        <Text style={[styles.emptyTextHeading, { color: colors.text }]}>
          {t('watchlist_empty_title')}
        </Text>

        <Text style={[styles.emptyText, { color: colors.subText }]}>
          {t('watchlist_empty_desc')}
        </Text>

        <TouchableOpacity
          style={styles.browseButton}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.browseButtonText}>
            {t('browse_content')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}

        renderItem={({ item }) => (

          <View style={[styles.movieCard, { backgroundColor: colors.card }]}>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MovieDetail', { movieId: item.id })
              }
            >
              <Image
                source={{ uri: item.poster_image }}
                style={styles.thumbnail}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={styles.movieInfo}>

              <Text style={[styles.movieTitle, { color: colors.text }]}>
                {item.name}
              </Text>

              <Text style={styles.movieLang}>{item.language}</Text>
              <View style={{flexDirection: 'row', gap: 6}}>
                <View style={{ flexDirection: 'row' }}>
                  <IconClock
                    name="clock"
                    size={12}
                    color={colors.subText}
                    style={{ marginRight: 3, marginTop: 3 }}
                  />
                  <Text style={[styles.movieMeta, { color: colors.subText }]}>{item.duration}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Icons
                    name="star"
                    size={13}
                    color={colors.subText}
                    style={{ marginRight: 3, marginTop: 2 }}
                  />
                  <Text style={[styles.movieMeta, { color: colors.subText }]}>
                    {item.content_rating}+
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setSelectedMovie(item)}
            >
              <Icons
                name="trash-outline"
                size={24}
                color="#E8751A"
                style={styles.removeIcon}
              />
            </TouchableOpacity>

          </View>
        )}
      />

      <Modal
        visible={!!selectedMovie}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedMovie(null)}
      >

        <View style={styles.overlay}>

          <View style={[styles.modalBox, { backgroundColor: colors.card, borderColor: colors.border }]}>

            <Icons
              name="trash-outline"
              size={40}
              color="#E8751A"
              style={{ marginBottom: 12 }}
            />

            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {t('remove_watchlist')}
            </Text>

            <Text style={[styles.modalMessage, { color: colors.subText }]}>
              {t('remove_watchlist_message')} "{selectedMovie?.name}"
            </Text>

            <View style={styles.buttonRow}>

              <TouchableOpacity
                onPress={() => setSelectedMovie(null)}
                style={[styles.cancelButton, { borderColor: colors.border }]}
              >
                <Text style={[styles.cancelText, { color: colors.text }]}>
                  {t('cancel')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  removeFromWatchlist(selectedMovie.id);
                  setSelectedMovie(null);
                }}
                style={styles.removeBtn}
              >
                <Text style={styles.removeText}>
                  {t('remove')}
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  emptyTextHeading:{ fontSize: 24, color:'white', marginTop: 10, fontWeight:'bold' },
  emptyText: { color: '#999', fontSize: 14, margin: 12, textAlign: 'center' },
  browseButton:{ borderRadius:14, backgroundColor:'#E8751A', height:50, alignItems:'center', width: 200 },
  browseButtonText:{ fontSize: 16, color:'white', margin: 8, fontWeight: 'bold', marginTop: 12, marginBottom: 12 },
  movieCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 18, backgroundColor: '#1a1a1a', borderRadius: 10, overflow: 'hidden', height: 120, width: '100%' },
  thumbnail: { width: 120, height: 160, borderRadius: 10 },
  movieInfo: { flex: 1, padding: 10 },
  movieTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  movieMeta: { color: '#999', fontSize: 13 },
  movieLang: { color:'#E8751A', fontSize: 13, marginBottom: 2 },
  removeIcon:{ marginRight:6 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign:'center',
  },
  modalMessage: {
    fontSize: 16,
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
  removeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#E8751A',
    alignItems: 'center',
    height: 50,
  },
  removeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});