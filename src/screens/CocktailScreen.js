import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView, Animated, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import { ChevronDownIcon, ChevronUpIcon } from 'react-native-heroicons/outline';
import { is } from 'date-fns/locale';
import { set } from 'date-fns';

const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
const fontIterBold = 'Inter_18pt-Bold';

const reciepes = {
    'Tropical Breeze': {
        image: require('../assets/images/cocktailsImages/TropicalBreezeImageMindil.png'),
        coctailArticleTitle: 'Promenade and Evening Markets',
        coctailArticle: 'Mindil Beach is famous for its evening markets, which take place on Thursdays and Sundays. It’s the perfect place to soak in the atmosphere, try a variety of street foods, purchase handmade items from local artists and artisans, and enjoy live music. The promenade along the beach offers stunning sunset views, creating a romantic ambiance. The local markets attract both tourists and residents, making them a cultural hub of Darwin.',
        reciepe: '1. In a shaker, mix pineapple juice, coconut milk, and lemon juice.\n2.	Add ice and shake well.\n3.	Strain into a cocktail glass and garnish with mint.\n4.	Serve with a straw.',
        ingridients: [
            {
                id: 1,
                title: 'Pineapple',
                order: 1,
                image: require('../assets/images/cocktailsImages/pineappleImageMindil.png'),
            },
            {
                id: 2,
                title: 'Coconut',
                order: 2,
                image: require('../assets/images/cocktailsImages/coconutImageMindil.png'),
            },
            {
                id: 3,
                title: 'Lemon',
                order: 3,
                image: require('../assets/images/cocktailsImages/lemonImgeMindil.png'),
            },
            {
                id: 4,
                title: 'Mint',
                order: 4,
                image: require('../assets/images/cocktailsImages/leavesImegeMindil.png'),
            },
        ],

    },
    'Summer Splash': {
        image: require('../assets/images/cocktailsImages/SummerSplashImageMindil.png'),
        coctailArticleTitle: 'Unique Marine Life',
        coctailArticle: 'The waters around Mindil Beach are home to a variety of unique marine creatures, including dolphins, sea turtles, and numerous fish species. During snorkeling and diving, you can encounter these amazing beings in their natural habitat. Local ecologists and conservationists are actively working to preserve the marine ecosystem, and tourists can learn about the importance of protecting these species through special tours and educational programs. This is not only an exciting but also an educational adventure that helps raise awareness about environmental conservation.',
        reciepe: 'In a glass, pour pomegranate juice and orange juice.\n2.	Add ice and stir gently.\n3.	Top with sparkling water to taste.\n4.	Garnish with an orange slice and serve.',
        ingridients: [
            {
                id: 5,
                title: 'Pomegranate',
                order: 1,
                image: require('../assets/images/cocktailsImages/PomegranateImageMindil.png'),
            },
            {
                id: 6,
                title: 'Orange',
                order: 2,
                image: require('../assets/images/cocktailsImages/OrangeImageMindil.png'),
            },
            {
                id: 7,
                title: 'Sparkling water',
                order: 3,
                image: require('../assets/images/cocktailsImages/SparklingWaterImageMindil.png'),
            },
            {
                id: 8,
                title: 'Orange (slices)',
                order: 4,
                image: require('../assets/images/cocktailsImages/OrangeSlicesImageMindil.png'),
            },
        ],
    },
    'Strawberry Fresh': {
        image: require('../assets/images/cocktailsImages/StrawberryFreshImageMindil.png'),
        coctailArticleTitle: 'Fish Markets and Local Cuisine',
        coctailArticle: 'Mindil Beach is not only a place for active recreation but also a cultural center for local gastronomy. The beach regularly hosts fish markets and culinary festivals where visitors can taste freshly caught fish and seafood, as well as local delicacies. These events provide a unique opportunity for visitors to enjoy not only delicious food but also the festive atmosphere, interact with locals, and explore Australian cuisine. Local chefs and culinary experts showcase their skills by preparing dishes right before the audience, filling the market with the aromas of freshly cooked meals. It’s a great way to learn about the region’s culinary traditions and enjoy the atmosphere of friendliness and unity that characterizes Mindil Beach.',
        reciepe: '1.	Blend strawberries with lemon juice and sugar until smooth.\n2.	 Add water or sparkling water and mix.\n3.	Strain through a sieve into a glass with ice.\n4.	Garnish with a few strawberries.',
        ingridients: [
            {
                id: 9,
                title: 'Strawberry',
                order: 1,
                image: require('../assets/images/cocktailsImages/StrawberryImageMindil.png'),
            },
            {
                id: 10,
                title: 'Lemon',
                order: 2,
                image: require('../assets/images/cocktailsImages/lemonImgeMindil.png'),
            },
            {
                id: 11,
                title: 'Sugar',
                order: 3,
                image: require('../assets/images/cocktailsImages/SugarImageMindil.png'),
            },
            {
                id: 12,
                title: 'Water',
                order: 4,
                image: require('../assets/images/cocktailsImages/CupOfWateImageMindil.png'),
            },
        ],
    },
    'Mint Lemonade': {
        image: require('../assets/images/cocktailsImages/MintLemonadeImageMindil.png'),
        coctailArticleTitle: 'Sand Festivals',
        coctailArticle: 'Mindil Beach hosts a variety of events and festivals, including the “Sand Sculpture Day.” At this event, professional sculptors create impressive works of art from sand, astonishing spectators with their detail and creativity. This event attracts people of all ages and becomes a true celebration of creativity, inspiration, and fun. Every year, the beach transforms into a giant art gallery where sand becomes the canvas for creative ideas.',
        reciepe: '1.	In a shaker, mix lemon juice and sugar until fully dissolved.\n2.	Add ice and shake well.\n3.	Strain into a glass with ice and top with sparkling water.\n4.	Garnish with mint leaves and serve with a straw.',
        ingridients: [
            {
                id: 13,
                title: 'Lemon',
                order: 1,
                image: require('../assets/images/cocktailsImages/lemonImgeMindil.png'),

            },
            {
                id: 14,
                title: 'Sugar',
                order: 1,
                image: require('../assets/images/cocktailsImages/SugarImageMindil.png'),

            },
            {
                id: 15,
                title: 'Sparkling water',
                order: 1,
                image: require('../assets/images/cocktailsImages/SparklingWaterImageMindil.png'),

            },
            {
                id: 16,
                title: 'Mint',
                order: 1,
                image: require('../assets/images/cocktailsImages/MintImageMindil.png'),

            },

        ],
    },
    'Cucumber Cooler': {
        image: require('../assets/images/cocktailsImages/CucumberCoolerImageMindil.png'),
        coctailArticleTitle: 'Unique Ecosystem',
        coctailArticle: 'The beach is surrounded by mangrove forests, which are home to a variety of wildlife, including birds, reptiles, and marine creatures. This ecosystem plays a vital role in maintaining the region’s biodiversity. Exploring the mangrove forests offers the opportunity to learn about the life within these unique ecosystems and the importance of their conservation for future generations. Strolling through these natural corners will provide unforgettable experiences and allow you to see wildlife in its natural habitat.',
        reciepe: '1.	Squeeze the juice from the cucumber.\n2.	In a shaker, mix cucumber juice and lime juice with sugar.\n3.	Add ice and shake well.\n4.	Strain into a glass with ice and top with water or sparkling water.\n5.	Garnish with a cucumber slice.',
        ingridients: [
            {
                id: 17,
                title: 'Cucumber',
                order: 1,
                image: require('../assets/images/cocktailsImages/CucumberImageMindil.png'),

            },
            {
                id: 18,
                title: 'Lime',
                order: 1,
                image: require('../assets/images/cocktailsImages/LimeImageMindil.png'),

            },
            {
                id: 19,
                title: 'Sugar',
                order: 1,
                image: require('../assets/images/cocktailsImages/SugarImageMindil.png'),

            },
            {
                id: 20,
                title: 'Water',
                order: 1,
                image: require('../assets/images/cocktailsImages/CupOfWateImageMindil.png'),

            },

        ],
    },
    'Berry Superfood': {
        image: require('../assets/images/cocktailsImages/BerrySuperfoodImageMindil.png'),
        coctailArticleTitle: 'Cultural Significance',
        coctailArticle: 'Mindil Beach holds deep cultural significance for the local Aboriginal people, and events dedicated to their culture and traditions are regularly held here. This is an opportunity for visitors to learn more about the rich heritage of Australia’s Indigenous peoples, their art, rituals, and way of life. Such events create a bridge between cultures and promote respect and understanding among residents and guests. It is not only an interesting experience but also a chance to contribute to the preservation of unique traditions and history.',
        reciepe: '1.	In a blender, mix berries, yogurt, and honey.\n2.	Add milk and blend until smooth.\n3.	Pour into a glass and add ice if desired.\n4.	Garnish with berries and serve with a straw.',
        ingridients: [
            {
                id: 21,
                title: 'Berries',
                order: 1,
                image: require('../assets/images/cocktailsImages/BerriesImageMindil.png'),

            },
            {
                id: 22,
                title: 'Yogurt',
                order: 1,
                image: require('../assets/images/cocktailsImages/YogurtImageMindil.png'),

            },
            {
                id: 23,
                title: 'Honey',
                order: 1,
                image: require('../assets/images/cocktailsImages/MilkImageMindil.png'),

            },
            {
                id: 24,
                title: 'Milk',
                order: 1,
                image: require('../assets/images/cocktailsImages/BerriesImageMindil.png'),

            },

        ],
    },



}



const CocktailScreen = ({ setActiveScreenTab, activityTestResult, setActivityTestResult }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isCocktailStarted, setIsCocktailStarted] = useState(false);

    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const gamePalms = useSelector(state => state.user.gamePalms);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [selectedCocktail, setSelectedCocktail] = useState('');
    const [isRewardVisible, setIsRewardVisible] = useState(false);
    const [isReciepeVisible, setIsReciepeVisible] = useState(false);


    const coctailObject = reciepes[selectedCocktail];

    const dispatch = useDispatch();

    useEffect(() => {
        if (coctailObject) {

            console.log('coctailObject title', coctailObject?.title);
            console.log('gamePalms', gamePalms);
        }
    }, [coctailObject, gamePalms]);

    return (
        <SafeAreaView style={{ width: '100%', flex: 1 }}>
            {!isCocktailStarted ? (
                <View >
                    {selectedCocktail !== '' && (
                        <TouchableOpacity onPress={() => setIsReciepeVisible(true)}>
                            <LinearGradient
                                colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                style={{
                                    borderRadius: 25,
                                    width: '95%',
                                    alignSelf: 'center',
                                    opacity: isReciepeVisible ? 0 : 1,
                                }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.25, 0.5, 0.75, 1]}
                            >
                                <View className="flex-row justify-between px-5 py-3 items-center" >
                                    <Text></Text>
                                    <Text style={{
                                        fontFamily: fontAbhayaSemiBold,
                                        fontWeight: 700,
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        fontSize: dimensions.width * 0.07,
                                        color: 'black',
                                        paddingHorizontal: 10,
                                        marginLeft: dimensions.width * 0.05,
                                    }}
                                    >Reciepe</Text>

                                    <ChevronDownIcon size={30} color='black' />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                    <Text
                        style={{
                            paddingTop: 16,
                            fontFamily: fontAbhayaSemiBold,
                            fontWeight: 700,
                            marginHorizontal: 20,
                            lineHeight: dimensions.width * 0.1,
                            fontSize: dimensions.width * 0.08,
                            color: '#FCD997',
                            textAlign: 'center',
                            textShadowColor: '#000',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 1,
                        }}
                    >{selectedCocktail !== '' ? `${selectedCocktail}` : '​Select the cocktail you are interested in!'}</Text>

                    {selectedCocktail === '' && (

                        <View className="flex-col justify-between" style={{ marginTop: '10%' }}>
                            {['Tropical Breeze', 'Summer Splash', 'Strawberry Fresh', 'Mint Lemonade', 'Cucumber Cooler', 'Berry Superfood'].map((activity) => (
                                <TouchableOpacity
                                    key={activity}
                                    style={{ width: '90%', paddingBottom: dimensions.width * 0.04, alignSelf: 'center', }}
                                    onPress={() => {
                                        setSelectedCocktail(activity);
                                    }}>
                                    <LinearGradient
                                        colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                        style={{
                                            width: '100%',
                                            borderRadius: 25,
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
                                                fontSize: dimensions.width * 0.05,
                                                color: 'black',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {activity}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {selectedCocktail !== '' && (
                        <View>
                            <LinearGradient
                                colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                                style={{
                                    borderRadius: dimensions.width * 0.1,
                                    width: '90%',
                                    height: dimensions.width < 380 ? '51%' : '53%',

                                    alignSelf: 'center',
                                }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.25, 0.5, 0.75, 1]}
                            >
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 5, justifyContent: 'space-between', paddingHorizontal: dimensions.width * 0.05 }}>
                                        {coctailObject.ingridients.map((coctail, index) => (
                                            <View key={coctail.id} style={{ width: '48%', alignItems: 'center', justifyContent: 'center', }}>
                                                <View className="py-1 mt-2">
                                                    <Image source={coctail.image}
                                                        style={{
                                                            width: dimensions.width < 380 ? dimensions.width * 0.3 : dimensions.width * 0.35,
                                                            height: dimensions.width < 380 ? dimensions.width * 0.3 : dimensions.width * 0.35,
                                                        }} />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </LinearGradient>

                            <View >
                                <Image source={require('../assets/icons/coctailIconMindil.png')} style={{ width: dimensions.width < 380 ? dimensions.width * 0.3 : dimensions.width * 0.39, height: dimensions.width < 380 ? dimensions.width * 0.3 : dimensions.width * 0.39, alignSelf: 'center' }} />
                            </View>



                            <TouchableOpacity onPress={() => setIsCocktailStarted(true)} style={{ marginTop: 10, width: '95%', alignSelf: 'center' }}>
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
                                        Create a cocktil
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View >
                    )}

                </View>
            ) : (
                <View style={{ width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <LinearGradient
                        colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                        style={{
                            borderRadius: dimensions.width * 0.1,
                            width: !isRewardVisible ? '88%' : '95%',
                            height: !isRewardVisible ? '55%' : '70%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.25, 0.5, 0.75, 1]}
                    >
                        {!isRewardVisible && (
                            <Image source={coctailObject.image} style={{ width: dimensions.width * 0.6, height: dimensions.width * 0.6, borderRadius: dimensions.width * 0.1 }} />
                        )}
                        {isRewardVisible && (
                            <View>
                                <Text
                                    style={{
                                        fontFamily: fontAbhayaSemiBold,
                                        paddingVertical: 14,
                                        fontSize: dimensions.width * 0.07,
                                        color: '#FCD997',
                                        textAlign: 'center',
                                    }}
                                >
                                    {coctailObject.coctailArticleTitle}
                                </Text>

                                <ScrollView>
                                    <Text
                                        style={{
                                            fontFamily: fontIterBold,
                                            paddingVertical: 14,
                                            fontSize: dimensions.width * 0.04,
                                            color: 'white',
                                            textAlign: 'left',
                                            paddingHorizontal: dimensions.width * 0.05,
                                            fontWeight: '700',
                                        }}
                                    >
                                        {coctailObject.coctailArticle}
                                    </Text>
                                </ScrollView>
                            </View>
                        )}
                    </LinearGradient>

                    <TouchableOpacity onPress={() => {
                        if (!isRewardVisible) {
                            setIsRewardVisible(true);
                        } else {
                            setIsCocktailStarted(false);
                            setSelectedCocktail('');
                            setActiveScreenTab('Cocktail');
                            setIsRewardVisible(false);

                        }
                    }} style={{ marginTop: 50, width: '95%', alignSelf: 'center' }}>
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
                                {!isRewardVisible ? 'Get reward' : 'Craft a new cocktail'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>


                </View>
            )}
            <Modal
                visible={isReciepeVisible}
                transparent={true}
                animationType="fade"
                onPress={() => setIsReciepeVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 0,
                    alignSelf: 'center',
                    width: '100%',
                    height: '100%',
                }}>
                    <LinearGradient
                        colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                        locations={[0, 0.1, 0.5, 0.9, 1]}
                        style={{
                            borderRadius: 37,
                            width: '95%',
                            justifyContent: 'center',
                            height: '30%',
                            alignSelf: 'center',
                            alignItems: 'center',

                            position: 'absolute',
                            top: '7%',

                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="flex-1 items-center shadow-xl mx-3"
                    >
                        <TouchableOpacity onPress={() => setIsReciepeVisible(false)}
                            style={{ position: 'absolute', top: 0, marginTop: '3%', zIndex: 50, width: '100%' }}
                        >
                            <View className='flex-row justify-between'>
                                <View></View>
                                <View></View>
                                <View style={{marginRight: '5%'}}>
                                    <ChevronUpIcon size={30} color='black' />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 300, padding: 20, backgroundColor: 'transparent', borderRadius: 10 }}>
                                <Text style={{
                                    paddingBottom: 5,
                                    fontFamily: fontAbhayaSemiBold,
                                    fontWeight: 700,
                                    textAlign: 'left',
                                    marginBottom: 19,
                                    fontSize: dimensions.width * 0.04,
                                    color: 'black',
                                }}>
                                    {coctailObject?.reciepe}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default CocktailScreen