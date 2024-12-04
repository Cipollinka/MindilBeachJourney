import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, SafeAreaView, Modal, ScrollView, Linking, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';

const easyBreezyStories = [
  {
    id: 1,
    textTitle: 'Sandy Shore',
    winText: 'Mindil Beach, located on the picturesque northern coast of Australia, is not only one of Darwin’s natural gems but also a place rich in cultural and historical heritage. Its history begins with the Indigenous peoples, such as the Larrakia, who considered these lands sacred and used them for various rituals, hunting, and gathering food. The beach served as a meeting place for tribes, where they exchanged resources and experiences, as well as held cultural events. With the arrival of European settlers in 1869, when the city of Darwin was founded, Mindil Beach began to undergo changes. Initially, Europeans did not value the local culture, but over time they began to recognize the importance of this place. In the 20th century, with the growth of tourism, the beach became known as a popular recreational area. In the 1980s, the Sunset Market was established, attracting both locals and tourists. Today, Mindil Beach is not just a beach but a cultural center that reflects the rich heritage and diversity of cultures coexisting in this region.',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil1.png'),
  },
  {
    id: 2,
    textTitle: 'Park Area Near the Beach',
    winText: 'This green area, located close to the beach, offers shady spots for relaxation and picnics. There are tables and benches available, making it a convenient place for outdoor dining.',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil2.png'),
  },
  {
    id: 3,
    textTitle: 'Children’s Play Area',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil3.png'),
    winText: 'This area features playgrounds for kids to play while adults enjoy their picnic. It’s an excellent spot for families with children.'
  },
  {
    id: 4,
    textTitle: 'Viewing Platform',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil4.png'),
    winText: 'The viewing platform offers stunning views of the ocean and sunsets. Set up your picnic here to enjoy the scenery and capture beautiful photos.'
  },
  {
    id: 5,
    textTitle: 'Along the Bike Paths',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil5.png'),
    winText: 'Set up your picnic along one of the bike paths at Mindil Beach, where you can watch cyclists and runners. This is an ideal place for active relaxation, combining a picnic with physical activity.'
  },
  {
    id: 6,
    textTitle: 'Shady Spots Under Palm Trees',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil6.png'),
    winText: 'Mindil Beach is home to many palm trees that provide natural shade. These spots are perfect for a hot day, allowing you to avoid overheating.'
  },
  {
    id: 7,
    textTitle: 'Picnic Shelters',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil7.png'),
    winText: ' In some nearby areas, you can find shelters with tables and benches. This is a great option if you want a protected spot for your picnic from the sun and wind.'
  },
  {
    id: 8,
    textTitle: 'Near the Mindil Beach Market',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil8.png'),
    winText: 'If you want to spice up your picnic, you can grab food from the Mindil Beach market and set up on the beach while enjoying the sunsets and atmosphere.'
  },
  {
    id: 9,
    textTitle: 'By Surfing Viewpoints',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil9.png'),
    winText: 'These spots are not only great for surfing but also offer fantastic views. Enjoying a picnic here allows you to witness exciting surfing moments.'
  },
  {
    id: 10,
    textTitle: 'Near Cultural Event Areas',
    image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil10.png'),
    winText: 'Occasionally, various cultural events and concerts take place at Mindil Beach. Organize your picnic during these times to enjoy the festive atmosphere and entertainment.'
  },

];

const BeachMasterScreenArticles = [
  {
    id: 1,
    textTitle: 'Mindil Beach',
    winText: 'Mindil Beach is a must-visit destination in Darwin, renowned for its stunning sunsets and vibrant Sunset Market. Located just a short distance from the city center, the beach offers breathtaking views of the sun dipping below the horizon, attracting both locals and tourists alike. The Mindil Beach Sunset Market, held every Thursday and Sunday during the dry season, features an array of food stalls offering international cuisines, handmade crafts, and live entertainment. Visitors can indulge in a variety of dishes, from Asian street food to traditional Australian fare while enjoying performances from local musicians and artists. The atmosphere is lively and festive, making it a perfect spot for families and friends to gather. Beyond its market, Mindil Beach is also an ideal place to relax, sunbathe, and enjoy water activities like swimming and paddleboarding.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil1.png'),
    mapLink: 'https://maps.apple.com/?address=Mindil%20Beach,%20The%20Gardens%20NT%200820,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.445257,130.830908&q=Mindil%20Beach',
  },
  {
    id: 2,
    textTitle: 'Darwin Military Museum',
    winText: 'The Darwin Military Museum is a significant historical site that delves into the city’s role during World War II. Located at East Point, the museum features a comprehensive collection of artifacts, military equipment, and documents detailing the impact of the war on Darwin. Visitors can explore the museum’s exhibits, which include personal stories of those who lived through the bombings by Japanese forces, as well as displays of vintage military vehicles and weaponry. The museum’s centerpiece is the outdoor exhibit featuring a range of artillery and aircraft, providing a tangible connection to the past. Through informative displays and guided tours, the Darwin Military Museum serves as an important reminder of the resilience of the community during one of the most challenging times in its history.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil2.png'),
    mapLink: 'https://maps.apple.com/?address=12%20de%20Octubre%20130,%20%D0%A7%D1%96%D2%91%D0%B2%D0%B0%D0%B9%D0%B0%D0%BD%D1%82%D0%B5,%20%D0%A7%D0%B8%D0%BB%D1%96&ll=-36.913551,-73.024666&q=12%20de%20Octubre%20130',
  },
  {
    id: 3,
    textTitle: 'George Brown Darwin Botanic Gardens',
    winText: 'The George Brown Darwin Botanic Gardens are a lush oasis located just a few minutes from the city center, showcasing a diverse array of tropical and native plants. Established in 1886, these gardens offer visitors a unique opportunity to experience the rich flora of Northern Australia. The gardens are organized into distinct zones, featuring collections of orchids, mangrove trees, and savanna plants, making it an educational and tranquil retreat. Walking trails wind through the gardens, allowing visitors to immerse themselves in nature while observing local wildlife, including various bird species. The gardens also host events and programs that promote environmental awareness and conservation, making it a vibrant community hub that celebrates the beauty of Australia’s natural heritage.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil3.png'),
    mapLink: 'https://maps.apple.com/?address=George%20Brown%20Darwin%20Botanic%20Gardens,%20200%20Gilruth%20Ave,%20The%20Gardens%20NT%200820,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.444792,130.836660&q=George%20Brown%20Darwin%20Botanic%20Gardens',
  },
  {
    id: 4,
    textTitle: 'Kakadu National Park',
    winText: 'Kakadu National Park, although a bit of a drive from Darwin, is Australia’s largest national park and a UNESCO World Heritage site renowned for its incredible biodiversity and cultural significance. Spanning nearly 20,000 square kilometers, Kakadu is home to stunning landscapes, including wetlands, waterfalls, and ancient rock art sites that date back thousands of years. Visitors can explore the park through guided tours or self-drive adventures, with highlights such as the breathtaking Jim Jim Falls and the serene Yellow Water Billabong, where one can spot diverse wildlife, including saltwater crocodiles and various bird species. The park is rich in Aboriginal culture, with interpretive signs and guided tours that explain the significance of the land to the traditional owners. Kakadu offers a unique opportunity to connect with nature and learn about Australia’s Indigenous heritage.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil4.png'),
    mapLink: 'https://maps.apple.com/?address=Kakadu%20National%20Park,%20%D0%9A%D0%B0%D0%BA%D0%B0%D0%B4%D1%83%20NT%200822,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-13.092293,132.393766&q=Kakadu%20National%20Park',
  },
  {
    id: 5,
    textTitle: 'Darwin Waterfront Precinct',
    winText: 'The Darwin Waterfront Precinct is a lively area that combines recreation, dining, and leisure along the picturesque waterfront. Featuring a large lagoon, restaurants, and shops, it provides a safe and enjoyable environment for swimming and relaxation all year round. Families can enjoy the sandy beach and the nearby wave pool, while restaurants offer a variety of dining options, from casual cafes to fine dining. The precinct also hosts events and festivals throughout the year, attracting both locals and tourists. Visitors can enjoy a stroll along the promenade, take in views of the harbor, and partake in various activities such as kayaking and fishing. The Darwin Waterfront Precinct is a vibrant community hub that embodies the laid-back lifestyle of the Top End.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil5.png'),
    mapLink: 'https://maps.apple.com/?address=7%20Kitchener%20Dr,%20%D0%94%D0%B0%D1%80%D0%B2%D1%96%D0%BD%20NT%200800,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.467321,130.846752&q=7%20Kitchener%20Dr',
  },
  {
    id: 6,
    textTitle: 'Fannie Bay Gaol',
    winText: 'Fannie Bay Gaol, operational from 1883 until 1979, is a historic site that offers insight into the penal history of the Northern Territory. Now a museum, the gaol provides a glimpse into the lives of those who were incarcerated and the conditions they endured. Visitors can explore the original buildings, including the watchtower and cells, while guided tours share stories of infamous inmates and significant events in the gaol’s history. The museum highlights the evolution of the justice system in the Northern Territory and serves as a poignant reminder of the past. Fannie Bay Gaol is not only a fascinating historical site but also an important part of Darwin’s cultural heritage.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil6.png'),
    mapLink: 'https://maps.apple.com/?address=Fannie%20Bay%20Gaol,%2082%20East%20Point%20Rd,%20Fannie%20Bay%20NT%200820,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.425891,130.836162&q=Fannie%20Bay%20Gaol',
  },
  {
    id: 7,
    textTitle: 'Australian Aviation Heritage Centre',
    winText: 'The Australian Aviation Heritage Centre is a must-visit for aviation enthusiasts and history buffs alike. Located in the northern suburbs of Darwin, the center showcases a remarkable collection of historic aircraft and aviation memorabilia, including the iconic B-52 bomber, which was once part of the U.S. Air Force. The museum offers engaging exhibits that detail the history of aviation in Australia, with a focus on the Northern Territory’s strategic role during World War II. Visitors can see various aircraft, including military planes and civilian models, while learning about the evolution of aviation technology. The center’s knowledgeable staff often provide guided tours, sharing fascinating stories about the planes and their significance in Australian history.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil7.png'),
    mapLink: 'https://maps.apple.com/?address=Darwin%20Aviation%20Museum,%20Winnellie%20NT%200820,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.425418,130.895628&q=Darwin%20Aviation%20Museum',
  },
  {
    id: 8,
    textTitle: 'Larrakia Cultural Centre',
    winText: 'The Larrakia Cultural Centre serves as a vital link to the culture and traditions of the Larrakia people, the traditional custodians of the Darwin region. The center offers visitors a unique opportunity to learn about the history, language, and customs of the Larrakia community through interactive displays and cultural programs. Art exhibitions featuring traditional and contemporary Indigenous artworks are regularly held, showcasing the talent and creativity of local artists. Visitors can also purchase handmade crafts and souvenirs, supporting Indigenous artisans. The center plays an essential role in promoting cultural awareness and understanding, providing a welcoming space for both locals and tourists to engage with the rich heritage of the Larrakia people.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil8.png'),
    mapLink: 'https://maps.apple.com/?address=%D0%9F%D0%BE%D1%80%D1%82%20%D0%94%D0%B0%D1%80%D0%B2%D1%96%D0%BD,%2029%20Stokes%20Hill%20Rd,%20%D0%94%D0%B0%D1%80%D0%B2%D1%96%D0%BD%20NT%200800,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.466991,130.850384&q=%D0%9F%D0%BE%D1%80%D1%82%20%D0%94%D0%B0%D1%80%D0%B2%D1%96%D0%BD',
  },
  {
    id: 9,
    textTitle: 'Crocosaurus Cove',
    winText: 'Crocosaurus Cove is an exciting reptile park located in the heart of Darwin, renowned for having the largest collection of Australian reptiles. Visitors can see saltwater crocodiles, freshwater crocodiles, and a variety of other reptiles, including snakes and turtles. One of the park’s main attractions is the “Cage of Death,” where brave guests can dive into a transparent cage submerged in a crocodile enclosure, providing an exhilarating close-up experience with these incredible creatures. The park also features daily feeding shows and educational presentations, where visitors can learn about the importance of crocodiles in the ecosystem and the conservation efforts in place to protect them. Crocosaurus Cove offers a thrilling and educational experience for families and wildlife enthusiasts alike.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil9.png'),
    mapLink: 'https://maps.apple.com/?address=Crocosaurus%20Cove,%2054%E2%80%9358%20Mitchell%20St,%20%D0%94%D0%B0%D1%80%D0%B2%D1%96%D0%BD%20NT%200800,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-12.462333,130.839162&q=Crocosaurus%20Cove',
  },
  {
    id: 10,
    textTitle: 'Litchfield National Park',
    winText: 'Litchfield National Park is a stunning natural paradise located just a short drive from Darwin, known for its impressive waterfalls, pristine swimming holes, and unique geological features. The park is famous for its picturesque waterfalls, such as Florence Falls, Wangi Falls, and Tolmer Falls, which offer stunning views and refreshing swimming opportunities in natural pools. Visitors can explore the park’s walking trails that wind through lush tropical forests and past striking termite mounds. Litchfield is also home to a variety of wildlife, including wallabies, flying foxes, and an array of bird species. The park is an ideal destination for day trips, offering a perfect blend of adventure, relaxation, and the chance to immerse oneself in the breathtaking landscapes of the Northern Territory.',
    image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil10.png'),
    mapLink: 'https://maps.apple.com/?address=%D0%BD%D0%B0%D1%86%D1%96%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9%20%D0%BF%D0%B0%D1%80%D0%BA%20%D0%9B%D1%96%D1%87%D1%84%D1%96%D0%BB%D0%B4,%20%D0%9B%D1%96%D1%82%D1%87%D1%84%D1%96%D0%BB%D0%B4-%D0%9F%D0%B0%D1%80%D0%BA%20NT%200822,%20%D0%90%D0%B2%D1%81%D1%82%D1%80%D0%B0%D0%BB%D1%96%D1%8F&ll=-13.293548,130.846420&q=%D0%BD%D0%B0%D1%86%D1%96%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9%20%D0%BF%D0%B0%D1%80%D0%BA%20%D0%9B%D1%96%D1%87%D1%84%D1%96%D0%BB%D0%B4',
  },
]

const fontIterBold = 'Inter_18pt-Bold';
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';

const WinScreen = ({ setActiveScreenTab, selectedQuestMode, setSelectedQuestMode, testNumber, setTestNumber }) => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const gamePalms = useSelector(state => state.user.gamePalms);
  const palms = useSelector(state => state.user.palms);
  const dispatch = useDispatch();


  const [isArticleVisible, setIsArticleVisible] = useState(false);

  const [rateModalVisible, setRateModalVisible] = useState(false);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    console.log('selectedQuestMode', selectedQuestMode);
  }, [])

  const handleStarPress = (rate) => {
    setRating(rate);
  };

  useEffect(() => {
    if(palms){

      dispatch(updateUserData({ palms: palms + gamePalms }));
      dispatch(saveUserData({ palms: palms + gamePalms }));
    } else {
      dispatch(updateUserData({ palms:  gamePalms }));
      dispatch(saveUserData({ palms:  gamePalms }));
    }

  }, [])

  const openAppleMap = (mapUrl) => {
    if (mapUrl) {
        Linking.openURL(mapUrl).catch(() => {
            Alert.alert('Error', 'Can`t open maps');
        });
    } else {
        Alert.alert('Error', 'No link provided');
    }
};


  return (
    <SafeAreaView className="pt-10 flex-1 justify-between">

      {isArticleVisible && (
        <View>
          <Image source={selectedQuestMode === 'EasyBreezyScreen' ? easyBreezyStories[testNumber - 1].image : BeachMasterScreenArticles[testNumber - 1].image} style={{ width: '100%', alignSelf: 'center', height: dimensions.height * 0.16, resizeMode: 'stretch', }} className="w-full h-40 rounded-3xl" />
        </View>
      )}

      {!isArticleVisible && (

        <LinearGradient
          colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
          style={{
            borderRadius: dimensions.width * 0.1,
            width: '90%',
            height: '60%',
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
              You’ve revealed an iconic site in Darwin; discover what makes it special!
            </Text>

            <View className='flex-row px-3 items-center text-center justify-center bg-[#F8D592] p-4 rounded-3xl'>

              <Text className="text-black text-2xl font-bold pr-1 px-3 text-center">{gamePalms}</Text>
              <Image
                source={require("../assets/icons/palmIconMindil.png")}
                className="h-8 w-8"
                resizeMode='contain'
              />
            </View>

            <TouchableOpacity onPress={() => {
                setIsArticleVisible(true)}}
                style={{position: 'absolute', bottom: 0, width: '90%'}}
            >

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
                  style={{
                    fontFamily: fontAbhayaSemiBold,
                    paddingVertical: 14,
                    fontSize: dimensions.width < 400 ? dimensions.width * 0.07 : dimensions.width * 0.07,
                    color: '#161616',
                    textAlign: 'center',
                  }}
                >
                  {!isArticleVisible ? 'Learn More' : 'Next'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      )}

      {isArticleVisible && (
        <ScrollView style={{ flex: 1, marginTop: 10, marginBottom: dimensions.width < 380 ? 40 : 0}}>
          <LinearGradient
            colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
            style={{
              borderRadius: dimensions.width * 0.1,
              width: '95%',
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
                {selectedQuestMode === 'EasyBreezyScreen' ? easyBreezyStories[testNumber - 1].textTitle : BeachMasterScreenArticles[testNumber - 1].textTitle}
              </Text>

              <Text style={{
                paddingTop: 25,
                paddingHorizontal: 30,
                fontFamily: fontAbhayaSemiBold,
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: 19,
                fontSize: dimensions.width * 0.05,
                color: 'white',
              }}
              >
                {selectedQuestMode === 'EasyBreezyScreen' ? easyBreezyStories[testNumber - 1].winText : BeachMasterScreenArticles[testNumber - 1].winText}
              </Text>
            </View>

          </LinearGradient>

          <TouchableOpacity onPress={() => { 
            if(selectedQuestMode === 'EasyBreezyScreen') {
              setRating(0); 
              setRateModalVisible(true);
            } else {
                console.log('link:', BeachMasterScreenArticles[testNumber-1]?.mapLink);
                openAppleMap(BeachMasterScreenArticles[testNumber-1]?.mapLink);
            }
          }}>
            <LinearGradient
              colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
              locations={[0, 0.1, 0.5, 0.9, 1]}
              style={{
                borderRadius: 30,
                width: '100%',
                marginBottom: 10

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
                {selectedQuestMode === 'EasyBreezyScreen' ? 'Rate the Article' : 'View on map'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      )}

      <View className="mb-10 " style={{ marginBottom: 10, marginTop: 5, height: '14%' }}>

        <TouchableOpacity onPress={() => {
            setTestNumber(testNumber < 10 ? parseInt(testNumber, 10) + 1 : 1);
            console.log('typeof testNumber', typeof testNumber);
            selectedQuestMode === 'EasyBreezyScreen' ? setActiveScreenTab('EasyBreezyScreen') : setActiveScreenTab('BeachMasterScreen');
        }}>
          <LinearGradient
            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
            locations={[0, 0.1, 0.5, 0.9, 1]}
            style={{
              borderRadius: 30,
              width: '100%',
              marginBottom: 20,
              bottom: dimensions.width < 380 ? 40 : 0,

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
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>





      <Modal
        visible={rateModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRateModalVisible(false)}
      >
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
              marginVertical: 200,
              alignSelf: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1 items-center shadow-xl mx-3"
          >
            <TouchableOpacity onPress={() => setRateModalVisible(false)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 50 }}
            >
              <View>
                <XMarkIcon size={42} color='#FCD997' />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 300, padding: 20, backgroundColor: 'transparent', borderRadius: 10 }}>
                <Text style={{
                  paddingBottom: 5,
                  fontFamily: fontAbhayaSemiBold,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: 19,
                  fontSize: dimensions.width * 0.07,
                  color: '#FCD997',
                }}>
                  Evaluate this article for us.
                </Text>
                <View className='flex-row px-3 items-center text-center justify-center bg-[#F8D592] p-4 rounded-3xl'>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                        <StarIcon style={{ color: rating >= star ? 'red' : 'gray', }} size={dimensions.width * 0.12} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <TouchableOpacity onPress={() => { setRateModalVisible(false) }} style={{ marginTop: 14 }}>
                  <LinearGradient
                    colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                    locations={[0, 0.1, 0.5, 0.9, 1]}
                    style={{
                      borderRadius: 19,
                      width: '80%',
                      alignSelf: 'center',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text
                      className="text-customBg font-semibold text-center"
                      style={{
                        fontFamily: fontAbhayaSemiBold,
                        paddingVertical: 14,
                        fontSize: dimensions.width * 0.05,
                        color: '#161616',
                        textAlign: 'center',
                      }}
                    >
                      Rate now!
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </SafeAreaView >
  );

};


export default WinScreen;
