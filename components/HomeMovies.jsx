import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState} from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import Icons from 'react-native-vector-icons/Ionicons';
import IconClock from 'react-native-vector-icons/Feather';
import { useAuthStore } from '../store/authStore';
import { addToWatchList } from '../services/auth';
import { useWatchlistStore } from '../store/watchlistStore';
import MovieThumbnail from '../globalComponents/MovieThumbnail';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const MovieDetail = ({navigation, route }) => {

  const { t } = useTranslation();

  const { movieId } = route.params;
  const dashboardData = useDashboardStore((state) => state.dashboardData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const token = useAuthStore((state) => state.token);
  const {addToWatchlist: addToStore, isInWatchlist} = useWatchlistStore();

  const handleAddWatchlist = async (movie) => {
    try {
      await addToWatchList(token, movie.id);
      addToStore(movie);
      console.log('Added to watchlist');
    } catch (error) {
      console.log(error.message);
    }
  };

  const movie = dashboardData?.movie_data?.find(
    (m) => Number(m.id) === Number(movieId)
  );

  if (!movie) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff' }}>
          {t('movie_not_found')}
        </Text>
      </View>
    );
  }

  const stripHtml = (html) => {
    if(!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  const renderMovie = ({item}) => (

    <View style={styles.movieCard}>
      <View>

        <MovieThumbnail
          imageUrl={item.thumbnail_image}
          movieName={item.name}
          width={'100%'}
          height={250}
          borderRadius={10}
        />

        <View style={styles.movieInfo}>

          <Text style={styles.movieTitle} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.metaRow}>
            <IconClock name="clock" size={13} color="#999" style={{ marginRight: 4 , marginTop:2 }} />
            <Text style={styles.metaText}>{item.duration}</Text>

            <Text style={styles.metaDot}>•</Text>

            <Icons name="star" size={13} color="#999" style={{ marginRight: 4 }} />
            <Text style={styles.metaText}>{item.content_rating}+</Text>
          </View>

          <View style={styles.addWatchlistButton}>
            <TouchableOpacity
              onPress={()=> !isInWatchlist(item.id) && handleAddWatchlist(item)}
            >
              {isInWatchlist(item.id) ? (
                <Text style={styles.addedWatchlistText}>
                  ✔ {t('added_to_watchlist')}
                </Text>
              ) : (
                <Text style={styles.addWatchlistText}>
                  + {t('add_to_watchlist')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.descTitle}>
            {t('about_movie')}
          </Text>

          {item.description ? (
            <Text style={styles.movieDesc}>
              {stripHtml(item.description)}
            </Text>
          ) : null}

          <Text style={styles.descTitle}>
            {t('genre')}
          </Text>

          <View style={styles.genreRow}>
            {item.genres?.map((g) => (
              <View key={g.id} style={styles.genreTag}>
                <Text style={styles.genreText}>
                  {g.name}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.castTitle}>
            {t('cast_crew')}
          </Text>

          <FlatList
            data={item.casts}
            nestedScrollEnabled={true}
            keyExtractor={(c) => c.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: c }) => (
              <View style={styles.castItem}>
                <Icons
                  name="person-outline"
                  size={40}
                  color="#E8751A"
                  style={{borderRadius:40, borderWidth:0.8, borderColor:'#E8751A', padding:6}}
                />
                <Text style={styles.castName}>
                  {c.name}
                </Text>
              </View>
            )}
          />

          <Text style={styles.descTitle}>
            {t('reviews')}
          </Text>

          <Text style={styles.descTitle}>
            {t('more_like_this')}
          </Text>

          <View>
            <FlatList
              data={dashboardData?.movie_data?.filter((m) => m.id !== item.id).slice(0, 10)}
              nestedScrollEnabled={true}
              keyExtractor={(m) => m.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: m }) => (
                <View style={{ marginRight: 12}}>
                  <TouchableOpacity
                    onPress={()=>navigation.navigate('HomeMovies',{movieId: m.id})}
                  >
                    <Image
                      source={{ uri: m.thumbnail_image }}
                      style={{ width: 160, height: 200, borderRadius: 8 }}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{ color: '#fff', marginTop: 4, fontSize: 12, width: 120, textAlign: 'center'}}
                    numberOfLines={1}
                  >
                    {m.name}
                  </Text>

                </View>
              )}
            />
          </View>

        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[movie]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e)=>{
          const index= Math.round(e.nativeEvent.contentOffset.x /width);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000' 
  },
  thumbnail: { 
    width: '100%', 
    height: 250 
  },
  info: { 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 8 
  },
  meta: { 
    fontSize: 14, 
    color: '#999' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  counter:{
    color: '#000',
    textAlign: 'right',
    paddingRight: 16,
    paddingTop: 10,
    fontSize: 13,
  },
  emptyText: { 
    color: '#999', 
    fontSize: 16 
  },

  movieCard: {
    marginHorizontal: 8,
    marginBottom: 20,
    backgroundColor: '#000',
    borderRadius: 14,
    overflow: 'hidden',
  },

  thumbnail: {
    width: '100%',
    height: 250,
  },
  starsRow:{
  flexDirection: 'row',
  marginBottom: 8,
  },

  movieInfo: {
    padding: 14,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  descTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: 14,

  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metaText: {
    fontSize: 13,
    color: '#999',
  },
  metaDot: {
    color: '#999',
    marginHorizontal: 6,
  },
  movieDesc: {
  fontSize: 14,
  color: '#fff',
  lineHeight: 22,
  marginBottom: 8,
},
addWatchlistButton: {
  alignItems: 'center',
  fontSize: 14,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#E8751A',
  height: 50,
  justifyContent: 'center',
  marginBottom: 6,
  
},
addWatchlistText: {
  color: 'white',
  fontSize: 20,
},
addedWatchlistText:{
  color: '#E8751A',
  fontSize: 20,
  fontWeight: 'bold',
},
genreRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 4,
},
genreTag:{
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 20,
  paddingHorizontal: 12,
  paddingVertical: 4,
},
genreText: {
  color: '#fff',
  fontSize: 13,
},
castTitle:{
  fontSize: 20,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 6,
  marginTop: 14,
},
castItem: {
  alignItems: 'center',
  marginRight: 16,
  width: 70,
  marginBottom: 12,
},
castImage: {
  width: 60,
  height: 60,
  borderRadius: 30,
  marginBottom: 6,
  backgroundColor: '#333',
},
castName: {
  color: '#fff',
  fontSize: 12,
  textAlign: 'center',
},
reviewSection:{
  flexDirection: 'row',
    marginTop: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    marginRight: 20,
},
reviewText:{
    color: '#fff',
    fontSize: 14,

},
});