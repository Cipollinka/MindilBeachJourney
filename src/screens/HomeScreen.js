import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutScreen from './AboutScreen';
import LinearGradient from 'react-native-linear-gradient';
import SettingsScreen from './SettingsScreen';
import ResultsScreen from './ResultsScreen';
import LooseScreen from './LooseScreen';
import WinScreen from './WinScreen';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import BeginScreen from './BeginScreen';
import EasyBreezyScreen from './EasyBreezyScreen';
import FortuneWheel from './FortuneWheel';
import BeachMasterScreen from './BeachMasterScreen';
import ActivityScreen from './ActivityScreen';
import ActivityResultScreen from './ActivityResultScreen';
import CocktailScreen from './CocktailScreen';
import ArchiveScreen from './ArchiveScreen';

const bottomButtons = [
  { screen: 'Archive', image: require('../assets/icons/bottomsIcons/ArchiveIconMindil.png'), selectedImage: require('../assets/icons/selectBottomIcons/selectArchiveIconMindil.png') },
  { screen: 'Activity', image: require('../assets/icons/bottomsIcons/ActivityIconMindil.png'), selectedImage: require('../assets/icons/selectBottomIcons/selectActivityIconMindil.png') },
  { screen: 'Home', image: require('../assets/icons/bottomsIcons/HomeIconMindil.png'), selectedImage: require('../assets/icons/selectBottomIcons/selectHomeIconMindil.png') },
  { screen: 'Cocktail', image: require('../assets/icons/bottomsIcons/CocktailIconMindil.png'), selectedImage: require('../assets/icons/selectBottomIcons/selectCocktailIconMindil.png') },
  { screen: 'Settings', image: require('../assets/icons/bottomsIcons/SettingsIconMindil.png'), selectedImage: require('../assets/icons/selectBottomIcons/selectSettingsIconMindil.png') },
];

const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
const fontIterBold = 'Inter_18pt-Bold';

const HomeScreen = () => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedQuestMode, setSelectedQuestMode] = useState('');
  const [activeScreenTab, setActiveScreenTab] = useState('Home');
  const [testNumber, setTestNumber] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [activityTestResult, setActivityTestResult] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  

  useEffect(() => {
    console.log('typeof testNumber', typeof testNumber);
  }, [activeScreenTab, testNumber]);

  useEffect(() => {
    const fetchThisUser = async () => {
      try {
        const asyncUser = await AsyncStorage.getItem('currentUser');
        if (asyncUser) {
          const parsedUser = JSON.parse(asyncUser);
          setCurrentUser(parsedUser);
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchThisUser();
  }, []);


  useEffect(() => {
    if (activeScreenTab === 'Home'
      || activeScreenTab === 'Cocktail'
      || activeScreenTab === 'Activity'
      || activeScreenTab === 'Settings'
      || activeScreenTab === 'Archive') {
      setSelectedQuestMode('');
      setSelectedActivity('');
    }

  }, [activeScreenTab])


  return (
    <ImageBackground
      source={require('../assets/images/BackgroundMindil.png')}
      style={{ flex: 1, alignItems: 'center', }}
      resizeMode="cover"
    >
      {activeScreenTab === 'Home' ? (
        <View className="flex-1 " style={{ width: '100%' }}>
          <View className="">
            <Image
              source={require("../assets/images/MindilHomeImage.png")}
              className="items-center mx-10"
              style={{
                width: '100%',
                height: (dimensions.height * 0.5) * (9 / 16),
                alignSelf: 'center'
              }}
              resizeMode='cover'
            />
          </View>
          <View >
            <Text
              style={[
                styles.mainText(dimensions),
                {paddingTop: 16, fontFamily: fontAbhayaSemiBold, fontWeight: 700,  marginHorizontal: 20,  lineHeight: dimensions.width * 0.1 }
              ]}
            >
              Mindil Beach Journey: Unveiling the Wonders of Darwin
            </Text>
          </View>
          <View className="flex-col justify-between" >
            {['Let`s Begin', 'Show Results', 'About'].map((selectPage) => (
              <TouchableOpacity
                key={selectPage}
                className="w-[70%]"
                style={{ maxWidth: '70%',  paddingBottom: dimensions.width < 380 ? 12 : 21, alignSelf: 'center', }}
                onPress={() => {
                  if (selectPage === "Let`s Begin") {
                    setActiveScreenTab("Begin");
                  } else if (selectPage === "Show Results") {
                    setActiveScreenTab("Results");
                  } else if (selectPage === "About") {
                    setActiveScreenTab("About");
                  }
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
                    style={[
                      styles.textDescription(dimensions),
                      { fontFamily: fontIterBold, paddingVertical: dimensions.width * 0.04, fontWeight: '700', }
                    ]}
                  >
                    {selectPage}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      ) : activeScreenTab === 'Loose' ? (
        <LooseScreen setActiveScreenTab={setActiveScreenTab} selectedQuestMode={selectedQuestMode} setSelectedQuestMode={setSelectedQuestMode} />
      ) : activeScreenTab === 'Win' ? (
        <WinScreen setActiveScreenTab={setActiveScreenTab} selectedQuestMode={selectedQuestMode} setSelectedQuestMode={setSelectedQuestMode} testNumber={testNumber} setTestNumber={setTestNumber} />
      ) : activeScreenTab === 'Begin' ? (
        <BeginScreen setActiveScreenTab={setActiveScreenTab} setTestNumber={setTestNumber} testNumber={testNumber} selectedQuestMode={selectedQuestMode} setSelectedQuestMode={setSelectedQuestMode} />
      ) : activeScreenTab === 'Archive' ? (
        <ArchiveScreen setActiveScreenTab={setActiveScreenTab} />
      ) : activeScreenTab === 'Settings' ? (
        <SettingsScreen setActiveScreenTab={setActiveScreenTab} />
      ) : activeScreenTab === 'Activity' ? (
        <ActivityScreen setActiveScreenTab={setActiveScreenTab} 
          activityTestResult={activityTestResult} 
          setActivityTestResult={setActivityTestResult} 
          selectedActivity={selectedActivity} 
          setSelectedActivity={setSelectedActivity}
        />
      ) : activeScreenTab === 'About' ? (
        <AboutScreen setActiveScreenTab={setActiveScreenTab} />
      ) : activeScreenTab === 'Results' ? (
        <ResultsScreen setActiveScreenTab={setActiveScreenTab} activeScreenTab={activeScreenTab} />
      ) : activeScreenTab === 'EasyBreezyScreen' ? (
        <EasyBreezyScreen activeScreenTab={activeScreenTab} testNumber={testNumber} setActiveScreenTab={setActiveScreenTab}  />
      ) : activeScreenTab === 'BeachMasterScreen' ? (
        <BeachMasterScreen activeScreenTab={activeScreenTab} setActiveScreenTab={setActiveScreenTab} testNumber={testNumber} />
      ) : activeScreenTab === 'ActivityResult' ? (
        <ActivityResultScreen setActiveScreenTab={setActiveScreenTab} 
          activeScreenTab={activeScreenTab} 
          activityTestResult={activityTestResult} 
          setActivityTestResult={setActivityTestResult} 
          selectedActivity={selectedActivity} 
          setSelectedActivity={setSelectedActivity} />
      ) : activeScreenTab === 'Cocktail' ? (
        <CocktailScreen activeScreenTab={activeScreenTab} setActiveScreenTab={setActiveScreenTab} />
      )
        : null}
      <View
        className="absolute bottom-0 w-full py-2"
      >
        <View className="flex-row justify-around py-2 px-[5%]  mb-5">
          <View className="flex-1 flex-row justify-between ">
            {bottomButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveScreenTab(button.screen)}
              >
                <Image source={activeScreenTab === button.screen ? button.selectedImage : button.image} className="text-center h-10 w-10"
                resizeMode="contain" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  mainText: (dimensions) => ({
    fontSize: dimensions.width * 0.08,
    color: '#D6B66B',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  }),
  textDescription: (dimensions) => ({
    fontSize: dimensions.width * 0.06,
    color: 'black',
    textAlign: 'center',
  }),
});

export default HomeScreen;
