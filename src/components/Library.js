import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import KnowMore from './KnowMore.js';
import {IronSourceRewardedVideo} from '@wowmaking/react-native-iron-source';

const Library = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAdClicked, setIsAdClicked] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    console.log('rendered');
    IronSourceRewardedVideo.addEventListener(
      'ironSourceRewardedVideoAvailable',
      (res) => {},
    );

    IronSourceRewardedVideo.addEventListener(
      'ironSourceRewardedVideoAdRewarded',
      () => {
        setIsShown(true);
      },
    );

    IronSourceRewardedVideo.initializeRewardedVideo();
  }, []);

  const showAd = () => {
    setIsAdClicked(true);

    IronSourceRewardedVideo.isRewardedVideoAvailable().then((available) => {
      if (available) {
        IronSourceRewardedVideo.showRewardedVideo();
      } else {
        ToastAndroid.show(
          'Ad is not available right now. Thanks tho ✨',
          ToastAndroid.SHORT,
        );
      }
    });
  };

  useEffect(() => {
    if (isShown) {
      setIsAdClicked(false);

      ToastAndroid.show(
        'Thanks for watching the Ad. It will help in the development of Project',
        ToastAndroid.SHORT,
      );
    }
  }, [isShown]);

  const BetterKnowMore = React.memo(KnowMore);

  return (
    <>
      <View
        style={{flex: 1, backgroundColor: '#181818', paddingHorizontal: 10}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>Your Library</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <ScrollView alwaysBounceVertical={true}>
            <TouchableOpacity onPress={() => navigation.navigate('Downloads')}>
              <View style={styles.optionWrapper}>
                <Image
                  source={require('../assets/down.png')}
                  style={styles.optionIcon}
                />
                <Text style={styles.buttons}>Downloads </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SavedPlaylists')}>
              <View style={styles.optionWrapper}>
                <Image
                  source={require('../assets/heart.png')}
                  style={styles.optionIcon}
                />
                <Text style={styles.buttons}>Saved</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <View style={styles.optionWrapper}>
                <Image
                  source={require('../assets/info.png')}
                  style={styles.optionIcon}
                />
                <Text style={styles.buttons}>Know More</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Donations')}>
              <View style={styles.optionWrapper}>
                <Image
                  source={require('../assets/red-heart.png')}
                  style={styles.optionIcon}
                />
                <Text style={styles.buttons}>Support the App</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={showAd}>
              <View style={styles.optionWrapper}>
                <Image
                  source={require('../assets/reward.png')}
                  style={styles.optionIcon}
                />
                <View>
                  <Text style={styles.buttons}>Watch an Rewarded Ad</Text>
                  <Text style={styles.smallText}>
                    This will help in the development of this App ✨
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <BetterKnowMore
              isModalVisible={isModalVisible}
              toggleModal={toggleModal}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Library;

const styles = StyleSheet.create({
  header: {
    flex: 0.3,
    marginTop: '5%',
  },
  heading: {
    color: '#1DB954',
    fontFamily: 'GothamMedium',
    fontSize: 50,
    alignSelf: 'center',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'flex-start',
  },
  buttons: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'GothamMedium',
  },
  smallText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Gotham',
  },
  optionWrapper: {
    flex: 1,
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 10,
  },
  optionIcon: {
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
});
