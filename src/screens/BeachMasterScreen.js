import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, Dimensions, SafeAreaView, Animated, Modal } from 'react-native';
import { CheckCircleIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { EraserIcon } from 'react-native-heroicons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';


const gameNumber = {
    1: {
        title: "Seasonal Changes and Mindil Beach",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil1.png'),

        questions: [
            {
                question: "Darwin’s wet season lasts from October to April.",
                isCorrect: true,
            },
            {
                question: "Swimming at Mindil Beach is safer during the wet season.",
                isCorrect: false,
            },
            {
                question: "Sandstorms are common at Mindil Beach during the dry season.",
                isCorrect: false,
            },
            {
                question: "Summer temperatures rarely exceed 30°C at Mindil Beach.",
                isCorrect: false,
            },
            {
                question: "The dry season is the best time to visit the Mindil Beach Sunset Market.",
                isCorrect: true,
            },
            {
                question: "Bird migration to Mindil Beach often coincides with the wet season.",
                isCorrect: true,
            },
            {
                question: "Vegetation around Mindil Beach becomes lusher during the wet season.",
                isCorrect: true,
            },
            {
                question: "Accommodation prices in Darwin are usually higher during the dry season.",
                isCorrect: true,
            },
            {
                question: "Darwin experiences two main seasons: wet and dry.",
                isCorrect: true,
            },
            {
                question: "The wet season gives Mindil Beach a tropical rainforest-like climate.",
                isCorrect: true,
            }
        ]
        
    },
    2: {
        title: "Marine Life Around Darwin",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil2.png'),
        questions: [
            {
                question: "Saltwater crocodiles are found in the waters near Darwin.",
                isCorrect: true,
            },
            {
                question: "Sharks are never found near the coastline at Mindil Beach.",
                isCorrect: false,
            },
            {
                question: "Box jellyfish are commonly seen at Mindil Beach during the wet season.",
                isCorrect: true,
            },
            {
                question: "Mangrove trees near Darwin provide habitats for fish and crabs.",
                isCorrect: true,
            },
            {
                question: "The coral reefs near Darwin are as extensive as those in the Great Barrier Reef.",
                isCorrect: false,
            },
            {
                question: "Darwin’s waters are home to unique sea snake species.",
                isCorrect: true,
            },
            {
                question: "It’s common to find stingrays in the shallow waters near Mindil Beach.",
                isCorrect: true,
            },
            {
                question: "Dugongs are regularly seen near Darwin’s beaches.",
                isCorrect: false,
            },
            {
                question: "Dolphin sightings are rare in the waters around Darwin.",
                isCorrect: false,
            },
            {
                question: "Mangrove forests support various bird species along the Darwin coast.",
                isCorrect: true,
            }
        ]        
    },
    3: {
        title: "Local Indigenous Culture and Mindil Beach",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil3.png'),
        questions: [
            {
                question: "The Larrakia people are the traditional owners of the land around Darwin.",
                isCorrect: true,
            },
            {
                question: "Mindil Beach is considered sacred by the Larrakia people.",
                isCorrect: true,
            },
            {
                question: "Indigenous art is a common feature at the Mindil Beach Sunset Market.",
                isCorrect: true,
            },
            {
                question: "The Larrakia language has been completely lost.",
                isCorrect: false,
            },
            {
                question: "Indigenous people in Darwin traditionally used boomerangs for hunting.",
                isCorrect: true,
            },
            {
                question: "The Larrakia people perform traditional dances at the Sunset Market.",
                isCorrect: true,
            },
            {
                question: "Local Aboriginal traditions do not allow for storytelling in public spaces.",
                isCorrect: false,
            },
            {
                question: "Mindil Beach has long been a meeting place for trade among Indigenous tribes.",
                isCorrect: true,
            },
            {
                question: "Dreamtime stories have no influence on Indigenous art in Darwin.",
                isCorrect: false,
            },
            {
                question: "Larrakia cultural symbols are represented in modern Darwin artwork.",
                isCorrect: true,
            }
        ]
        
    },

    4: {
        title: "Darwin’s Wildlife and Conservation",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil4.png'),
        questions: [
            {
                question: "Darwin has a national park within 100 km that’s larger than some countries.",
                isCorrect: true,
            },
            {
                question: "Kangaroos are frequently seen on the beaches around Darwin.",
                isCorrect: false,
            },
            {
                question: "The Northern Territory is home to some of the world’s largest saltwater crocodiles.",
                isCorrect: true,
            },
            {
                question: "Dingoes are native to the Darwin area.",
                isCorrect: true,
            },
            {
                question: "Mangrove ecosystems near Darwin help reduce coastal erosion.",
                isCorrect: true,
            },
            {
                question: "Darwin’s dry season is a poor time for birdwatching.",
                isCorrect: false,
            },
            {
                question: "The Northern Territory’s climate supports a wide variety of reptiles.",
                isCorrect: true,
            },
            {
                question: "Snakes are rarely found in Darwin’s forests and reserves.",
                isCorrect: false,
            },
            {
                question: "Wildlife rescue centers in Darwin often care for sea turtles.",
                isCorrect: true,
            },
            {
                question: "Darwin’s conservation efforts mainly focus on land mammals.",
                isCorrect: false,
            }
        ]        
    },
    5: {
        title: "Darwin’s Art and Culture Scene",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil5.png'),
        questions: [
            {
                question: "Darwin hosts an annual festival that celebrates local and international art.",
                isCorrect: true,
            },
            {
                question: "The Mindil Beach Sunset Market only sells food and souvenirs.",
                isCorrect: false,
            },
            {
                question: "Darwin has no street art scene.",
                isCorrect: false,
            },
            {
                question: "Traditional Indigenous artwork is displayed in Darwin’s public spaces.",
                isCorrect: true,
            },
            {
                question: "Darwin has one of the oldest Aboriginal art galleries in Australia.",
                isCorrect: false,
            },
            {
                question: "Art from Darwin’s Indigenous people often uses dots and symbolic patterns.",
                isCorrect: true,
            },
            {
                question: "Darwin’s art galleries do not feature contemporary art.",
                isCorrect: false,
            },
            {
                question: "Darwin’s culture is influenced by its tropical climate.",
                isCorrect: true,
            },
            {
                question: "The Darwin Festival attracts over 50,000 visitors each year.",
                isCorrect: true,
            },
            {
                question: "Performances at the Darwin Festival include Indigenous storytelling.",
                isCorrect: true,
            }
        ]
        
    },
    6: {
        title: "Mindil Beach Sunset Market Trivia",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil6.png'),
        questions: [
            {
                question: "The Mindil Beach Sunset Market operates year-round.",
                isCorrect: false,
            },
            {
                question: "Only local foods are sold at the market.",
                isCorrect: false,
            },
            {
                question: "Mindil Beach Sunset Market began in the 1980s.",
                isCorrect: true,
            },
            {
                question: "Visitors can find live music at the Sunset Market.",
                isCorrect: true,
            },
            {
                question: "The market attracts both locals and tourists to Mindil Beach.",
                isCorrect: true,
            },
            {
                question: "Market vendors sell handmade crafts and artworks.",
                isCorrect: true,
            },
            {
                question: "The Sunset Market does not allow public performances.",
                isCorrect: false,
            },
            {
                question: "The market closes before sunset.",
                isCorrect: false,
            },
            {
                question: "Local Indigenous art is showcased at the market.",
                isCorrect: true,
            },
            {
                question: "It’s one of the biggest open-air markets in Australia.",
                isCorrect: true,
            }
        ]
        
    },
    7: {
        title: "Darwin’s Historical Landmarks",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil7.png'),
        questions: [
            {
                question: "Darwin has a WWII museum due to its role in the Pacific conflict.",
                isCorrect: true,
            },
            {
                question: "The Darwin Esplanade was built in the early 1800s.",
                isCorrect: false,
            },
            {
                question: "Cyclone Tracy in 1974 reshaped many of Darwin’s landmarks.",
                isCorrect: true,
            },
            {
                question: "Darwin’s architecture is influenced by its tropical climate.",
                isCorrect: true,
            },
            {
                question: "The Fannie Bay Gaol was Darwin’s main prison until 1979.",
                isCorrect: true,
            },
            {
                question: "The Northern Territory was originally part of Queensland.",
                isCorrect: false,
            },
            {
                question: "Darwin’s old town center was rebuilt after WWII.",
                isCorrect: true,
            },
            {
                question: "The Darwin Waterfront Precinct was established in the 1960s.",
                isCorrect: false,
            },
            {
                question: "The city’s name comes from Charles Darwin.",
                isCorrect: true,
            },
            {
                question: "Mindil Beach has been a popular spot since the 1920s.",
                isCorrect: false,
            }
        ]
        
    },
    8: {
        title: "Natural Wonders Near Darwin",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil8.png'),
        questions: [
            {
                question: "Litchfield National Park is known for its termite mounds.",
                isCorrect: true,
            },
            {
                question: "Kakadu National Park is the smallest park near Darwin.",
                isCorrect: false,
            },
            {
                question: "Waterfalls are a common sight in Darwin’s surrounding parks.",
                isCorrect: true,
            },
            {
                question: "The Mary River is home to a high density of crocodiles.",
                isCorrect: true,
            },
            {
                question: "Darwin has no natural freshwater swimming holes.",
                isCorrect: false,
            },
            {
                question: "Hot springs are located near Darwin.",
                isCorrect: true,
            },
            {
                question: "Magnetic termite mounds are unique to the Northern Territory.",
                isCorrect: true,
            },
            {
                question: "The Northern Territory’s parks only contain tropical forests.",
                isCorrect: false,
            },
            {
                question: "Visitors often swim at Wangi Falls in Litchfield National Park.",
                isCorrect: true,
            },
            {
                question: "The Katherine Gorge is part of Kakadu National Park.",
                isCorrect: false,
            }
        ]        
    },
    9: {
        title: "Darwin’s Climate and Outdoor Activities",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil9.png'),
        questions: [
            {
                question: "Darwin’s dry season is also called “winter” by locals.",
                isCorrect: true,
            },
            {
                question: "The city has extreme temperature drops in the winter.",
                isCorrect: false,
            },
            {
                question: "Many outdoor events in Darwin are held in the dry season.",
                isCorrect: true,
            },
            {
                question: "Cyclones are common in Darwin during the wet season.",
                isCorrect: true,
            },
            {
                question: "Darwin’s high humidity makes dry season hiking difficult.",
                isCorrect: false,
            },
            {
                question: "Some beaches near Darwin have no stingers.",
                isCorrect: true,
            },
            {
                question: "Outdoor festivals in Darwin attract more visitors than indoor events.",
                isCorrect: true,
            },
            {
                question: "Mosquitoes are less active during the dry season.",
                isCorrect: true,
            },
            {
                question: "Darwin’s tropical storms are strongest in June.",
                isCorrect: false,
            },
            {
                question: "The city has an annual marathon during the dry season.",
                isCorrect: true,
            }
        ]
        
    },
    10: {
        title: "Unique Foods and Flavors of Darwin",
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil10.png'),
        questions: [
            {
                question: "Bush tucker cuisine is common in Darwin’s local restaurants.",
                isCorrect: true,
            },
            {
                question: "Crocodile meat is a popular dish in Darwin.",
                isCorrect: true,
            },
            {
                question: "Seafood in Darwin is mostly imported.",
                isCorrect: false,
            },
            {
                question: "The Mindil Beach Sunset Market offers vegan options.",
                isCorrect: true,
            },
            {
                question: "“Buffalo wings” originated in Darwin.",
                isCorrect: false,
            },
            {
                question: "Locals eat barramundi, a type of fish.",
                isCorrect: true,
            },
            {
                question: "Many foods in Darwin are influenced by Southeast Asian flavors.",
                isCorrect: true,
            },
            {
                question: "Bush tomatoes are commonly used in Northern Territory dishes.",
                isCorrect: true,
            },
            {
                question: "Darwin’s cuisine is predominantly influenced by British flavors.",
                isCorrect: false,
            },
            {
                question: "Mangoes are a popular local fruit in Darwin.",
                isCorrect: true,
            }
        ]
        
    },

};

const fontIterBold = 'Inter_18pt-Bold';
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';


const BeachMasterScreen = ({ setActiveScreenTab, activeScreenTab, testNumber }) => {
    const [time, setTime] = useState(120);
    const palms = useSelector(state => state.user.currentpalms);
    const testNumberInt = parseInt(testNumber, 10);
    const [progress, setProgress] = useState(new Animated.Value(1));
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const gamePalms = useSelector(state => state.user.gamePalms);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [gameTimer, setGameTimer] = useState(120);
    const [modalVisible, setModalVisible] = useState(false);
    const [hearts, setHearts] = useState(3);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [transparentOptions, setTransparentOptions] = useState([]);

    const [isHintAvaileble, setIsHintAvaileble] = useState(true);

    const testObject = gameNumber[testNumberInt];
    const questions = testObject?.questions || [];

    const [isPaused, setIsPaused] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [])

    useEffect(() => {
        setTransparentOptions([]);
    }, [currentQuestionNumber])

    useEffect(() => {
        setIsHintAvaileble(true)
    }, [currentQuestionNumber])

    useEffect(() => {
        if (gameTimer > 0 && !isPaused) {
            const timerId = setInterval(() => {
                setGameTimer(prev => prev - 1);
                Animated.timing(progress, {
                    toValue: gameTimer / 120,
                    duration: 1000,
                    useNativeDriver: false,
                }).start();
            }, 1000);
            return () => clearInterval(timerId);
        } else if (gameTimer <= 0) {
            setActiveScreenTab("Loose");
        }
    }, [gameTimer, isPaused]);
    

    const handleToAnswer = (isTrueAnswer) => {
        const { isCorrect } = questions[currentQuestionNumber];

        if ((!isCorrect && !isTrueAnswer) || (isTrueAnswer && isCorrect)) {

            addPalms(+100);
            setConsecutiveCorrect((prev) => prev + 1);

            if (consecutiveCorrect + 1 === 2) {
                setTime((prev) => prev + 30);
                setConsecutiveCorrect(0);
            }
        } else {
            if (gamePalms >= 100 && hearts > 0) {

                addPalms(-50);
                setHearts((prev) => prev - 1);
                setConsecutiveCorrect(0);
            } else if (hearts < 1) {
                setModalVisible(true);
            }
        }
        nextQuestion();
    };


    const nextQuestion = () => {
        if (currentQuestionNumber < questions.length - 1) {
            setCurrentQuestionNumber(prev => prev + 1);
        } else {
            setActiveScreenTab('Win');
        }
    };


    useEffect(() => {
        dispatch(updateUserData({ gamePalms: 125, finalPalmsGameAmount: 125 }));
        dispatch(saveUserData({ gamePalms: 125, finalPalmsGameAmount: 125 }));
    }, [])




    const addPalms = (amount) => {
        const updatedPalmsGameAmount = gamePalms + amount;
        dispatch(updateUserData({ gamePalms: updatedPalmsGameAmount, finalPalmsGameAmount: updatedPalmsGameAmount }));
        dispatch(saveUserData({ gamePalms: updatedPalmsGameAmount, finalPalmsGameAmount: updatedPalmsGameAmount }));
    };



    useEffect(() => {
        setTransparentOptions([])
    }, [currentQuestionNumber])

    return (
        <View className="flex-1  p-5" style={{ width: '100%', }}>
            <View className="flex-row justify-between mx-3  items-center" style={{ marginTop: dimensions.width < 380 ? 10 : 50 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <LinearGradient
                        colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                        style={{
                            width: 'auto',
                            paddingVertical: 0,
                            position: 'relative',

                            borderRadius: dimensions.width * 0.04,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.25, 0.5, 0.75, 1]}

                    >

                        <View className="flex-row" style={{ marginBottom: dimensions.width < 380 ? 10 : 0, padding: 10 }}>
                            <Image source={require('../assets/icons/HeartIconMindil.png')} className="w-10 h-10" />
                        </View>
                        <Text style={{ position: 'absolute', bottom: 3, right: 7, fontFamily: fontIterBold, fontWeight: hearts > 1 ? 700 : 900, fontSize: hearts > 1 ? 16 : 19, color: hearts > 1 ? 'black' : 'green' }}>{hearts > 1 ? hearts : '+'}</Text>
                    </LinearGradient>
                </TouchableOpacity>

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



            <View className="flex-1 flex pt-36" style={{ bottom: (dimensions.width < 380 && questions[currentQuestionNumber].question.length > 14) ? 145 : 98 }}>
                <View
                    style={{
                        height: 10,
                        width: '100%',
                        backgroundColor: '#e0e0e0',
                        borderRadius: 5,
                        marginBottom: 10,
                        position: 'relative', // Забезпечує позиціонування для зірочок
                    }}
                >
                    {/* Заповнена частина шкали */}
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
                        }}
                    />

                    {/* Зірочки на кінці заповненої частини */}
                    <Animated.Image
                        source={require('../assets/icons/starsIconMindil.png')} // Заміни на шлях до свого зображення
                        style={{
                            position: 'absolute',
                            height: 50,
                            width: 50,
                            top: -19, // Регулюйте, щоб зображення розташувалось по центру
                            left: progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                            }),
                            transform: [{ translateX: -21 }], // Зміщення для центрування зображення
                        }}
                        resizeMode="contain"
                    />
                </View>

                <View className="pt-3">
                    <Image source={testObject?.image} className="w-full h-40 rounded-3xl" />
                    <Text
                        style={{
                            fontFamily: fontIterBold,
                            bottom: 88,
                            fontSize: dimensions.width * 0.055,
                            fontWeight: '700',
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: dimensions.width * 0.043,
                            paddingTop: 50,
                        }}
                    >
                        {testObject?.title}
                    </Text>
                </View>


                <LinearGradient
                    colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                    style={{
                        borderRadius: dimensions.width * 0.1,
                        width: '100%',
                        height: '70%',
                        alignSelf: 'center',
                        marginTop: -70,
                        paddingVertical: '5%',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.25, 0.5, 0.75, 1]}
                >
                    <View style={{ justifyContent: 'space-between' }}>

                        <Text
                            style={{
                                paddingTop: 16,
                                fontFamily: fontIterBold,
                                fontWeight: 700,
                                marginHorizontal: 20,
                                marginBottom: 19,
                                fontSize: dimensions.width < 380 ? dimensions.width * 0.045 : dimensions.width * 0.05,
                                color: '#FCD997',
                                textAlign: 'center',
                            }}
                        >
                            {currentQuestionNumber + 1}. {questions[currentQuestionNumber].question}
                        </Text>

                        <View className="flex " style={{ width: '100%', alignSelf: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleToAnswer(true)}
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



                            <TouchableOpacity onPress={() => handleToAnswer(false)}
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
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <LinearGradient
                    colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                    locations={[0, 0.1, 0.5, 0.9, 1]}
                    style={{
                        borderRadius: 37,
                        width: '95%',
                        justifyContent: 'center',
                        height:  '50%',
                        marginVertical: dimensions.width < 380 ? 150 : 200,
                        alignSelf: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-1  items-center shadow-xl mx-3"
                >
                    <TouchableOpacity onPress={() => {

                        setModalVisible(false);
                        if (hearts < 1) setActiveScreenTab("Loose");
                        setIsPaused(false);
                    }}
                        style={{ position: 'absolute', top: 16, right: 16, zIndex: 50 }}
                    >
                        <View >
                            <XMarkIcon size={42} color='#FCD997' />
                        </View>
                    </TouchableOpacity>
                    <View className=" py-10 px-5 rounded-3xl items-center  shadow-lg" style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>
                        <View className="py-10 flex" style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                            <View className='flex-row' style={{ alignItems: 'center', }}>
                                <Text style={{
                                    paddingTop: 16,
                                    fontFamily: fontAbhayaSemiBold,
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    marginBottom: 19,
                                    fontSize: dimensions.width * 0.07,
                                    color: '#FCD997',


                                }}
                                >{gamePalms >= 50 ? 'Get an additional chance!' : 'You do not have enough palms in this game'}
                                    {gamePalms < 50 && (
                                        <Image
                                            source={require("../assets/icons/palmIconMindil.png")}
                                            className="h-7 w-7 text-center items-center"
                                        />
                                    )}
                                </Text>

                            </View>


                            <View className="flex-row space-x-3 text-center pt-5" style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>
                                <View className="flex space-y-3" >
                                    {gamePalms >= 50 && (
                                        <LinearGradient
                                            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                            style={{
                                                width: 'auto',
                                                paddingVertical: 0,
                                                position: 'relative',
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                                borderRadius: dimensions.width * 0.064,
                                            }}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            locations={[0, 0.25, 0.5, 0.75, 1]}
                                        >
                                            <View className="flex-row px-5 py-3 text-center items-center">
                                                <Image
                                                    source={require("../assets/icons/HeartIconMindil.png")}
                                                    className="h-7 w-7 text-center items-center"
                                                />
                                            </View>
                                        </LinearGradient>
                                    )}
                                    {gamePalms >= 75 && (
                                        <LinearGradient
                                            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                            style={{
                                                width: 'auto',
                                                paddingVertical: 0,
                                                position: 'relative',
                                                alignItems: 'center',
                                                alignSelf: 'center',

                                                borderRadius: dimensions.width * 0.064,
                                            }}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            locations={[0, 0.25, 0.5, 0.75, 1]}
                                        >
                                            <View className="flex-row px-5 py-3">
                                                <Image
                                                    source={require("../assets/icons/HeartIconMindil.png")}
                                                    className="h-7 w-7"
                                                />
                                                <Image
                                                    source={require("../assets/icons/HeartIconMindil.png")}
                                                    className="h-7 w-7"
                                                />
                                            </View>
                                        </LinearGradient>
                                    )}
                                    {gamePalms >= 100 && (
                                        <LinearGradient
                                            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                            style={{
                                                width: 'auto',
                                                paddingVertical: 0,
                                                position: 'relative',
                                                alignItems: 'center',
                                                borderRadius: dimensions.width * 0.064,
                                            }}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            locations={[0, 0.25, 0.5, 0.75, 1]}
                                        >
                                            <View className="flex-row px-5 py-3">
                                                <Image
                                                    source={require("../assets/icons/HeartIconMindil.png")}
                                                    className="h-7 w-7"
                                                />
                                                <Image
                                                    source={require("../assets/icons/HeartIconMindil.png")}
                                                    className="h-7 w-7"
                                                />
                                                <Image
                                                    source={require("../assets/icons/HeartIconMindil.png")}
                                                    className="h-7 w-7"
                                                />
                                            </View>
                                        </LinearGradient>
                                    )}
                                </View>

                                <View className="flex-1 space-y-3" >
                                    {gamePalms >= 50 && (
                                        <TouchableOpacity
                                            className="flex-row items-center mr-4"
                                            disabled={gamePalms < 50}
                                            onPress={() => { setHearts(1); addPalms(-50); setModalVisible(false); setIsPaused(false); }}
                                        >

                                            <LinearGradient
                                                colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                                style={{
                                                    width: 'auto',
                                                    paddingVertical: 0,
                                                    position: 'relative',
                                                    alignItems: 'center',
                                                    flex: 1,
                                                    borderRadius: dimensions.width * 0.064,
                                                }}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                locations={[0, 0.25, 0.5, 0.75, 1]}
                                            >
                                                <View className="flex-row px-5 py-3 text-center items-center">
                                                    <Text style={{ fontFamily: fontIterBold, fontWeight: '700', fontSize: dimensions.width * 0.055 }}>50 </Text>
                                                    <Image
                                                        source={require("../assets/icons/palmIconMindil.png")}
                                                        className="h-7 w-7 text-center items-center"
                                                    />
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    )}
                                    {gamePalms >= 75 && (
                                        <TouchableOpacity
                                            className="flex-row items-center mr-4"
                                            disabled={gamePalms < 75}
                                            onPress={() => { setHearts(2); addPalms(-75); setModalVisible(false); setIsPaused(false); }}
                                        >

                                            <LinearGradient
                                                colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                                style={{
                                                    width: 'auto',
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
                                                    <Text style={{ fontFamily: fontIterBold, fontWeight: '700', fontSize: dimensions.width * 0.055 }}>75 </Text>
                                                    <Image
                                                        source={require("../assets/icons/palmIconMindil.png")}
                                                        className="h-7 w-7 text-center items-center"
                                                    />
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    )}
                                    {gamePalms >= 100 && (
                                        <TouchableOpacity
                                            className="flex-row items-center mr-4"
                                            disabled={gamePalms < 100}
                                            onPress={() => { setHearts(3); addPalms(-100); setModalVisible(false); setIsPaused(false); }}
                                        >

                                            <LinearGradient
                                                colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                                style={{
                                                    width: 'auto',
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
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        </View>
    );
};



export default BeachMasterScreen;
