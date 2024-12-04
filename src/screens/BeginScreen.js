import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, Alert, ImageBackground, Modal, Dimensions, TouchableOpacity, SafeAreaView, FlatList, Animated } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import { ScrollView } from 'react-native-gesture-handler';
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';



const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
const easyBreezyData = [
    {
        id: '1',
        title: 'History of Mindil Beach',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil1.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil2.png'),
    },
    {
        id: '2',
        title: 'Wildlife in Darwin',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil1.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil2.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil3.png'),
    },
    {
        id: '3',
        title: ' Indigenous Culture',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil2.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil3.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil4.png'),
    },
    {
        id: '4',
        title: 'Nature and Environment',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil3.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil4.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil5.png'), 
    },
    {
        id: '5',
        title: 'Events and Festivals',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil4.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil5.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil6.png'),
    },
    {
        id: '6',
        title: 'Tourism in Darwin',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil5.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil6.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil7.png'),
    },
    {
        id: '7',
        title: 'Local Cuisine',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil6.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil7.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil8.png'),
    },
    {
        id: '8',
        title: 'Sports and Recreation',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil7.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil8.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil9.png'),
    },
    {
        id: '9',
        title: 'Transportation in Darwin',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil8.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil9.png'),
        nextImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil10.png'),
    },
    {
        id: '10',
        title: 'Arts and Entertainment',
        previousImage: require('../assets/images/easyBreezyImages/easyBreezyImageMindil9.png'),
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil10.png'),
        
    },

];

const beachMastermindData = [
    {
        id: 1,
        title: 'Seasonal Changes and Mindil Beach',
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil1.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil2.png'),
    },
    {
        id: 2,
        title: 'Marine Life Around Darwin',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil1.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil2.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil3.png'),
    },
    {
        id: 3,
        title: 'Local Indigenous Culture and Mindil Beach',
        prebiousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil2.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil3.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil4.png'),
    },
    {
        id: 4,
        title: 'Darwin’s Wildlife and Conservation',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil3.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil4.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil5.png'),
    },
    {
        id: 5,
        title: 'Darwin’s Art and Culture Scene',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil4.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil5.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil6.png'),
    },
    {
        id: 6,
        title: 'Mindil Beach Sunset Market Trivia',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil5.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil6.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil7.png'),
    },
    {
        id: 7,
        title: 'Darwin’s Historical Landmarks',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil6.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil7.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil8.png'),
    },
    {
        id: 8,
        title: 'Natural Wonders Near Darwin',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil7.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil8.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil9.png'),
    },
    {
        id: 9,
        title: 'Darwin’s Climate and Outdoor Activities',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil8.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil9.png'),
        nextImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil10.png'),
    },
    {
        id: 10,
        title: 'Unique Foods and Flavors of Darwin',
        previousImage: require('../assets/images/beachMastermindImages/beachMastermindImageMinil9.png'),
        image: require('../assets/images/beachMastermindImages/beachMastermindImageMinil10.png'),
    },
];

const testTypes = [
    { title: 'Easy Breezy Quiz', screenTitle: 'EasyBreezyScreen', image: require('../assets/images/beginScreenImages/EasyBreezy.png') },
    { title: 'Beach Mastermind', screenTitle: 'BeachMastermindScreen', image: require('../assets/images/beginScreenImages/BeachMastermind.png') },
];

const BeginScreen = ({ setActiveScreenTab, setTestNumber, testNumber, selectedQuestMode, setSelectedQuestMode }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));


    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
    const slidesRef = useRef(null);
    const scrollHorizontal = useRef(new Animated.Value(0)).current;



    const fontIterBold = 'Inter_18pt-Bold';

    useEffect(() => {
        const onChange = ({ window }) => {
            setDimensions(window);
        };

        const dimensionListener = Dimensions.addEventListener('change', onChange);

        return () => {
            dimensionListener.remove();
        };
    }, []);


    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurrentArticleIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const renderTopics = ({ item }) => (
        <SafeAreaView style={{ width: dimensions.width }} className="flex-1 justify-start items-center" >
            <View style={{ flexDirection: 'row', }}>
                {item.previousImage && (
                    <Image
                        source={item.previousImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.17,
                            marginTop: 37,
                            borderRadius: 37,
                            marginRight: -20,
                        }}
                        resizeMode="cover"
                    />
                )}
                <TouchableOpacity
                    className="w-80 items-center"
                    onPress={() => {
                        setActiveScreenTab(selectedQuestMode === 'EasyBreezyScreen' ? 'EasyBreezyScreen' : 'BeachMasterScreen'); setTestNumber(item.id);
                    }}
                >

                    <Image
                        source={item.image}
                        style={{
                            width: dimensions.width * 0.65,
                            height: dimensions.height * 0.17,
                            marginTop: 37,
                            borderRadius: 37,
                        }}
                        resizeMode="cover"
                    />
                    <Text className="text-center text-white font-bold text-lg mr-5">{item.title}</Text>
                </TouchableOpacity>


                {item.nextImage && (
                    <Image
                        source={item.nextImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.17,
                            marginTop: 37,
                            borderRadius: 37,
                            marginLeft: -20,
                        }}
                        resizeMode="cover"
                    />
                    
                )}
            </View>
        </SafeAreaView>
    );


    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginVertical: '21%',
        }}>
            {selectedQuestMode !== '' ? (
                <View className='flex-1 justify-between' style={{ width: '100%', paddingBottom: '10%' }}>

                    <Text
                        style={{
                            paddingTop: 16,
                            fontFamily: fontAbhayaSemiBold,
                            fontWeight: 700,
                            marginHorizontal: 20,
                            lineHeight: dimensions.width * 0.1,
                            fontSize: dimensions.width * 0.08,
                            color: '#D6B66B',
                            textAlign: 'center',
                        }}
                    >
                        Choose the topic that interests you!
                    </Text>
                    <View className="flex-row  w-full pb-[40%]">

                        <FlatList
                            data={selectedQuestMode === 'EasyBreezyScreen' ? easyBreezyData : beachMastermindData}
                            renderItem={renderTopics}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            bounces={false}
                            keyExtractor={(item) => item.id.toString()}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollHorizontal } } }], {
                                useNativeDriver: false,
                            })}
                            onViewableItemsChanged={viewableItemsChanged}
                            viewabilityConfig={viewConfig}
                            scrollEventThrottle={32}
                            ref={slidesRef}
                        />


                    </View>
                    <TouchableOpacity
                        className="w-[100%]"
                        style={{ width: '90%', marginTop: '10%', alignSelf: 'center', }}
                        onPress={() => { setSelectedQuestMode('') }}
                    >
                        <LinearGradient
                            colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                            style={{
                                width: 'auto',
                                paddingVertical: 0,
                                bottom: selectedQuestMode === 'EasyBreezyScreen' ? 10 : 40,
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
                                Back
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}>

                    {testTypes.map((testType, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedQuestMode(testType.screenTitle === 'EasyBreezyScreen' ? 'EasyBreezyScreen' : 'BeachMastermind')}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <View style={{ flex: 1, width: '100%', }}>
                                <Image source={testType.image} className="text-center" style={{ width: '50%', height: undefined, aspectRatio: 1, marginBottom: '3%', alignSelf: 'center' }}
                                    resizeMode="contain" />
                                <LinearGradient
                                    colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                    style={{
                                        borderRadius: dimensions.width * 0.1,
                                        paddingVertical: 0,
                                        width: '90%',
                                        alignSelf: 'center'


                                    }}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    locations={[0, 0.25, 0.5, 0.75, 1]}
                                >
                                    <Text
                                        className=" text-center "
                                        style={{
                                            fontFamily: fontIterBold,
                                            paddingVertical: dimensions.width < 380 ? 10 : 20,
                                            fontSize: dimensions.width * 0.055,
                                            color: 'black',
                                            textAlign: 'center',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {testType.title}
                                    </Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}


        </SafeAreaView>
    );
};


export default BeginScreen;
