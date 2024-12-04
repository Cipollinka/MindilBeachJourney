import React, { useRef, useState } from 'react';
import { View, Image, Button, Animated, Easing, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';

const FortuneWheel = ({ selectedPrize, setSelectedPrize, setHintModalVisible, setIsHintAvaileble }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const palms = useSelector(state => state.user.palms);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const dispatch = useDispatch();
  const [isWheelStopped, setIsWheelStopped] = useState(false);

  const prizes = [
    '1 heart',
    'Skip question',
    '3 hearts',
    'Show answer',
    '2 hearts',
    'Close uncorrect',
  ];

  const handleBuySpin = (amount) => {
    const updatedPalmsAmount = palms + amount;
    dispatch(updateUserData({ palms: updatedPalmsAmount }));
    dispatch(saveUserData({ palms: updatedPalmsAmount }));
  };

  const fontIterBold = 'Inter_18pt-Bold';

  const spinWheel = () => {
    setIsHintAvaileble(false);
    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    setSelectedPrize(prizes[randomPrizeIndex]);

    const numberOfRotations = 5;
    const anglePerSection = 360 / prizes.length;
    const randomStopAngle = randomPrizeIndex * anglePerSection;

    const finalRotation = 360 * numberOfRotations + randomStopAngle;
    
    setIsWheelStopped(false);

    Animated.timing(rotateValue, {
      toValue: finalRotation,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      rotateValue.setValue(finalRotation % 360); 
      setIsWheelStopped(true);
      setTimeout(() => {
        setHintModalVisible(false);
      }, 700); 
    });
  };

  const interpolatedRotation = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ rotate: interpolatedRotation }],
        }}
      >
        <Image
          source={require('../assets/images/fortuneWheelMindil.png')} // Замість файлу користуйтеся відповідним шляхом
          style={{
            width: dimensions.width < 380 ? dimensions.width * 0.5 : dimensions.width * 0.6,
            height: dimensions.width < 380 ? dimensions.width * 0.5 : dimensions.width * 0.6,
          }}
        />
      </Animated.View>

      <Text style={{
        color: 'white',
        fontSize: dimensions.width * 0.05,
        fontWeight: '700',
        opacity: isWheelStopped && selectedPrize ? 1 : 0,
      }}>
        Prize: {selectedPrize}
      </Text>

      <View className="  items-center  shadow-lg" style={{ alignSelf: 'center', alignItems: 'center', width: '100%', }}>
        <View className="py-10 flex" style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>

          <View className="flex-row space-x-3 text-center" style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>

            <View className="flex-1 space-y-3" style={{ width: '100%', alignSelf: 'center' }}>

              <TouchableOpacity
                className="flex-row items-center mr-4 space-x-3"
                style={{ width: '100%', alignSelf: 'center' }}
                disabled={palms < 100}
                onPress={() => { handleBuySpin(-100); spinWheel(); }}
              >
                <LinearGradient
                  colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                  style={{
                    width: '50%',
                    paddingVertical: 0,
                    position: 'relative',
                    alignItems: 'center',
                    alignSelf: 'center',
                    opacity: palms < 100 ? 0.7 : 1,
                    borderRadius: dimensions.width * 0.064,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0, 0.25, 0.5, 0.75, 1]}
                >
                  <View className="flex-row px-7 py-3">
                    <Text style={{
                      paddingBottom: 5,
                      fontFamily: fontIterBold,
                      fontWeight: 700,
                      textAlign: 'center',
                      fontSize: dimensions.width * 0.05,
                      color: 'black',
                    }}
                    >1 Spin</Text>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                  style={{
                    opacity: palms < 100 ? 0.7 : 1,
                    width: '50%',
                    paddingVertical: 0,
                    position: 'relative',
                    alignItems: 'center',
                    borderRadius: dimensions.width * 0.064,
                    flex: 1,
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0, 0.25, 0.5, 0.75, 1]}
                >
                  <View className="flex-row px-5 py-3 text-center items-center">
                    <Text style={{ fontFamily: fontIterBold, fontWeight: '700', fontSize: dimensions.width * 0.055 }}>100 </Text>
                    <Image
                      source={require("../assets/icons/palmIconMindil.png")}
                      className="h-7 w-7 text-center items-center"
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FortuneWheel;
