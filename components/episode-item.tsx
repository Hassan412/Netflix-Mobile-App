import { AntDesign } from '@expo/vector-icons';

import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// {
//     id: 'episode1',
//     title: '1. Pilot Part 1 & 2',
//     poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
//     duration: '1h 21m',
//     plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
//     video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
// }

interface EpisodeItemProps {
    episode: Episode;
    onPress: (eppisode: Episode) => {}
}

const EpisodeItem = (props: EpisodeItemProps) => {
    const { episode, onPress } = props;

    return (
        <Pressable style={{ margin: 10 }} onPress={() => onPress(episode)}>
            <View style={styles.row}>
                <Image style={styles.image} source={{ uri: episode.poster }} />

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{episode.title}</Text>
                    <Text style={styles.duration}>{episode.duration}</Text>
                </View>

                <AntDesign name="download" size={24} color={'white'} />
            </View>

            <Text style={styles.plot}>{episode.plot}</Text>
        </Pressable>
    )
};
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 5,
    },
    image: {
        height: 75,
        aspectRatio: 16/9,
        resizeMode: 'cover',
        borderRadius: 3,
    },
    titleContainer: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
    },
    title: {

    },
    duration: {
        color: 'darkgrey',
        fontSize: 10,
    },
    plot: {
        color: 'darkgrey'
    }
})
export default EpisodeItem;