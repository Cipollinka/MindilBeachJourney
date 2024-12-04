import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Platform, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { TailwindProvider } from 'tailwind-rn';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import utilities from './tailwind.json';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';
import Sound from 'react-native-sound';
import { AudioProvider, useAudio } from './src/context/AudioContext';
import { format } from 'date-fns'; 

const Stack = createNativeStackNavigator();

const MyStackComponent = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <AudioProvider>
            <TailwindProvider utilities={utilities}>
              <SafeAreaProvider>
                <AppNavigator />
                {Platform.OS === 'ios' && <PlayAudioPlayer />}
              </SafeAreaProvider>
            </TailwindProvider>
          </AudioProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const { user, setUser } = useContext(UserContext);
  const [initializing, setInitializing] = useState(true);
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedUser = await AsyncStorage.getItem(storageKey);
        const isOnboardingWasStarted = await AsyncStorage.getItem('isOnboardingWasStarted');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setOnboardingVisible(false);
        } else if (isOnboardingWasStarted) {
          setOnboardingVisible(false);
        } else {
          setOnboardingVisible(true);
          await AsyncStorage.setItem('isOnboardingWasStarted', 'true');
        }
      } catch (error) {
        console.error('Error loading user', error);
      } finally {
        setInitializing(false);
      }
    };
    loadCurrentUser();
  }, [setUser]);

  if (initializing) {
    return (
      <SafeAreaProvider>
        <ImageBackground
        source={require('./src/assets/images/BackgroundMindil.png')}
        style={{ flex: 1, alignItems: 'center',justifyContent: 'center', }}
        resizeMode="cover"
      >
        <ActivityIndicator size="large" color="#ffb91c" />
      </ImageBackground>
      </SafeAreaProvider>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={onboardingVisible ? 'OnboardingScreen' : 'Home'}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const PlayAudioPlayer = () => {
  const { volume } = useAudio();
  const [indexOfTheCurrentTrack, setIndexOfTheCurrentTrack] = useState(0);
  const [sound, setSound] = useState(null);

  const tracks = ['bgTrack1Mindil.mp3', 'bgTrack1Mindil.mp3'];

  const playTrack = (index) => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const newSound = new Sound(tracks[index], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Помилка завантаження треку:', error);
        return;
      }
      newSound.setVolume(volume);
      newSound.play((success) => {
        if (success) {
          setIndexOfTheCurrentTrack((prevIndex) => (prevIndex + 1) % tracks.length);
        } else {
          console.log('Помилка відтворення треку');
        }
      });
      setSound(newSound);
    });
  };

  useEffect(() => {
    playTrack(indexOfTheCurrentTrack);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [indexOfTheCurrentTrack]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(volume);
    }
  }, [volume]);

  return null;
};

export default MyStackComponent;