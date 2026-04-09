import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import IconClock from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import { useDashboardStore } from '../store/dashboardStore';
import { useAuthStore } from '../store/authStore';
import MovieThumbnail from '../globalComponents/MovieThumbnail';
import { useTranslation } from 'react-i18next';

const Upcoming = ({navigation}) => {

  const { t } = useTranslation();

  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const token = useAuthStore((state) => state.token);
  const upcomingIds = dashboardData?.upcoming_movies || [];
  const loading = useDashboardStore((state) => state.loading);

  const upcomingMovies = upcomingIds
    .map((id) =>
      dashboardData?.movie_data?.find((movie) => Number(movie.id) === Number(id))
    )
    .filter(Boolean);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E8751A" />
      </View>
    );
  }

  if (!dashboardData || upcomingMovies.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          {t('no_upcoming_movies')}
        </Text>
      </View>
    );
  }

  const stripHtml = (html) => {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();
  };

  const renderMovie = ({ item, index }) => (
    <View style={styles.movieCard}>
      <View>

        <MovieThumbnail
          imageUrl={item.thumbnail_image}
          width={'100%'}
          height={250}
          borderRadius={8}
          onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
        />

        {index===0 &&(
          <Image
            source={require('../images/app_logo.png')}
            style={styles.overlayLogo}
            resizeMode="contain"
          />
        )}

      </View>

      <View style={styles.movieInfo}>

        <Text style={styles.movieTitle} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{item.language}</Text>

          <Text style={styles.metaDot}>•</Text>

          <IconClock name="clock" size={13} color="#999" style={{ marginRight: 4 , marginTop:2 }} />
          <Text style={styles.metaText}>{item.duration}</Text>

          <Text style={styles.metaDot}>•</Text>

          <Icons name="star" size={13} color="#999" style={{ marginRight: 4 }} />
          <Text style={styles.metaText}>{item.content_rating}+</Text>
        </View>

        <Text style={styles.releaseDate}>
          🗓 {new Date(item.release_date).toDateString()}
        </Text>

        {item.description ? (
          <Text style={styles.movieDesc}>
            {stripHtml(item.description)}
          </Text>
        ) : null}

        {item.trailer_url ? (
          <TouchableOpacity
            style={styles.trailerButton}
            onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
          >
            <Text style={styles.trailerButtonText}>
              ▶ {t('watch_trailer')}
            </Text>
          </TouchableOpacity>
        ) : null}

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={upcomingMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  list: { paddingBottom: 40 },
  emptyText: { color: '#999', fontSize: 16 },

  movieCard: {
    marginHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 45,
  },
  thumbnailContainer: {
  width: '100%',
  height: 200,
  position: 'absolute', 
},

  thumbnail: {
    width: '100%',
    height: 250,
  },

  movieInfo: {
    padding: 14,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#999',
  },
  metaDot: {
    color: '#999',
    marginHorizontal: 6,
  },

  releaseDate: {
    fontSize: 13,
    color: '#E8751A',
    marginBottom: 8,
  },

  accessBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  trailerButton: {
    backgroundColor: '#E8751A',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 4,
  },
  trailerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  movieDesc: {
  fontSize: 14,
  color: '#fff',
  lineHeight: 25,
  marginBottom: 8,
},
overlayLogo:{
  position: 'absolute',
  top:10,
  left:5,
  width: 140,
  height:50,
  opacity: 0.9,
},
});