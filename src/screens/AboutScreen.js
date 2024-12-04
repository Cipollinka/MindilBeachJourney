import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground
} from 'react-native';

const fontIterBold = 'Inter_18pt-Bold';

const AboutScreen = ({ }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  return (
    <SafeAreaView className="flex-1" style={{ marginBottom: 80, width: '100%' }}>


      <ImageBackground
        source={require('../assets/images/AboutRect.png')}
        style={{ alignItems: 'center', width: '100%', paddingBottom: 50 }}
        resizeMode="contain"
      >

        <ScrollView contentContainerStyle={{ paddingVertical: 50, paddingHorizontal: dimensions.width < 380 ? 35 : 16 }}>
          <Text
            className="text-[#FAEDE1] text-xs font-semibold text-left"
            style={{
              fontFamily: fontIterBold, 
              fontWeight: '500',
              lineHeight: dimensions.width * 0.055,
              fontSize: dimensions.width * 0.05,
              color: 'white',
              textAlign: 'left',
              paddingHorizontal: 25,
            }}
          >
            Welcome to Mindil Beach Journey: Unveiling the Wonders of Darwin! Our app is designed to enhance your experience at one of Australia’s most beautiful beaches. Explore stunning landscapes, enjoy various activities, and immerse yourself in the vibrant culture of Darwin.
            What we offer:
            {`\n `}  •	Interactive Features: Discover unique opportunities such as creating your perfect beach day and designing your own cocktails to make the most of your time at Mindil Beach.
            {`\n`}   •	Variety of Activities: From surfing and yoga to picnics and snorkeling—find detailed information about all the activities you can try while soaking up the sun and waves.
            {`\n`}   •	Cultural Insights: Learn about the rich heritage of the local Aboriginal people, participate in events and festivals, and gain a deeper appreciation for the beauty of the surrounding nature.
            Thank you for choosing Mindil Beach Journey! We hope you create unforgettable memories and enjoy every moment spent in this paradise.
          </Text>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AboutScreen;
