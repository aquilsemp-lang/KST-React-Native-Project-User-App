import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import {get_search, get_search_list} from '../services/auth';
import Icons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeContext';

const Home = ({navigation}) => {

  const { t } = useTranslation();
  const { colors } = useTheme();

  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const loading = useDashboardStore((state) => state.loading);
  const isHydrated= useDashboardStore((state) => state.isHydrated);

  const trendingIds = dashboardData?.tranding_movies || [];
  const trendingMovies = trendingIds
    .map((id) =>
      dashboardData?.movie_data?.find((movie) => Number(movie.id) === Number(id))
    )
    .filter(Boolean);

  const payperviewIds = dashboardData?.pay_per_view || [];
  const payperviewMovies = payperviewIds
    .map((id) =>
      dashboardData?.movie_data?.find((movie) => Number(movie.id) === Number(id))
    )
    .filter(Boolean);

  const viewedMoviesIds = dashboardData?.viewed_movies || [];
  const viewedMovies = viewedMoviesIds
    .map((id) =>
      dashboardData?.movie_data?.find((movie) => Number(movie.id) === Number(id))
    )
    .filter(Boolean);

  if (!isHydrated) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#E8751A" />
      </View>
    );
  }

  if (!dashboardData) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.subText }]}>{t('no_movies_available')}</Text>
      </View>
    );
  }

  if (trendingMovies.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.subText }]}>{t('no_trending_movies')}</Text>
      </View>
    );
  }

  if (payperviewMovies.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.subText }]}>{t('no_pay_per_view_movies')}</Text>
      </View>
    );
  }

  if (viewedMovies.length === 0) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.subText }]}>{t('no_viewed_movies')}</Text>
      </View>
    );
  }

  const renderMovie = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HomeMovies', { movieId: item.id })}
    >
      <Image
        source={{ uri: item.poster_image }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>

        <Text style={[styles.heading1, { color: colors.text }]}>
          {t('trending_movies')}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Icons
            name="search-outline"
            size={28}
            style={{
              color: colors.icon,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              padding: 6,
              marginTop: 40,
              marginRight: 10,
              fontWeight: 'bold',
            }}
          />
        </TouchableOpacity>

      </View>

      <FlatList
        data={trendingMovies}
        styles={styles.movieCard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 30 }}
      />

      <Text style={[styles.heading2, { color: colors.text }]}>
        {t('pay_per_view')}
      </Text>

      <FlatList
        data={payperviewMovies}
        styles={styles.movieCard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 30 }}
      />

      <Text style={[styles.heading2, { color: colors.text }]}>
        {t('viewed_movies')}
      </Text>

      <FlatList
        data={viewedMovies}
        styles={styles.movieCard}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 30 }}
      />

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    padding: 8,
  },
  heading1:{
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 50,
    marginLeft: 8,
  },
  heading2:{
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 2,
    marginLeft: 8,
  },
  centered:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  emptyText:{
    color: '#999',
    fontSize: 26,
  },
  movieTitle:{
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieCard:{
    marginRight: 12,
    width:160,
    height: 120,
    borderRadius: 10,
    marginLeft: 8,
  },
  thumbnail:{
    width: 150,
    height: 220,
    borderRadius: 12,
    marginRight: 14,
  },
});