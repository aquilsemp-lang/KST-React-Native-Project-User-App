import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icons from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../store/themeContext';

const formatDuration = (seconds, t) => {
    if (!seconds) return `0 ${t('seconds')}`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} Minutes\n${s} Seconds`;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday:'short',
        day: '2-digit',
        month: 'short',
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${formattedDate},\n${formattedTime}`;
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
};

export default function RecordingDetails({ navigation, route }) {
    const { recording } = route.params;
    const bottomSheetRef = useRef(null);
    const snapPoints = ['50%'];

    const { t } = useTranslation();
    const { colors } = useTheme();

    const renderBackdrop = useCallback(
        (props) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                onPress={() => navigation.goBack()}
            />
        ),
        [navigation]
    );

    const handlePlayVideo = async () => {
        try {
            await Linking.openURL(recording.recording_url);
        } catch (err) {
            Alert.alert(t('error'), t('video_open_error'));
        }
    };

    const handleShare = async () => {
        try {
            await Share.open({
                url: recording.recording_url
            });
        } catch (error) {
            console.log('Share cancelled or failed:', error.message);
        }
    };

    return (
        <View style={styles.overlay}>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onClose={() => navigation.goBack()}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={styles.handle}
                backgroundStyle={[styles.sheetBackground, { backgroundColor: colors.card }]}
            >
                <BottomSheetView style={styles.container}>

                    <View style={styles.headerRow}>
                        <View style={styles.videoIcon}>
                            <Icons name="device-camera-video" size={35} color='#E8751A' style={{padding: 12}}/>
                        </View>

                        <Text style={[styles.callHeading, { color: colors.text }]}>
                            {t('call_recording')}
                        </Text>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                            <Text style={[styles.closeBtnText, { color: colors.subText }]}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsGrid}>
                        <View style={[styles.durationItem, { borderColor: colors.border }]}>
                            <View style={{flexDirection:'row', gap:4}}>
                                <Icons name="clock" size={12} color={colors.subText} style={{paddingTop:7}} />
                                <Text style={[styles.durationLabel, { color: colors.subText }]}>
                                    {t('duration')}
                                </Text>
                            </View>

                            <Text style={[styles.durationValue, { color: colors.text }]} numberOfLines={2}>
                                {formatDuration(recording.duration, t)}
                            </Text>
                        </View>

                        <View style={[styles.recordItem, { borderColor: colors.border }]}>
                            <View style={{flexDirection:'row', gap:4, padding: 10}}>
                                <Icons name="calendar" size={12} color={colors.subText} style={{paddingTop:6}} />
                                <Text style={[styles.recordLabel, { color: colors.subText }]}>
                                    {t('recorded')}
                                </Text>
                            </View>

                            <Text style={[styles.recordValue, { color: colors.text }]} numberOfLines={2}>
                                {formatDate(recording.recorded_at)}
                            </Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', gap:6}}>
                        <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo}>
                            <Icon name="play-outline" size={24} color='#fff'/>
                            <Text style={styles.playButtonText}>
                                {t('play')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                            <Icons name="share-android" size={24} color='#fff'/>
                            <Text style={styles.shareButtonText}>
                                {t('Share')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    sheetBackground: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handle: {
        backgroundColor: '#444',
        width: 40,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 18,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    videoIcon:{
        borderRadius: 14,
        backgroundColor: 'rgba(232, 117, 26, 0.1)',
        alignItems:'center',
        justifyContent:'center'
    },
    callHeading:{
        fontSize: 20,
        color: '#fff',
        fontWeight:'bold',
        paddingHorizontal: 10
    },
    headerInfo: {
        flex: 1,
    },
    producerName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
    },
    recordedAt: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    closeBtn: {
        position:'absolute',
        right:4
    },
    closeBtnText: {
        fontSize: 22,
        color: '#888',
    },
    detailsGrid: {
        flexDirection: 'row',
        gap: 22,
    },
    durationItem: {
        borderRadius: 10,
        borderColor: '#999',
        borderWidth: 0.6,
        gap: 1,
        padding: 14
    },
    durationLabel: {
        fontSize: 14,
        color: '#888',
        paddingVertical: 2,
    },
    durationValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginTop: 10,
    },
    recordItem: {
        borderRadius: 10,
        borderColor: '#999',
        borderWidth: 0.6,
        gap: 1,
        paddingVertical: 4,
        paddingLeft: 4
    },
    recordLabel: {
        fontSize: 14,
        color: '#888',
        paddingVertical: 2,
    },
    recordValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
        paddingHorizontal: 8,
        marginRight: 45,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8751A',
        borderRadius: 12,
        paddingVertical: 14,
        width: '45%',
        gap: 10,
        marginTop: 16,
        marginHorizontal: 10,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8751A',
        borderRadius: 12,
        paddingVertical: 14,
        width:'45%',
        gap: 10,
        marginTop: 16,
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});