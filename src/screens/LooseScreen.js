import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, SafeAreaView, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import { XMarkIcon } from 'react-native-heroicons/outline';


const looseTexts = [
  {
    id: '1',
    textTitle: 'Sandy Shore',
    looseText: 'Located right by the water, you can enjoy the sound of the waves and beautiful sunsets. The spacious sandy area is perfect for spreading a blanket and enjoying a picnic with family and friends.'
  },
  {
    id: '2',
    textTitle: 'Park Area Near the Beach',
    looseText: 'This green area, located close to the beach, offers shady spots for relaxation and picnics. There are tables and benches available, making it a convenient place for outdoor dining.'
  },
  {
    id: '3',
    textTitle: 'Children’s Play Area',
    looseText: 'This area features playgrounds for kids to play while adults enjoy their picnic. It’s an excellent spot for families with children.'
  },
  {
    id: '4',
    textTitle: 'Viewing Platform',
    looseText: 'The viewing platform offers stunning views of the ocean and sunsets. Set up your picnic here to enjoy the scenery and capture beautiful photos.'
  },
  {
    id: '5',
    textTitle: 'Along the Bike Paths',
    looseText: 'Set up your picnic along one of the bike paths at Mindil Beach, where you can watch cyclists and runners. This is an ideal place for active relaxation, combining a picnic with physical activity.'
  },
  {
    id: '6',
    textTitle: 'Shady Spots Under Palm Trees',
    looseText: 'Mindil Beach is home to many palm trees that provide natural shade. These spots are perfect for a hot day, allowing you to avoid overheating.'
  },
  {
    id: '7',
    textTitle: 'Picnic Shelters',
    looseText: ' In some nearby areas, you can find shelters with tables and benches. This is a great option if you want a protected spot for your picnic from the sun and wind.'
  },
  {
    id: '8',
    textTitle: 'Near the Mindil Beach Market',
    looseText: 'If you want to spice up your picnic, you can grab food from the Mindil Beach market and set up on the beach while enjoying the sunsets and atmosphere.'
  },
  {
    id: '9',
    textTitle: 'By Surfing Viewpoints',
    looseText: 'These spots are not only great for surfing but also offer fantastic views. Enjoying a picnic here allows you to witness exciting surfing moments.'
  },
  {
    id: '10',
    textTitle: 'Near Cultural Event Areas',
    looseText: 'Occasionally, various cultural events and concerts take place at Mindil Beach. Organize your picnic during these times to enjoy the festive atmosphere and entertainment.'
  },

];

const fontIterBold = 'Inter_18pt-Bold';
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';

const LooseScreen = ({ setActiveScreenTab, selectedQuestMode, setSelectedQuestMode }) => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  const gamePalms = useSelector(state => state.user.gamePalms);
  const palms = useSelector(state => state.user.palms);
  const dispatch = useDispatch();
  const [textOfLoose, setTextOfLoose] = useState(0);
  const finalPalmsGameAmount = useSelector(state => state.user.finalPalmsGameAmount);

  const [textModalVisible, setTextModalVisible] = useState(false);
  const [textId, setTextId] = useState(0);
  const [usedTextsIds, setUsedTextsIds] = useState([]);

  useEffect(() => {
    if (usedTextsIds.length === looseTexts.length) {
      setUsedTextsIds([]);
    }
  }, [textId]);

  const getRandomTextId = () => {
    let textId;
    do {
      textId = Math.floor(Math.random() * looseTexts.length);
    } while (usedTextsIds.includes(textId));

    setUsedTextsIds(prev => [...prev, textId]);
    return textId;
  };

  const handleShowText = () => {
    const index = getRandomTextId();
    setTextId(index);
  };


  useEffect(() => {
    if (palms) {

      dispatch(updateUserData({ palms: palms + gamePalms }));
      dispatch(saveUserData({ palms: palms + gamePalms }));
    } else {
      dispatch(updateUserData({ palms: gamePalms }));
      dispatch(saveUserData({ palms: gamePalms }));
    }

  }, [])

  return (
    <SafeAreaView className="pt-10 flex-1 justify-between">
      <LinearGradient
        colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
        style={{
          borderRadius: dimensions.width * 0.1,
          width: '90%',
          height: '70%',
          alignSelf: 'center',
          position: 'relative',
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.25, 0.5, 0.75, 1]}
      >
        <View style={{
          borderRadius: dimensions.width * 0.1,
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          alignItems: 'center',
          flex: 1,
        }}>

          <Text style={{
            paddingTop: 25,
            paddingHorizontal: 30,
            fontFamily: fontAbhayaSemiBold,
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: 19,
            fontSize: dimensions.width * 0.07,
            color: '#FCD997',
          }}
          >
            You didn’t win this time, but cheer up! Here’s a lovely spot for a picnic at Mindil Beach.
          </Text>

          <View className='flex-row px-3 items-center text-center justify-center bg-[#F8D592] p-4 rounded-3xl'>

            <Text className="text-black text-2xl font-bold pr-1 px-3 text-center">{gamePalms}</Text>
            <Image
              source={require("../assets/icons/palmIconMindil.png")}
              className="h-8 w-8"
              resizeMode='contain'
            />
          </View>

          <TouchableOpacity onPress={() => { handleShowText(); setTextModalVisible(true) }} style={{ position: 'absolute', bottom: 10, width: '90%' }}>

            <View className='flex-row px-1 items-center text-center justify-center bg-[#F8D592] p-4 rounded-full'>
              <Text className="text-black text-2xl font-bold pr-1 text-center" style={{ fontFamily: fontAbhayaSemiBold }}>View</Text>
            </View>
          </TouchableOpacity>

        </View>

      </LinearGradient>



      <View className="mb-10 " style={{ marginBottom: 100 }}>

        <TouchableOpacity onPress={() => { selectedQuestMode === 'EasyBreezyScreen' ? setActiveScreenTab('EasyBreezyScreen') : setActiveScreenTab(`BeachMasterScreen`) }}>
          <LinearGradient
            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
            locations={[0, 0.1, 0.5, 0.9, 1]}
            style={{
              borderRadius: 30,
              width: '100%',
              marginBottom: 20

            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}

          >
            <Text
              className="text-customBg font-semibold text-center"
              style={
                {
                  fontFamily: fontAbhayaSemiBold,
                  paddingVertical: 14,
                  fontSize: dimensions.width < 400 ? dimensions.width * 0.07 : dimensions.width * 0.07,
                  color: '#161616',
                  textAlign: 'center',

                }}
            >
              Try Again
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal visible={textModalVisible} transparent={true} animationType="fade">
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
              height: '80%',
              marginVertical: 200, //?
              alignSelf: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1  items-center shadow-xl mx-3"
          >
            <TouchableOpacity onPress={() => { setTextModalVisible(false); }}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 50 }}
            >
              <View >
                <XMarkIcon size={30} color='#FCD997' />
              </View>
            </TouchableOpacity>
            <View className="px-4 rounded-3xl items-center shadow-lg" >
              <View className="flex" style={{ height: '80%', top: 10 }}>
                <Text style={{
                  paddingBottom: 5,
                  fontFamily: fontAbhayaSemiBold,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: 19,
                  fontSize: dimensions.width * 0.07,
                  color: '#FCD997',
                }}
                >{looseTexts[textId].textTitle}</Text>

                <Text style={{
                  fontFamily: fontIterBold,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: 19,
                  fontSize: dimensions.width * 0.04,
                  color: 'white',
                }}
                >{looseTexts[textId].looseText}</Text>

              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView>
  );

};

export default LooseScreen;
