import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
const fontIterBold = 'Inter_18pt-Bold';

const categories = {
    'Surfing': {
        image: require('../assets/images/activityImages/surfingImageMindil.png'),
        title: 'Surfing',
        parts: [
            {
                id: 1,
                title: 'Surfboard',
                image: require('../assets/images/activityImages/serfingImage1.png'),
            },
            {
                id: 2,
                title: 'Leash',
                image: require('../assets/images/activityImages/serfingImage2.png'),
            },
            {
                id: 3,
                title: 'Wetsuit',
                image: require('../assets/images/activityImages/serfingImage3.png'),
            },
            {
                id: 4,
                title: 'Sunscreen',
                image: require('../assets/images/activityImages/serfingImage4.png'),
            },
        ],
        questions: [
            {
                question: "Surfing is believed to have originated in Hawaii.",
                isCorrect: true,
            },
            {
                question: "You need to be able to swim well before attempting surfing.",
                isCorrect: true,
            },
            {
                question: "Surfboards are all the same size.",
                isCorrect: false,
            },
            {
                question: "You can surf only in oceans.",
                isCorrect: false,
            },
            {
                question: "Longboards are generally easier for beginners.",
                isCorrect: true,
            },
            {
                question: "Wearing a leash is optional for beginners.",
                isCorrect: false,
            },
            {
                question: "The term 'wipeout' means a successful surfing move.",
                isCorrect: false,
            },
            {
                question: "'Duck diving' is a technique to get under waves.",
                isCorrect: true,
            },
            {
                question: "Waves are always the same height.",
                isCorrect: false,
            },
            {
                question: "Sun protection is essential while surfing.",
                isCorrect: true,
            }
        ]
    },
    'Yoga Classes': {
        image: require('../assets/images/activityImages/yogaImageMindil.png'),
        title: 'Yoga Classes',
        parts: [
            {
                id: 5,
                title: 'Yoga Mat',
                image: require('../assets/images/activityImages/yogaImage1.png'),
            },
            {
                id: 6,
                title: 'Comfortable Clothing',
                image: require('../assets/images/activityImages/yogaImage2.png'),
            },
            {
                id: 7,
                title: 'Water',
                image: require('../assets/images/activityImages/yogaImage3.png'),
            },
            {
                id: 8,
                title: 'Towel',
                image: require('../assets/images/activityImages/yogaImage4.png'),
            },
        ],
        questions: [
            {
                question: "Yoga originated in ancient India.",
                isCorrect: true,
            },
            {
                question: "All yoga poses should feel extremely comfortable.",
                isCorrect: false,
            },
            {
                question: "Breathing techniques are a crucial part of yoga practice.",
                isCorrect: true,
            },
            {
                question: "There is only one type of yoga style.",
                isCorrect: false,
            },
            {
                question: "Yoga is only about physical exercise.",
                isCorrect: false,
            },
            {
                question: "Practicing yoga can improve flexibility.",
                isCorrect: true,
            },
            {
                question: "Yoga should always be practiced indoors.",
                isCorrect: false,
            },
            {
                question: "Meditation is often a part of yoga practice.",
                isCorrect: true,
            },
            {
                question: "Props like blocks can help with certain yoga poses.",
                isCorrect: true,
            },
            {
                question: "Yoga is beneficial only for young people.",
                isCorrect: false,
            }
        ]

    },
    'Camping': {
        image: require('../assets/images/activityImages/campingImageMindil.png'),
        title: 'Camping',
        parts: [
            {
                id: 9,
                title: 'Tent or Shelter',
                image: require('../assets/images/activityImages/campingImage1.png'),
            },
            {
                id: 10,
                title: 'Sleeping Bag',
                image: require('../assets/images/activityImages/campingImage2.png'),
            },
            {
                id: 11,
                title: 'Flashlight',
                image: require('../assets/images/activityImages/campingImage3.png'),
            },
            {
                id: 12,
                title: 'Cooking Utensils',
                image: require('../assets/images/activityImages/campingImage4.png'),
            },
        ],
        questions: [
            {
                question: "Tents are the only option for camping accommodation.",
                isCorrect: false,
            },
            {
                question: "Always setting up camp on even ground is essential.",
                isCorrect: true,
            },
            {
                question: "Flashlights are a must-have for night camping.",
                isCorrect: true,
            },
            {
                question: "Campfires are allowed everywhere in national parks.",
                isCorrect: false,
            },
            {
                question: "Bringing enough water is crucial for camping trips.",
                isCorrect: true,
            },
            {
                question: "Camp stoves are banned in campgrounds.",
                isCorrect: false,
            },
            {
                question: "Pitching a tent near water is always safe.",
                isCorrect: false,
            },
            {
                question: "Food should be stored securely to keep animals away.",
                isCorrect: true,
            },
            {
                question: "Mosquito repellents are useful while camping.",
                isCorrect: true,
            },
            {
                question: "Camping doesn’t require any special permits.",
                isCorrect: false,
            }
        ]

    },
    'Fishing': {
        image: require('../assets/images/activityImages/fishingImageMindil.png'),
        title: 'Fishing',
        parts: [
            {
                id: 13,
                title: 'Rod and Reel',
                image: require('../assets/images/activityImages/fishingImage1.png'),
            },
            {
                id: 14,
                title: 'Baits and Lures',
                image: require('../assets/images/activityImages/fishingImage2.png'),
            },
            {
                id: 15,
                title: 'Bucket',
                image: require('../assets/images/activityImages/fishingImage3.png'),
            },
            {
                id: 16,
                title: 'Specialized Clothing',
                image: require('../assets/images/activityImages/fishingImage4.png'),
            },
        ],
        questions: [
            {
                question: "Different fish species are caught using specific bait.",
                isCorrect: true,
            },
            {
                question: "Fishing licenses are required in all locations.",
                isCorrect: false,
            },
            {
                question: "Casting is the technique for throwing a line into the water.",
                isCorrect: true,
            },
            {
                question: "Barbed hooks are allowed everywhere for fishing.",
                isCorrect: false,
            },
            {
                question: "Catch-and-release helps conserve fish populations.",
                isCorrect: true,
            },
            {
                question: "Tides and time of day can affect fishing success.",
                isCorrect: true,
            },
            {
                question: "Fish can be kept without a cooler for long periods.",
                isCorrect: false,
            },
            {
                question: "Fishing requires specialized rods for different fish.",
                isCorrect: true,
            },
            {
                question: "Fishing is best only in freshwater lakes.",
                isCorrect: false,
            },
            {
                question: "Knot-tying is a useful skill in fishing.",
                isCorrect: true,
            }
        ]

    },
    'Diving and snorkeling': {
        image: require('../assets/images/activityImages/divingImageMindil.png'),
        title: 'Diving and Snorkeling',
        parts: [
            {
                id: 17,
                title: 'Mask and Snorkel',
                image: require('../assets/images/activityImages/divingImage1.png'),
            },
            {
                id: 18,
                title: 'Fins',
                image: require('../assets/images/activityImages/divingImage2.png'),
            },
            {
                id: 19,
                title: 'Wetsuit',
                image: require('../assets/images/activityImages/divingImage3.png'),
            },
            {
                id: 20,
                title: 'Water Bottle',
                image: require('../assets/images/activityImages/divingImage4.png'),
            },
        ],
        questions: [
            {
                question: "Snorkeling doesn’t require any special breathing equipment.",
                isCorrect: true,
            },
            {
                question: "Diving always requires a certified guide.",
                isCorrect: false,
            },
            {
                question: "Wetsuits are helpful for both diving and snorkeling in cooler water.",
                isCorrect: true,
            },
            {
                question: "Water currents should always be checked before diving.",
                isCorrect: true,
            },
            {
                question: "Snorkeling can be done without fins.",
                isCorrect: true,
            },
            {
                question: "Diving requires an oxygen tank.",
                isCorrect: true,
            },
            {
                question: "Clear water visibility is ideal for both activities.",
                isCorrect: true,
            },
            {
                question: "It’s safe to touch corals while snorkeling.",
                isCorrect: false,
            },
            {
                question: "Diving deeper than 18 meters requires special training.",
                isCorrect: true,
            },
            {
                question: "Snorkeling allows you to see underwater without holding your breath.",
                isCorrect: true,
            }
        ]

    },


}



const ActivityScreen = ({ setActiveScreenTab, activeScreenTab, activityTestResult, setActivityTestResult, selectedActivity, setSelectedActivity }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const palms = useSelector(state => state.user.palms);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [progress, setProgress] = useState(new Animated.Value(1));
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const gamePalms = useSelector(state => state.user.gamePalms);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [gameTimer, setGameTimer] = useState(100);
    const [transparentOptions, setTransparentOptions] = useState([]);
    const [isHintAvaileble, setIsHintAvaileble] = useState(true);

    const testObject = categories[selectedActivity];
    const questions = testObject?.questions || [];

    const [isPaused, setIsPaused] = useState(false);
    const dispatch = useDispatch();

    const [ownedThings, setOwnedThings] = useState([]);
    const [selectedThing, setSelectedThing] = useState(null);

    const handlePurchase = async (icon) => {
        if (userOwnsThing(icon.id)) {
            setSelectedThing(icon);
        } else if (palms && palms >= 1000) {
            dispatch(updateUserData({ palms: palms - 1000 }));
            dispatch(saveUserData({ palms: palms - 1000 }));
            const updatedOwnedThings = [...ownedThings, icon.id];
            setOwnedThings(updatedOwnedThings);
            await AsyncStorage.setItem('ownedThings', JSON.stringify(updatedOwnedThings));
        } else {
            alert('Not enough palms');
        }
    };

    const userOwnsThing = (iconId) => {
        return ownedThings.includes(iconId);
    };

    useEffect(() => {
        const loadOwnedThings = async () => {
            const savedIcons = await AsyncStorage.getItem('ownedThings');
            if (savedIcons) {
                setOwnedThings(JSON.parse(savedIcons));
                console.log(savedIcons);
            }
        };
        loadOwnedThings();
    }, []);

    const loadOwnedThings = async () => {
        try {
            const savedIcons = await AsyncStorage.getItem('ownedThings');
            if (savedIcons) {
                return JSON.parse(savedIcons);
            }
            return [];
        } catch (error) {
            console.error('Error loading owned things:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchOwnedThings = async () => {
            const loadedOwnedThings = await loadOwnedThings();
            setOwnedThings(loadedOwnedThings);
        };
        fetchOwnedThings();
    }, []);

    useEffect(() => {
        setIsHintAvaileble(true)
    }, [currentQuestionNumber])

    useEffect(() => {
        if (gameTimer > 0 && !isPaused) {
            const timerId = setInterval(() => {
                setGameTimer(prev => prev - 1);
                Animated.timing(progress, {
                    toValue: gameTimer / 100,
                    duration: 1000,
                    useNativeDriver: false,
                }).start();
            }, 1000);
            return () => clearInterval(timerId);
        } else if (gameTimer <= 0) {
            setActiveScreenTab("Loose");
        }
    }, [gameTimer, isPaused]);

    const handleAnswerSelect = (isTrueAnswer) => {
        const { isCorrect } = questions[currentQuestionNumber];

        if ((!isCorrect && !isTrueAnswer) || (isTrueAnswer && isCorrect)) {

            addGamePalms(+300);
            setConsecutiveCorrect((prev) => prev + 1);
        }
        nextQuestion();
    };


    const nextQuestion = () => {
        if (currentQuestionNumber < questions.length - 1) {
            setCurrentQuestionNumber(prev => prev + 1);
        } else {

            setActivityTestResult('Win');
            setActiveScreenTab('ActivityResult');
        }
    };


    useEffect(() => {
        dispatch(updateUserData({ gamePalms: 125, finalPalmsGameAmount: 125 }));
        dispatch(saveUserData({ gamePalms: 125, finalPalmsGameAmount: 125 }));
    }, [])


    useEffect(() => {
        if (testObject) {

            console.log('testObject title', testObject?.title);
            console.log('gamePalms', gamePalms);
        }
        console.log('palms', palms);
    }, [testObject, gamePalms, palms]);



    const addGamePalms = (amount) => {
        const updatedPalmsGameAmount = gamePalms + amount;
        dispatch(updateUserData({ gamePalms: updatedPalmsGameAmount, finalPalmsGameAmount: updatedPalmsGameAmount }));
        dispatch(saveUserData({ gamePalms: updatedPalmsGameAmount, finalPalmsGameAmount: updatedPalmsGameAmount }));
    };

    return (
        <SafeAreaView style={{ width: '100%' }}>
            {!isTestStarted ? (
                <View>
                    {selectedActivity !== '' && (
                        <LinearGradient
                            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                            style={{
                                borderRadius: 25,
                                width: 'auto',
                                alignSelf: 'center',

                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0, 0.25, 0.5, 0.75, 1]}
                        >
                            <View className="flex-row px-5 py-3">
                                <Text style={{
                                    fontFamily: fontAbhayaSemiBold,
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    fontSize: dimensions.width * 0.07,
                                    color: 'black',
                                    paddingHorizontal: 10
                                }}
                                >{palms ? palms : '0'}</Text>
                                <Image
                                    source={require("../assets/icons/palmIconMindil.png")}
                                    className="h-7 w-7"
                                />
                            </View>
                        </LinearGradient>
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

                        }}
                    >{selectedActivity !== '' ? `${selectedActivity}` : '​​Choose the category that interests you!'}</Text>

                    {selectedActivity === '' && (

                        <View className="flex-col justify-between" style={{ marginTop: '10%' }}>
                            {['Surfing', 'Yoga Classes', 'Camping', 'Fishing', 'Diving and snorkeling'].map((activity) => (
                                <TouchableOpacity
                                    key={activity}
                                    style={{ width: '90%', paddingBottom: dimensions.width * 0.04, alignSelf: 'center', }}
                                    onPress={() => {
                                        setSelectedActivity(activity);
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

                    {selectedActivity !== '' && (
                        <SafeAreaView>
                            <LinearGradient
                                colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                                style={{
                                    borderRadius: dimensions.width * 0.1,
                                    width: '95%',
                                    height: dimensions.width < 380 ? '70%' : '75%',

                                    alignSelf: 'center',
                                }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.25, 0.5, 0.75, 1]}
                            >
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 25, justifyContent: 'space-between', }}>
                                        {testObject.parts.map((currentActivity, index) => (
                                            <View key={currentActivity.id} style={{ width: '48%', marginBottom: 3, alignItems: 'center', justifyContent: 'center', }}>
                                                <Text style={{
                                                    textAlign: 'center',
                                                    marginBottom: 10,
                                                    fontFamily: fontAbhayaSemiBold,
                                                    color: '#FCD997',
                                                    fontSize: dimensions.width * 0.05,
                                                }}>
                                                    {currentActivity.title}
                                                </Text>

                                                <Image source={currentActivity.image} style={{
                                                    width: dimensions.width * 0.35,
                                                    height: dimensions.width * 0.35,
                                                    opacity: userOwnsThing(currentActivity.id) ? 1 : 0.5,
                                                    position: 'relative',
                                                }} />
                                                {!userOwnsThing(currentActivity.id) && (
                                                    <Image source={require('../assets/icons/addThingIconMindil.png')} style={{
                                                        width: dimensions.width * 0.1,
                                                        height: dimensions.width * 0.1,
                                                        opacity: 1,
                                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                    }} />
                                                )}
                                                <TouchableOpacity disabled={userOwnsThing(currentActivity.id)} onPress={() => handlePurchase(currentActivity)} className="py-2 px-4 mt-2">
                                                    {userOwnsThing(currentActivity.id) ? (
                                                        <View className="items-center px-7 bg-[#FCD997]"
                                                            style={{
                                                                borderRadius: 16,
                                                                width: 'auto',
                                                            }}>
                                                            <Image
                                                                source={require("../assets/icons/userHaveIcon.png")}
                                                                className="h-7 w-7"
                                                            />
                                                        </View>
                                                    ) : (

                                                        <LinearGradient
                                                            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                                            style={{
                                                                borderRadius: 16,
                                                                width: 'auto',
                                                            }}
                                                            start={{ x: 0, y: 0 }}
                                                            end={{ x: 1, y: 1 }}
                                                            locations={[0, 0.25, 0.5, 0.75, 1]}
                                                        >

                                                            <View className="flex-row items-center px-5">
                                                                <Text style={{
                                                                    fontFamily: fontAbhayaSemiBold,
                                                                    fontWeight: 700,
                                                                    textAlign: 'center',
                                                                    fontSize: dimensions.width * 0.07,
                                                                    color: 'black',
                                                                    paddingHorizontal: 10
                                                                }}
                                                                >1000</Text>


                                                                <Image
                                                                    source={require("../assets/icons/palmIconMindil.png")}
                                                                    className="h-7 w-7"
                                                                />
                                                            </View>

                                                        </LinearGradient>
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </ScrollView>
                            </LinearGradient>

                            <TouchableOpacity onPress={() => setIsTestStarted(true)} style={{ marginTop: 10, width: '95%', alignSelf: 'center' }}>
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
                                        Let's go!
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </SafeAreaView >
                    )}

                </View>
            ) : (
                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <View>
                        <View className="flex justify-between mx-3  items-center">

                            <LinearGradient
                                colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                style={{
                                    width: 'auto',
                                    paddingVertical: 0,
                                    position: 'relative',

                                    borderRadius: dimensions.width * 0.041,
                                }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.25, 0.5, 0.75, 1]}
                            >

                                <View className="flex-row px-5 py-3">
                                    <Text className="text-black text-2xl font-bold pr-1 text-center" style={{ fontFamily: fontIterBold, }}>{gamePalms}</Text>
                                    <Image
                                        source={require("../assets/icons/palmIconMindil.png")}
                                        className="h-7 w-7"
                                    />
                                </View>
                            </LinearGradient>
                        </View>

                        <View
                            style={{
                                height: 10,
                                width: '100%',
                                backgroundColor: '#e0e0e0',
                                borderRadius: 5,
                                marginVertical: 10,
                                alignSelf: 'center',
                                position: 'relative',
                            }}
                        >

                            <Animated.View
                                style={{
                                    height: '100%',
                                    width: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%'],
                                    }),
                                    backgroundColor: '#00aaff',
                                    borderTopRightRadius: 5,
                                    borderBottomRightRadius: 5,
                                    borderTopLeftRadius: 5,
                                    borderBottomLeftRadius: 5,
                                }}
                            />

                            <Animated.Image
                                source={require('../assets/icons/starsIconMindil.png')}
                                style={{
                                    position: 'absolute',
                                    height: 50,
                                    width: 50,
                                    top: -19,
                                    left: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%'],
                                    }),
                                    transform: [{ translateX: -21 }],
                                }}
                                resizeMode="contain"
                            />
                        </View>


                        <View className="pt-3">
                            <Image source={testObject?.image} style={{ width: '100%', height: dimensions.height * 0.25, borderRadius: 25 }} resizeMode='stretch' />
                            <Text
                                style={{
                                    fontFamily: fontIterBold,
                                    bottom: 88,
                                    fontSize: dimensions.width * 0.07,
                                    fontWeight: '700',
                                    color: 'white',
                                    textAlign: 'center',
                                    lineHeight: dimensions.width * 0.08,
                                    paddingTop: 50,
                                }}
                            >
                                {testObject?.title}
                            </Text>
                        </View>

                    </View>

                    <View>
                        <LinearGradient
                            colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                            style={{
                                borderRadius: dimensions.width * 0.1,
                                width: '100%',
                                height: '65%',
                                alignSelf: 'center',
                                marginTop: -70,
                                paddingVertical: '5%',
                            }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            locations={[0, 0.25, 0.5, 0.75, 1]}
                        >

                            <View style={{ justifyContent: 'space-between', }}>

                                <Text
                                    style={{
                                        fontFamily: fontIterBold,
                                        fontWeight: 700,
                                        marginHorizontal: 20,
                                        fontSize: dimensions.width * 0.04,
                                        color: '#FCD997',
                                        textAlign: 'center',
                                        marginBottom: 25,
                                    }}
                                >
                                    {currentQuestionNumber + 1}. {questions[currentQuestionNumber].question}
                                </Text>

                                <View className="flex " style={{ alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => handleAnswerSelect(true)}
                                        disabled={transparentOptions.includes(true)}
                                        style={{ opacity: transparentOptions.includes(true) ? 0 : 1, width: '95%' }}>
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
                                                True
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>



                                    <TouchableOpacity onPress={() => handleAnswerSelect(false)}
                                        disabled={transparentOptions.includes(false)}
                                        style={{ opacity: transparentOptions.includes(false) ? 0 : 1, width: '95%' }}>
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
                                                False
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>


                                </View>
                            </View>
                        </LinearGradient>

                    </View>


                </View>
            )}
        </SafeAreaView >
    )
}

export default ActivityScreen