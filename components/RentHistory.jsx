import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { rentHistory } from '../services/auth';
import Icons from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

const RentHistory = ({navigation}) => {

    const { t } = useTranslation();

    const token = useAuthStore((state) => state.token);
    const [rentData, setRentData] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' });
    };

    useEffect(() =>{
        const fetchRentHistory = async () =>{
            try{
                setLoading(true);
                const renting_data = await rentHistory(token);
                setRentData(renting_data.data);
            }
            catch(error){
                console.log(error.message);
            }
            finally{
                setLoading(false);
            }
        };
        fetchRentHistory();
    },[]);

    if(loading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#E8751A"/>
            </View>
        );
    }

    if(rentData.length===0){
        return(
            <View style={styles.centered}>
                <Text style={styles.emptyText}>
                    {t('no_rent_history')}
                </Text>
            </View>
        )
    }

  return (
    <View style={styles.container}>

        <Text style={styles.Title}>
            {t('rent_history')}
        </Text>

        <FlatList
            data={rentData}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{padding:14}}
            renderItem={({item}) =>(

                <TouchableOpacity
                    onPress={()=> navigation.navigate('RentDetails', {
                        movieId: item.movie_id,
                        movieName: item.movie_name,
                        rentData: rentData.filter(r=>r.movie_id===item.movie_id)
                    })}
                >

                <View style={styles.movieCard}>

                    <Image
                        source={{ uri: item.poster_image}}
                        style={styles.thumbnail}
                        resizeMode="cover"
                    />

                    <View style={styles.movieInfo}>

                        <Text style={styles.movieTitle} numberOfLines={1}>
                            {item.movie_name}
                        </Text>

                        <View style={styles.metaRow}>

                            <Text style={styles.movieMeta}>
                                {formatDate(item.purchased_at)} •
                            </Text>

                            <Icons name="clock" size={10} color="#999" style={styles.icon} />

                            <Text style={styles.movieMeta}>
                                {item.access_duration_mins > 60
                                    ? `${Math.floor(item.access_duration_mins / 60)}h`
                                    : `${item.access_duration_mins}m`} {t('access')} •
                            </Text>

                            <Text style={styles.movieMeta}>
                                {item.duration}
                            </Text>

                        </View>

                        <View>
                            {item.genres?.map((g) => (
                                <View key={g.id}>
                                    <Text style={styles.movieGenre}>
                                        {g.name}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <Text style={styles.moviePrice}>
                            ₹{item.price}
                        </Text>

                    </View>

                </View>
                </TouchableOpacity>
            )}        
        />  
    </View>
  );
};

export default RentHistory;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
    },
    centered:{
        justifyContent:'center',
        alignContent: 'center',
        backgroundColor: 'black',
        flex: 1,
    },
    emptyText:{
        color: '#999',
        fontSize: 18,
    },
    Title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
        marginLeft:10,
    },
    movieCard:{
        flexDirection:'row',
        marginBottom:18,
        backgroundColor: '#1a1a1a',
        borderRadius: 18,
        overflow: 'hidden',
    },
    thumbnail:{
        width: 90, height: 110,
        borderRadius: 8 
    },
    movieInfo:{
        flex:1,
        padding: 10,
    },
    movieTitle:{
        color:'#fff',
        fontSize: 16, 
        fontWeight: 'bold',
        marginBottom: 4,
    },
    movieMeta: { 
        color: '#999', 
        fontSize: 12, 
        marginBottom: 2,
        marginLeft:2 
    },
    metaRow:{
        flexDirection: 'row',
    },
    icon:{
        marginLeft:4,
        marginBottom: 2,
        marginTop: 4
    },
    movieGenre:{
        color: '#999', 
        fontSize: 12, 
        marginBottom: 2,
        marginLeft:2, 
        marginTop: 6
    },
    moviePrice:{
        fontSize:14,
        fontWeight:'bold',
        textAlign: 'right',
        color: 'white',
        position:'static'
        
    }

});