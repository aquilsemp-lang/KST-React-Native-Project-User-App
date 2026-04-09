import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserRecordings } from '../services/auth'; 
import { useAuthStore } from '../store/authStore'; 

const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const getInitials = (name) => {
    if (!name) return '?';
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};


const RecordingCard = ({ item, onPlay }) => (
    <View style={styles.card}>
        <View style={styles.cardTop}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(item.producer_name)}</Text>
            </View>
            <View style={styles.cardInfo}>
                <Text style={styles.producerName}>{item.producer_name}</Text>
                <Text style={styles.recordedAt}>{formatDate(item.recorded_at)}</Text>
            </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBottom}>
            <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Duration</Text>
                <Text style={styles.metaValue}>{formatDuration(item.duration)}</Text>
            </View>
            <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Call ID</Text>
                <Text style={styles.metaValue}>{item.call_id}</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.playButton} onPress={() => onPlay(item)}>
            <Text style={styles.playButtonText}>▶  Play Call Recording</Text>
        </TouchableOpacity>
    </View>
);

export default function RecordingScreen( {navigation}) {
    const { user, token } = useAuthStore();
    const [recordings, setRecordings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecordings();
    }, []);

    const fetchRecordings = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getUserRecordings(token, user.id);
            setRecordings(data);
        } catch (err) {
            setError(err.message || 'Failed to load recordings');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlay = (item) => {
      navigation.navigate('RecordingDetails', {recording:item})
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#E8751A" />
                <Text style={styles.loadingText}>Loading recordings...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchRecordings}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Recordings</Text>
                <Text style={styles.headerSubtitle}>{recordings.length} recording{recordings.length !== 1 ? 's' : ''}</Text>
            </View>

            <FlatList
                data={recordings}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <RecordingCard item={item} onPlay={handlePlay} />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.centered}>
                        <Text style={styles.emptyText}>No recordings found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        paddingHorizontal: 16,
        backgroundColor: '#000',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
    },
    list: {
        padding: 16,
        gap: 12,
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#E8751A',
        padding: 16,
        marginBottom: 12,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E8751A',
    },
    cardInfo: {
        flex: 1,
    },
    producerName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
    },
    recordedAt: {
        fontSize: 14,
        color: '#888',
        marginTop: 2,
        fontWeight: '800'
    },
    divider: {
        height: 0.5,
        backgroundColor: '#E0E0E0',
        marginVertical: 12,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    metaRow: {
        gap: 2,
    },
    metaLabel: {
        fontSize: 14,
        color: '#999',
    },
    metaValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
        textAlign:'center'
    },
    playButton: {
        backgroundColor: '#E8751A',
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 25,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    loadingText: {
        marginTop: 12,
        color: '#fff',
        fontSize: 14,
    },
    errorText: {
        color: '#B91C1C',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#E8751A',
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    emptyText: {
        color: '#888',
        fontSize: 14,
    },
});