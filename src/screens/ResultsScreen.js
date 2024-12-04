import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, SafeAreaView, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { XMarkIcon } from 'react-native-heroicons/solid';

const interestingPlaces =[
  {
    id: 1,
    title: 'Mindil Beach',
    image: require('../assets/images/ResultsImages/mindilBeachImageMindil.png'),
  },
  {
    id: 2,
    title: 'Australian Aviation Heritage Centre',
    image: require('../assets/images/ResultsImages/AustralianAviationHeritageCentreMindil.png'),
  },
  {
    id: 3,
    title: 'Larrakia Cultural Centre',
    image: require('../assets/images/ResultsImages/LarrakiaCulturalCentreMindil.png'),
  },
  {
    id: 4,
    title: 'Litchfield National Park',
    image: require('../assets/images/ResultsImages/LitchfieldNationalParkMindil.png'),
  },
  {
    id: 5,
    title: 'Darwin Military Museum',
    image: require('../assets/images/ResultsImages/DarwinMilitaryMuseumMindil.png'),
  },
  {
    id: 6,
    title: 'Fannie Bay Gaol',
    image: require('../assets/images/ResultsImages/FannieBayGaolMindil.png'),
  },
  {
    id: 7,
    title: 'Kakadu National Park',
    image: require('../assets/images/ResultsImages/KakaduNationalParkMindil.png'),
  },
  {
    id: 8,
    title: 'Darwin Waterfront Precinct',
    image: require('../assets/images/ResultsImages/DarwinWaterfrontPrecinctMindil.png'),
  },
  {
    id: 9,
    title: 'Crocosaurus Cove',
    image: require('../assets/images/ResultsImages/CrocosaurusCoveMindil.png'),
  },
]

const StyledTouchableOpacity = styled(TouchableOpacity);

const fontIterBold = 'Inter_18pt-Bold';
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';

const ResultsScreen = ({ setActiveScreenTab, activeScreenTab }) => {
  const palms = useSelector(state => state.user.palms);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const screenShot = useRef();
  const [persons, setPersons] = useState([]);
  const [placesModalVisible, setPlacesModalVisible] = useState(false);
  const [selectedPersonPlaces, setSelectedPersonPlaces] = useState([]);

  const getRandomPlaces = () => {
    const shuffledPlaces = [...interestingPlaces].sort(() => 0.5 - Math.random());
    const randomCount = Math.floor(Math.random() * 2) + 2; 
    return shuffledPlaces.slice(0, randomCount);
  };
  

  useEffect(() => {
    const generateRandomPersons = () => {
      const personsNames = ["Ava", "Zoe", "Ben", "Ketrin", "James", "Djo", "Boris", "Mike", "Felix", "Bernard", "Andre", "Tomas", "Leo", "Luis"];
      const randomPersons = personsNames.slice(0, 14).map((name) => ({
        id: name,
        name,
        palms: Math.floor(Math.random() * ((33000 - 350) / 50 + 1)) * 25 + 750,
        places: getRandomPlaces(),  
      }));
      setPersons(randomPersons.sort((a, b) => b.palms - a.palms));
    };

    generateRandomPersons();
  }, [activeScreenTab]);

  const handlePlaceModal = (places) => {
    setSelectedPersonPlaces(places);
    setPlacesModalVisible(true);
  };

  const handleShareScreenShot = async () => {
    try {
      const uri = await screenShot.current.capture();
      const shareParams = {
        message: `See who's in the top 5 on the leaderboard of Mindil Beach Jorney!`,
        url: uri,
      };
      await Share.open(shareParams);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center" style={{ marginBottom: 110 }}>
      <View className="z-50 pt-7">
        <LinearGradient
          colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
          style={{
            borderRadius: 25,
            width: 'auto',
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}
        >
          <View className="flex-row p-5">
            <Text style={{
              fontFamily: fontAbhayaSemiBold,
              fontWeight: 700,
              textAlign: 'center',
              fontSize: dimensions.width * 0.07,
              color: 'black',
            }}
            >{palms ? `${palms}` : '0'}</Text>
            <Image
              source={require("../assets/icons/palmIconMindil.png")}
              className="h-7 w-7"
            />
          </View>
        </LinearGradient>
      </View>

      <ViewShot ref={screenShot} options={{ quality: 0.7, format: 'png', }}>
        <ScrollView style={{ marginTop: 10, alignSelf: 'center' }}>
          {persons.slice(0, 5).map((person) => (
            <View key={person.id} className="flex-row justify-between space-x-5 items-center p-2">
              <TouchableOpacity onPress={() => handlePlaceModal(person.places)} style={{
                    borderRadius: 25,
                    width: 'auto',
                    flex: 1, flexBasis: '45%'
                  }}>

                <LinearGradient
                  colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                  style={{
                    borderRadius: 25,
                    width: 'auto',
                    flex: 1, flexBasis: '45%'
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0, 0.25, 0.5, 0.75, 1]}
                >
                  <Text
                    style={{
                      fontFamily: fontAbhayaSemiBold,
                      fontSize: dimensions.width * 0.07,
                      fontWeight: 700,
                      color: 'black',
                      textAlign: 'center',
                      paddingVertical: 10,
                      color: 'black',
                    }}
                  >
                    {person.name}
                  </Text>
                  <Text style={{fontSize: dimensions.width * 0.028, alignSelf: 'center', marginTop: -14}}>Click to see owned places</Text>
                </LinearGradient>
              </TouchableOpacity>


              <LinearGradient
                colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                style={{ flexBasis: '45%', borderRadius: 25, paddingHorizontal: 15, flex: 1 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.25, 0.5, 0.75, 1]}
              >
                <View className="flex-row items-center space-x-1 my-3">
                  <Text
                    style={{
                      fontFamily: fontAbhayaSemiBold,
                      fontSize: dimensions.width * 0.07,
                      fontWeight: 700,
                      color: 'black',
                      textAlign: 'center',
                      paddingVertical: 0,
                      color: 'black',
                    }}
                  >{person.palms}
                  </Text>
                  <Image
                    source={require("../assets/icons/palmIconMindil.png")}
                    className="h-7 w-7"
                  />
                </View>
              </LinearGradient>
            </View>
          ))}
          <StyledTouchableOpacity onPress={handleShareScreenShot} style={{}}>
            <LinearGradient
              colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
              style={{
                borderRadius: 30,
                width: 'auto',
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.25, 0.5, 0.75, 1]}
            >
              <View className="p-5">
                <Text
                  style={{
                    fontFamily: fontAbhayaSemiBold,
                    fontSize: dimensions.width * 0.07,
                    fontWeight: 700,
                    color: 'black',
                    textAlign: 'center',
                    paddingVertical: 0,
                    color: 'black',
                  }}
                >Share</Text>
              </View>
            </LinearGradient>

          </StyledTouchableOpacity>
        </ScrollView>
      </ViewShot>

      <Modal visible={placesModalVisible} transparent={true} animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}>

          <LinearGradient
            colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
            locations={[0, 0.1, 0.5, 0.9, 1]}
            style={{
              borderRadius: 37,
              width: '95%',
              justifyContent: 'center',
              height: '60%',
              alignSelf: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ position: 'absolute', top: 16, right: 16, zIndex: 50 }}>

              <TouchableOpacity
                onPress={() => { setPlacesModalVisible(false); }}
                
              >
                <View >
                  <XMarkIcon size={42} color='#FCD997' />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, marginTop: 50 }}>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', }}>
                {selectedPersonPlaces.map((place, index) => (
                  <View key={place.id} style={{ width: '48%', marginBottom: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{
                      textAlign: 'center',
                      marginBottom: 10,
                      fontFamily: fontAbhayaSemiBold,
                      color: '#FCD997',
                      fontSize: dimensions.width * 0.05,
                    }}>
                      {place.title}
                    </Text>
                    <Image source={place.image} style={{ width: dimensions.width * 0.4, height: dimensions.width * 0.4, }} />
                  </View>
                ))}
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>



    </SafeAreaView>
  );
};

export default ResultsScreen;
