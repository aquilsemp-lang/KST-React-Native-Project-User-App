import React, { useEffect, useState, useRef } from 'react';
import {Text, View, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { get_search, get_search_list, save_search_data } from '../services/auth';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeContext';

const SearchScreen = ({ navigation }) => {

  const { t } = useTranslation();
  const { colors } = useTheme();

  const user  = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [movies, setMovies]= useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery]= useState('');
  const [loading, setLoading]= useState(false);
  const [history, setHistory]= useState([]);
  const [showHistory, setShowHistory]= useState(true);

  const debounceRef = useRef(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (user?.id) fetchSearchHistory();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response  = await get_search();
      const movieList = response?.movieList || [];
      setMovies(movieList);
      setFilteredMovies(movieList);
    } catch (error) {
      console.log('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await get_search_list(user.id, token);
      const historyData = response?.data || [];
      setHistory(historyData);
    } catch (error) {
      console.log('History fetch error:', error);
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length === 0) {
      setFilteredMovies(movies);
      setShowHistory(true);
      return;
    }
    setShowHistory(false);
    const filtered = movies.filter((movie) =>
      (movie?.name || '').toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const clearSearch = () => {
    setQuery('');
    setFilteredMovies(movies);
    setShowHistory(true);
  };

  const handleHistoryTap = (item) => {
    const term = item?.search_query || '';
    handleSearch(term);
    setQuery(term);
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={async () => {
        try {
          if (query.length > 0 && user?.id) {
            await save_search_data(token, user.id, query, 1, 'movie');
            const response = await get_search_list(user.id, token);
            setHistory(response?.data || []);
          }
        } catch (error) {
          console.log('Save search error:', error);
        }
        navigation.navigate('HomeMovies', { movieId: item.id });
      }}
    >
      <Image
        source={{ uri: item.poster_image }}
        style={styles.thumbnail}
      />
    </TouchableOpacity>
  );

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleHistoryTap(item)}
    >
      <Icons name="time-outline" size={16} color={colors.subText} />
      <Text style={[styles.historyText, { color: colors.subText }]}>{item?.search_query || ''}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#E8751A" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Icons name="search-outline" size={20} color={colors.subText} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder={t('search_placeholder')}
          placeholderTextColor={colors.subText}
          value={query}
          onChangeText={handleSearch}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Icons name="close-circle" size={20} color={colors.subText} />
          </TouchableOpacity>
        )}
      </View>

      {showHistory && history.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={[styles.historyLabel, { color: colors.subText }]}>
            {t('recent_searches')}
          </Text>

          <FlatList
            data={history.slice(0, 3)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHistoryItem}
            scrollEnabled={false}
          />
        </View>
      )}

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        numColumns={2}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
        ListHeaderComponent={
          !showHistory && (
            <Text style={[styles.resultCount, { color: colors.subText }]}>
              {filteredMovies.length} {t('results')}
            </Text>
          )
        }
        ListEmptyComponent={
          <View style={styles.noResultContainer}>
            <Text style={[styles.noResults, { color: colors.text }]}>
              {t('no_results')}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#E8751A',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  historyContainer: {
    marginHorizontal: 10,
    marginTop: 14,
    marginBottom: 4,
  },
  historyLabel: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  historyText: {
    color: '#ccc',
    fontSize: 14,
  },
  resultCount: {
    color: '#666',
    fontSize: 12,
    marginHorizontal: 10,
    marginBottom: 6,
  },
  movieCard: {
    flex: 1,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  thumbnail: {
    width: 150,
    height: 180,
    borderRadius: 12,
  },
  noResults: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
  noResultContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});