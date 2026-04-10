import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeContext';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

const parseTime = (timeString) => {
  if (!timeString) return 0;
  const [h, m, s] = timeString.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};

const formatSeconds = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
};

const RentDetails = ({ navigation, route }) => {

  const { t } = useTranslation();
  const { colors } = useTheme();
  const { movieName, rentData } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={rentData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 14, paddingTop: 20 }}
        renderItem={({ item }) => {

          const watchedSec = parseTime(item.watched_time);
          const totalSec = parseTime(item.total_watched_time);
          const progress = totalSec > 0 ? Math.round((watchedSec / totalSec) * 100) : 0;

          return (
            <View style={[styles.movieCard, { backgroundColor: colors.card }]}>

              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Icons name="close-outline" size={25} color={colors.subText} style={{position:'absolute', right:0}} />
              </TouchableOpacity>

              <View style={styles.topRow}>
                <Image source={{ uri: item.poster_image }} style={styles.thumbnail} resizeMode="cover" />

                <View style={styles.movieInfo}>
                  <Text style={[styles.movieTitle, { color: colors.text }]}>{item.movie_name}</Text>

                  <View style={styles.metaRow}>
                    <View style={styles.movieBadge}>
                      <Text style={styles.movieBadgeText}>{t('movie')}</Text>
                    </View>

                    <Icons name="star" size={13} color="#E8751A" style={{ marginLeft: 8, marginTop: 1 }} />
                    <Text style={[styles.movieMeta, { color: colors.subText }]}> {item.imdb_rating ?? 'N/A'}</Text>
                  </View>

                  <View style={styles.metaRow}>
                    <Icons name="play-outline" size={13} color={colors.subText} style={{ marginTop: 1 }} />
                    <Text style={[styles.movieMeta, { color: colors.subText }]}> {item.duration ?? 'N/A'}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.rentalBox}>
                <View>
                  <Text style={[styles.rentalLabel, { color: colors.subText }]}>{t('rental_price')}</Text>
                  <Text style={[styles.rentalValue, { color: colors.text }]}>₹{item.price}</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.rentalLabel, { color: colors.subText }]}>{t('access_duration')}</Text>
                  <Text style={[styles.rentalValue, { color: colors.text }]}>
                    {item.access_duration_mins >= 60
                      ? `${Math.floor(item.access_duration_mins / 60)} ${t('hours')}`
                      : `${item.access_duration_mins} ${t('minutes')}`}
                  </Text>
                </View>
              </View>

              <View style={[styles.progressBox, { backgroundColor: colors.card }]}>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {t('watch_progress')}
                </Text>

                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>

                <View style={styles.progressStats}>
                  <View>
                    <Text style={[styles.rentalLabel, { color: colors.subText }]}>{t('watched')}</Text>
                    <Text style={[styles.rentalValue, { color: colors.text }]}>{formatSeconds(watchedSec)}</Text>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.rentalLabel, { color: colors.subText }]}>{t('progress')}</Text>
                    <Text style={[styles.rentalValue, { color: '#E8751A' }]}>
                      {progress}%
                    </Text>
                  </View>

                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.rentalLabel, { color: colors.subText }]}>{t('total')}</Text>
                    <Text style={[styles.rentalValue, { color: colors.text }]}>{formatSeconds(totalSec)}</Text>
                  </View>
                </View>

              </View>

              <View style={[styles.purchasedRow, { backgroundColor: colors.card }]}>
                <Icons name="calendar-outline" size={20} color={colors.subText} style={{ marginRight: 10 }} />

                <View>
                  <Text style={[styles.rentalLabel, { color: colors.subText }]}>{t('purchased')}</Text>
                  <Text style={[styles.purchasedDate, { color: colors.text }]}>{formatDate(item.purchased_at)}</Text>
                </View>
              </View>

              <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('genres')}</Text>

              <View style={styles.genreRow}>
                {item.genres?.map((g) => (
                  <View key={g.id} style={[styles.genreTag, { borderColor: colors.border }]}>
                    <Text style={[styles.genreText, { color: colors.text }]}>{g.name}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.languageRow}>
                <Icons name="earth-outline" size={16} color={colors.icon} style={{ marginRight: 6 }} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('languages')}</Text>
              </View>

              {item.languages?.map((l) => (
                <Text key={l.id} style={[styles.languageText, { color: colors.subText }]}>{l.name}</Text>
              ))}

              {item.short_desc ? (
                <>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('description')}</Text>
                  <Text style={[styles.descText, { color: colors.subText }]}>
                    {item.short_desc.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')}
                  </Text>
                </>
              ) : null}

            </View>
          );
        }}
      />
    </View>
  );
};

export default RentDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  movieCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 50,
    marginTop: 15
  },
  topRow: { flexDirection: 'row', marginBottom: 16 },
  thumbnail: { width: 110, height: 130, borderRadius: 10 },
  movieInfo: { flex: 1, paddingLeft: 12, justifyContent: 'center' },
  movieTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  movieMeta: { color: '#999', fontSize: 13 },
  movieBadge: {
    backgroundColor: 'rgba(232, 117, 26, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  movieBadgeText: { color: '#E8751A', fontSize: 11, fontWeight: 'bold' },
  rentalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(232, 117, 26, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(232, 117, 26, 0.3)',
    padding: 14,
    marginBottom: 12,
    height: 80,
  },
  rentalLabel: { color: '#999', fontSize: 12, marginBottom: 4 },
  rentalValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  progressBox: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  progressBarBg: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#E8751A',
    borderRadius: 3,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  purchasedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  purchasedDate: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  genreRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  genreTag: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  genreText: { color: '#fff', fontSize: 13 },
  languageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  languageText: { color: '#999', fontSize: 14, marginBottom: 12, marginLeft: 4 },
  descText: { color: '#999', fontSize: 14, lineHeight: 22 },
});