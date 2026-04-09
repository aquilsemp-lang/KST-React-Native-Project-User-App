// components/MovieThumbnail.js
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

const MovieThumbnail = ({ imageUrl, movieName, width = 160, height = 200, borderRadius = 8, onPress }) => {

  const handleShare = async () => {
    try {
      await Share.open({
        title: movieName || 'Check out this movie!',
        message: `Watch "${movieName}" on KissaShuru!`,
        url: imageUrl, // 👈 shares the thumbnail image URL
      });
    } catch (error) {
      console.log('Share cancelled or failed:', error.message);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={{ width, height, borderRadius, overflow: 'hidden' }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width, height }}
          resizeMode="cover"
        />
        {/* 👇 Share button on top right */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShare}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icons name="share-social-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MovieThumbnail;

const styles = StyleSheet.create({
  shareButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});