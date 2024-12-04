import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const OnboardingScreen = ({ navigation }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));



  const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
  const fontIterBold = 'Inter_18pt-Bold';


  return (
    <ImageBackground
      source={require('../assets/images/BackgroundMindil.png')}
      style={{ flex: 1, alignItems: 'center', }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ position: 'relative' }}>

        <LinearGradient
          colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
          style={{
            borderRadius: dimensions.width * 0.1,
            width: '95%',
            height: '90%',
            alignSelf: 'center',
            position: 'relative',
            marginBottom: 19,
            
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.25, 0.5, 0.75, 1]}
        >
          

          <View style={{
            borderRadius: dimensions.width * 0.1,
            width: '100%',
            height: '95%',
            alignSelf: 'center',
            flex: 1,
            paddingVertical: 10,
          }}>
            <ScrollView style={{
            

            borderRadius: dimensions.width * 0.1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',

            flex: 1,
          }}>
            
            <Text style={{
              paddingHorizontal: 30,
              fontFamily: fontAbhayaSemiBold,
              fontWeight: 700,
              textAlign: 'left',
              marginBottom: 19,
              fontSize: dimensions.width * 0.05,
              color: 'white',
              paddingVertical: 40
            }}
            >
              Welcome to Mindil Beach Journey: Unveiling the Wonders of Darwin!
              Get ready to dive into the stunning beauty, vibrant culture, and fascinating history of Darwin and Mindil Beach, a place where every sunset transforms the sky into pure magic. Our app is here to be your personal guide, leading you to the most memorable spots, hidden gems, and authentic experiences this unique region has to offer.
              From the bustling markets where you can taste local flavors, to the museums preserving stories of the past, and the breathtaking national parks brimming with natural wonders, Mindil Beach Journey gives you the tips and insights you need for a comfortable and immersive experience. Uncover the secrets of the beach, from its role in indigenous culture to its importance as a community gathering place. You’ll find ideas for activities, recommendations for relaxation, and plenty of information about the diverse ecosystems that call this area home.
              Let us be your guide to enjoying every moment as you embark on this incredible adventure. Whether you’re strolling along the shore, taking in the brilliant sunsets, or exploring the local culture, Mindil Beach Journey will ensure your time here is unforgettable.
            </Text>
          </ScrollView>
          </View>


        </LinearGradient>
        <TouchableOpacity
          className="w-[70%]"
          style={{ width: '90%', position: 'absolute', bottom: 0, alignSelf: 'center', }}
          onPress={() => navigation.replace('Home')}
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
              Start Your Journey
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>

  );
};


export default OnboardingScreen;
