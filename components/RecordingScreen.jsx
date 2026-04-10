import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet} from  'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserRecordings } from '../services/auth';
import { useAuthStore } from '../store/authStore';
import { useTranslation } from 'react-i18next';
import Icons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { useTheme } from '../store/themeContext';
import RNFS from 'react-native-fs';

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

const RecordingCard = ({ item, onPlay, t }) => {
    const { colors } = useTheme();

const handleShare = async () => {
    try {
        const localPath = `${RNFS.CachesDirectoryPath}/recording_${item.call_id}.mp4`;
        await RNFS.downloadFile({
            fromUrl: item.recording_url,
            toFile: localPath,
        }).promise;

        await Share.open({
            url: `file://${localPath}`,
            type: 'video/mp4',
        });
    } catch (error) {
        console.log('Share error:', error.message);
    }
};

    return(
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardTop}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(item.producer_name)}</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={[styles.producerName, { color: colors.text }]}>{item.producer_name}</Text>
                    <Text style={[styles.recordedAt, { color: colors.subText }]}>{formatDate(item.recorded_at)}</Text>
                </View>
                <TouchableOpacity style={styles.shareIcon} onPress={handleShare}>
                    <Icons name="share-social-outline" size={30} color='#E8751A' style={{padding:6}}/>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
                <View style={styles.metaRow}>
                    <Text style={[styles.metaLabel, { color: colors.subText }]}>{t('duration')}</Text>
                    <Text style={[styles.metaValue, { color: colors.text }]}>{formatDuration(item.duration)}</Text>
                </View>
                <View style={styles.metaRow}>
                    <Text style={[styles.metaLabel, { color: colors.subText }]}>{t('call_id')}</Text>
                    <Text style={[styles.metaValue, { color: colors.text }]}>{item.call_id}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.playButton} onPress={() => onPlay(item)}>
                <Text style={styles.playButtonText}>
                    ▶ {t('play')} {t('call_recording')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default function RecordingScreen({ navigation }) {
    const { user, token } = useAuthStore();
    const { colors } = useTheme();
    const [recordings, setRecordings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { t } = useTranslation();

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
            setError(err.message || t('error_loading_recordings'));
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlay = (item) => {
        navigation.navigate('RecordingDetails', { recording: item });
    };

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color="#E8751A" />
                <Text style={[styles.loadingText, { color: colors.text }]}>
                    {t('loading_recordings')}
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchRecordings}>
                    <Text style={styles.retryButtonText}>
                        {t('retry')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.background }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>
                    {t('my_recordings')}
                </Text>
                <Text style={[styles.headerSubtitle, { color: colors.subText }]}>
                    {recordings.length} {t('recording')}
                    {recordings.length !== 1 ? 's' : ''}
                </Text>
            </View>

            <FlatList
                data={recordings}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <RecordingCard item={item} onPlay={handlePlay} t={t} />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.centered}>
                        <Text style={[styles.emptyText, { color: colors.subText }]}>
                            {t('no_recordings_found')}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

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
        borderWidth: 4,
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
        backgroundColor: '#ccc',
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
        height: 0.8,
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
    shareIcon:{
        alignItems:'flex-end',
        position:'relative',
        backgroundColor:'rgba(232, 117, 26, 0.1)',
        borderRadius:20
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