import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { useAudio } from '../context/AudioContext';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';

const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
const fontIterBold = 'Inter_18pt-Bold';

const SettingsScreen = () => {
  const { volume, setVolume } = useAudio();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();


  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      RNRestart.Restart();
      console.log('AsyncStorage очищено');
    } catch (error) {
      console.error('Помилка при очищенні AsyncStorage', error);
    }
  };


  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>
      <LinearGradient
        colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
        style={{
          borderRadius: dimensions.width * 0.1,
          width: '90%',
          height: '50%'
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
      >
        <View style={{
          alignItems: 'center',
          width: '80%',
          alignSelf: 'center',
          marginVertical: 20,
          marginHorizontal: 80
        }} >
          <Text
            className=" font-semibold text-center"
            style={{
              fontFamily: fontAbhayaSemiBold,
              color: '#FCD997',
              fontSize: dimensions.width * 0.077,
              textAlign: 'left',
              alignSelf: 'flex-start',
              paddingBottom: '3%'
            }}
          >
            Music
          </Text>

          <View style={{
            width: '100%',
            height: dimensions.width * 0.08,
            borderRadius: 5,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <LinearGradient
              colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: `${volume * 100}%`,
                position: 'absolute',
                top: 0,
                bottom: 0,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderTopRightRadius: volume === 1 ? 5 : 0,
                borderBottomRightRadius: volume === 1 ? 5 : 0,
              }}
            />
            <LinearGradient
              colors={['#4B3621', '#4B3621', '#4B3621', '#4B3621', '#4B3621']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${volume * 100}%`,
                right: 0,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                borderTopLeftRadius: volume === 0 ? 5 : 0,
                borderBottomLeftRadius: volume === 0 ? 5 : 0,
              }}
            />
            <Slider
              style={{
                width: '100%',
                height: 40,
                position: 'absolute',
                top: (dimensions.width * 0.08 - 40) / 2, // Center the slider vertically
              }}
              minimumValue={0}
              maximumValue={1}
              value={volume}
              onValueChange={(value) => setVolume(value)}
              minimumTrackTintColor="transparent"
              maximumTrackTintColor="transparent"
              thumbTintColor="#20DE9F"
              thumbStyle={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                backgroundColor: '#20DE9F',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
              }}
            />
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity
        className="w-[70%]"
        style={{ width: '80%', marginTop: '10%', alignSelf: 'center', }}
        onPress={()=> {
          clearAsyncStorage();
          navigation.replace('OnboardingScreen');
        }}
      >
        <LinearGradient
          colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
          style={{
            width: 'auto',
            paddingVertical: 0,

            borderRadius: dimensions.width < 380 ? 21 : 30,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}
        >
          <Text
            className=" text-center "
            style={{
              fontFamily: fontIterBold, 
              paddingVertical: dimensions.width * 0.04, 
              fontWeight: '700', 
              fontSize: dimensions.width * 0.06,
              color: 'black',
              textAlign: 'center',
            }}
          >
            Reset Progress
          </Text>
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
};

export default SettingsScreen;
