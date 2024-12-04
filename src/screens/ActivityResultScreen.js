import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { updateUserData, saveUserData } from '../redux/userSlice';

const articlesOfResults = [
  {
    id: 1,
    activityType: 'Surfing',
    articleText: 'Surfing at Mindil Beach promises an unforgettable experience against the backdrop of stunning Australian landscapes. But before you head out to conquer the waves, it’s important to assess their height and strength—conditions can vary depending on the weather. For beginners, gentle waves are ideal, while more experienced surfers can test their skills during the tides. Remember to prioritize safety: always attach the leash to your ankle so your board doesn’t float away. Choose a spot away from other surfers to avoid collisions, and always keep in mind that maintaining balance is easier when you slightly bend your knees. The best time to catch waves is in the morning or evening when the sun is not as intense, and the scenery is particularly beautiful.',
  },
  {
    id: 2,
    activityType: 'Yoga Classes',
    articleText: 'Practicing yoga on the beach is a unique experience, especially at Mindil Beach. Morning yoga sessions here can be a true reset, filling you with energy and harmony for the entire day. Choose a cozy spot in the shade and lay out your mat to avoid slipping on the sand. Start with breathing exercises to tune into a calm and meditative rhythm surrounded by the sounds of nature. Poses like Child’s Pose and Downward Dog are perfect for relaxation and stretching. To finish, lie in Savasana, immersing yourself in the sounds of the sea and the breeze. Practicing yoga in the sun requires hydration, so don’t forget your water bottle and try to practice during the morning or evening for comfort.',
  },
  {
    id: 3,
    activityType: 'Camping',
    articleText: 'Nothing compares to an overnight stay at Mindil Beach, where day turns to evening and the sky is filled with stars. Set up your tent a bit farther from the water to avoid being caught off guard by the tide, and choose a sturdy tent that will protect you from wind and sand. If you plan to cook over a fire, bring some charcoal and water for extinguishing, while following safety regulations. Don’t forget insect repellent and tent window screens to keep mosquitoes at bay. A flashlight or headlamp will be your helper during the night, and a tarp can create a cozy shelter from sudden weather changes. Enjoy the wild beach atmosphere, but always clean up after yourself to keep this place pristine.',
  },
  {
    id: 4,
    activityType: 'Fishing',
    articleText: 'Fishing at Mindil Beach is a great way to spend the day with a fishing rod, enjoying the tranquility while trying to catch something interesting. Equip yourself with fishing gear suitable for saltwater fishing and make sure you have the right bait to attract local fish. Choose a spot on the shore with stable access to the water and avoid fishing on slippery rocks to minimize risk. It’s best to fish in calm weather, avoiding strong tides and waves. After a successful catch, don’t forget a container or ice to keep the fish fresh. Respect nature: if you don’t plan to keep the fish, release it to help preserve the beach’s ecosystem.',
  },
  {
    id: 5,
    activityType: 'Diving and snorkeling',
    articleText: 'Diving and snorkeling at Mindil Beach offer a unique opportunity to explore the underwater world. To immerse yourself in this aquatic beauty, it’s essential to choose the right gear. For snorkeling, ensure you have a mask, snorkel, and fins. This will allow you to swim comfortably and admire vibrant corals and exotic fish without diving too deep. If you want to try diving, make sure you have a scuba tank and receive proper training if you’re a beginner. The best times for snorkeling are in the morning when the water is calmer and visibility is better. Always follow safety rules: don’t swim too far from the shore and never dive alone. Explore the beauty of marine life without touching the corals and fish to preserve the ecosystem.',
  }
]

const fontIterBold = 'Inter_18pt-Bold';
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';

const ActivityResultScreen = ({ activeScreenTab, setActiveScreenTab, activityTestResult, setActivityTestResult, selectedActivity, setSelectedActivity }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const gamePalms = useSelector(state => state.user.gamePalms);
  const palms = useSelector(state => state.user.palms);
  const dispatch = useDispatch();

  const [isArticleVisible, setIsArticleVisible] = useState(false);

  const textOfArticle = articlesOfResults.find(res => res.activityType === selectedActivity).articleText;

  useEffect(() => {
    if (gamePalms) {
      if (palms) {

        dispatch(updateUserData({ palms: palms + gamePalms }));
        dispatch(saveUserData({ palms: palms + gamePalms }));
      } else {
        dispatch(updateUserData({ palms: gamePalms }));
        dispatch(saveUserData({ palms: gamePalms }));
      }
    }
  }, [])


  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LinearGradient
        colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
        style={{
          borderRadius: dimensions.width * 0.1,
          width: '90%',
          height: isArticleVisible ? '80%' : '65%',
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
          position: 'relative',
        }}>
          {!isArticleVisible && (
            <View>

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
                Fantastic! You’ve reached a new level of exploration at Mindil Beach!
              </Text>

              <View className='flex-row px-3 items-center text-center justify-center bg-[#F8D592] p-4 rounded-3xl' style={{ alignSelf: 'center' }}>

                <Text className="text-black text-2xl font-bold pr-1 px-3 text-center">{gamePalms}</Text>
                <Image
                  source={require("../assets/icons/palmIconMindil.png")}
                  className="h-8 w-8"
                  resizeMode='contain'
                />
              </View>
            </View>
          )}

          {isArticleVisible && (
            <ScrollView>
              <Text style={{
                paddingTop: 25,
                paddingHorizontal: 30,
                fontFamily: fontIterBold,
                fontWeight: 700,
                textAlign: 'left',
                marginBottom: 19,
                fontSize: dimensions.width * 0.04,
                color: 'white',
              }}
              >
                {textOfArticle}
              </Text>

            </ScrollView>

          )}

        </View>

      </LinearGradient>

      <TouchableOpacity onPress={() => {
        if (isArticleVisible) {
          setSelectedActivity('')
          setActiveScreenTab("Activity")
          setIsArticleVisible(false);
        }
        setIsArticleVisible(true)
      }}
        style={{ position: 'absolute', bottom: -14, width: '90%' }}
      >

        <LinearGradient
          colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
          locations={[0, 0.1, 0.5, 0.9, 1]}
          style={{
            borderRadius: 30,
            width: '100%',


          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}

        >
          <Text
            className="text-customBg font-semibold text-center"
            style={{
              fontFamily: fontAbhayaSemiBold,
              paddingVertical: 14,
              fontSize: dimensions.width < 400 ? dimensions.width * 0.07 : dimensions.width * 0.07,
              color: '#161616',
              textAlign: 'center',
            }}
          >
            {isArticleVisible ? 'Categories' : 'Read'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default ActivityResultScreen