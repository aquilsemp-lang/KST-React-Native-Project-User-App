import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icons from 'react-native-vector-icons/Octicons';

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
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
};

export default function RecordingDetails({ navigation, route }) {
    const { recording } = route.params;
    const bottomSheetRef = useRef(null);
    const snapPoints = ['50%'];

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
            Alert.alert('Error', 'Could not open video player');
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
                backgroundStyle={styles.sheetBackground}
            >
                <BottomSheetView style={styles.container}>

                    <View style={styles.headerRow}>
                        <View style={styles.videoIcon}>
                            <Icons name="device-camera-video" size={35} color='#E8751A' style={{padding: 12}}/>
                        </View>
                        <Text style={styles.callHeading}>Call Recording</Text>
                        
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                            <Text style={styles.closeBtnText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <View style={{flexDirection:'row', gap:4,}}>
                                <Icons name="clock" size={12} color='#999' style={{paddingTop:10,}} /> 
                                <Text style={styles.detailLabel}>Duration</Text>
                            </View>
                            <Text style={styles.detailValue} numberOfLines={2}>{formatDuration(recording.duration)}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <View style={{flexDirection:'row', gap:4, padding: 10}}>
                                <Icons name="calendar" size={12} color='#999' style={{paddingTop:10,}} />
                                <Text style={styles.detailLabel}>Recorded</Text>
                            </View>
                            <Text style={styles.detailValue} numberOfLines={2}>{formatDate(recording.recorded_at)}</Text>
                        </View>

                    </View>

                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo}>
                            <Text style={styles.playIcon}>▶</Text>
                            <Text style={styles.playButtonText}>Play </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playButton} onPress={handlePlayVideo}>
                            <Icons name="share-android" size={20} color='#999'/>
                            <Text style={styles.playButtonText}>Play Recording</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}

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
        gap: 20,
    },
    detailItem: {
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#999',
        borderWidth: 0.6,
        gap: 1,
        padding: 15
    },
    detailLabel: {
        fontSize: 14,
        color: '#888',
        paddingVertical: 6,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8751A',
        borderRadius: 12,
        paddingVertical: 14,
        gap: 10,
        marginTop: 16,
        marginHorizontal: 25,
    },
    playIcon: {
        color: '#fff',
        fontSize: 16,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8751A',
        borderRadius: 12,
        paddingVertical: 14,
        gap: 10,
        marginTop: 16,
        marginHorizontal: 25,
    },
    shareIcon: {
        color: '#fff',
        fontSize: 16,
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
});