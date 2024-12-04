import React, { useState, useEffect, act } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, Dimensions, ImageBackground, Modal, TextInput, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, saveUserData } from '../redux/userSlice';
import { styled } from 'nativewind';
import { XMarkIcon } from 'react-native-heroicons/outline';
import FortuneWheel from './FortuneWheel';
import { el, se } from 'date-fns/locale';


const gameNumber = {
    1: {
        title: 'History of Mindil Beach',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil1.png'),
        questions: [
            {
                question: "In what year was the city of Darwin founded?",
                answers: [
                    { answer: "1869", isCorrect: true },
                    { answer: "1885", isCorrect: false },
                    { answer: "1901", isCorrect: false },
                ],
            },
            {
                question: "Who were the traditional owners of the land at Mindil Beach?",
                answers: [
                    { answer: "Tiwi people", isCorrect: false },
                    { answer: "Larrakia people", isCorrect: true },
                    { answer: "Yolngu people", isCorrect: false },
                ],
            },
            {
                question: "What significance did Mindil Beach hold for Indigenous peoples?",
                answers: [
                    { answer: "A fishing spot", isCorrect: false },
                    { answer: "A sacred place", isCorrect: true },
                    { answer: "A trading hub", isCorrect: false },
                ],
            },
            {
                question: "Which European explorer first made contact with the Larrakia people?",
                answers: [
                    { answer: "Captain Cook", isCorrect: false },
                    { answer: "George Grey", isCorrect: true },
                    { answer: "William Dampier", isCorrect: false },
                ],
            },
            {
                question: "What major event occurred in Darwin during World War II?",
                answers: [
                    { answer: "The city was bombed", isCorrect: true },
                    { answer: "A naval base was established", isCorrect: false },
                    { answer: "A refugee camp was set up", isCorrect: false },
                ],
            },
            {
                question: "When did the Mindil Beach Sunset Market first open?",
                answers: [
                    { answer: "1987", isCorrect: false },
                    { answer: "1992", isCorrect: true },
                    { answer: "1995", isCorrect: false },
                ],
            },
            {
                question: "What was a traditional use of Mindil Beach by the Larrakia people?",
                answers: [
                    { answer: "Agriculture", isCorrect: false },
                    { answer: "Ceremonial gatherings", isCorrect: true },
                    { answer: "Trade with other tribes", isCorrect: false },
                ],
            },
            {
                question: "How has tourism impacted Mindil Beach since the 1980s?",
                answers: [
                    { answer: "Decreased local culture", isCorrect: false },
                    { answer: "Increased economic growth", isCorrect: true },
                    { answer: "Reduced biodiversity", isCorrect: false },
                ],
            },
            {
                question: "What type of events were historically held at Mindil Beach?",
                answers: [
                    { answer: "Fishing competitions", isCorrect: false },
                    { answer: "Cultural festivals", isCorrect: true },
                    { answer: "Political rallies", isCorrect: false },
                ],
            },
            {
                question: "What natural feature is Mindil Beach famous for?",
                answers: [
                    { answer: "Coral reefs", isCorrect: false },
                    { answer: "Stunning sunsets", isCorrect: true },
                    { answer: "Rock formations", isCorrect: false },
                ],
            }
        ]
    },
    2: {
        title: 'Wildlife in Darwin',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil2.png'),
        questions: [
            {
                question: "What is the largest species of crocodile found in Darwin?",
                answers: [
                    { answer: "American crocodile", isCorrect: false },
                    { answer: "Saltwater crocodile", isCorrect: true },
                    { answer: "Nile crocodile", isCorrect: false },
                ],
            },
            {
                question: "Which bird species is commonly spotted in Darwin’s wetlands?",
                answers: [
                    { answer: "Australian magpie", isCorrect: false },
                    { answer: "Jabiru", isCorrect: true },
                    { answer: "Emu", isCorrect: false },
                ],
            },
            {
                question: "What is a popular reptile attraction in Darwin?",
                answers: [
                    { answer: "Crocosaurus Cove", isCorrect: true },
                    { answer: "Reptile Park", isCorrect: false },
                    { answer: "Wildlife Sanctuary", isCorrect: false },
                ],
            },
            {
                question: "Which mammal is native to the Northern Territory?",
                answers: [
                    { answer: "Koala", isCorrect: false },
                    { answer: "Dingo", isCorrect: true },
                    { answer: "Wallaby", isCorrect: false },
                ],
            },
            {
                question: "What is a common danger when swimming in Darwin’s waters?",
                answers: [
                    { answer: "Jellyfish", isCorrect: true },
                    { answer: "Sharks", isCorrect: false },
                    { answer: "Barracudas", isCorrect: false },
                ],
            },
            {
                question: "What is the most famous marine animal in Darwin’s waters?",
                answers: [
                    { answer: "Green sea turtle", isCorrect: true },
                    { answer: "Clownfish", isCorrect: false },
                    { answer: "Great white shark", isCorrect: false },
                ],
            },
            {
                question: "Which iconic bird is known for its bright colors and loud call?",
                answers: [
                    { answer: "Rainbow lorikeet", isCorrect: true },
                    { answer: "Cockatoo", isCorrect: false },
                    { answer: "Kookaburra", isCorrect: false },
                ],
            },
            {
                question: "What type of ecosystem is most prevalent in Darwin?",
                answers: [
                    { answer: "Desert", isCorrect: false },
                    { answer: "Rainforest", isCorrect: false },
                    { answer: "Wetlands", isCorrect: true },
                ],
            },
            {
                question: "Which animal is a symbol of the Northern Territory?",
                answers: [
                    { answer: "Kangaroo", isCorrect: false },
                    { answer: "Emu", isCorrect: false },
                    { answer: "Saltwater crocodile", isCorrect: true },
                ],
            },
            {
                question: "What seasonal event affects wildlife in Darwin?",
                answers: [
                    { answer: "Migration", isCorrect: true },
                    { answer: "Hibernation", isCorrect: false },
                    { answer: "Mating season", isCorrect: false },
                ],
            }
        ]

    },
    3: {
        title: ' Indigenous Culture',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil3.png'),
        questions: [
            {
                question: "What language family do the Larrakia people belong to?",
                answers: [
                    { answer: "Pama-Nyungan", isCorrect: true },
                    { answer: "Yolŋu Matha", isCorrect: false },
                    { answer: "Kriol", isCorrect: false },
                ],
            },
            {
                question: "What is a traditional Larrakia ceremony called?",
                answers: [
                    { answer: "Corroboree", isCorrect: true },
                    { answer: "Sorry Business", isCorrect: false },
                    { answer: "Dreamtime", isCorrect: false },
                ],
            },
            {
                question: "What do the Larrakia people call their land?",
                answers: [
                    { answer: "Country", isCorrect: true },
                    { answer: "Terra", isCorrect: false },
                    { answer: "Domain", isCorrect: false },
                ],
            },
            {
                question: "What traditional practice is important for Indigenous Australians?",
                answers: [
                    { answer: "Painting", isCorrect: false },
                    { answer: "Weaving", isCorrect: false },
                    { answer: "Storytelling", isCorrect: true },
                ],
            },
            {
                question: "What type of art is significant in Indigenous culture?",
                answers: [
                    { answer: "Oil painting", isCorrect: false },
                    { answer: "Dot painting", isCorrect: true },
                    { answer: "Graffiti", isCorrect: false },
                ],
            },
            {
                question: "Which is a traditional food source for the Larrakia people?",
                answers: [
                    { answer: "Wheat", isCorrect: false },
                    { answer: "Kangaroo", isCorrect: true },
                    { answer: "Chicken", isCorrect: false },
                ],
            },
            {
                question: "What is a common theme in Indigenous Australian stories?",
                answers: [
                    { answer: "Superheroes", isCorrect: false },
                    { answer: "Animals and nature", isCorrect: true },
                    { answer: "Cities and technology", isCorrect: false },
                ],
            },
            {
                question: "How do Indigenous Australians traditionally view the land?",
                answers: [
                    { answer: "As property", isCorrect: false },
                    { answer: "As a living entity", isCorrect: true },
                    { answer: "As a resource", isCorrect: false },
                ],
            },
            {
                question: "What is the significance of Dreamtime in Indigenous culture?",
                answers: [
                    { answer: "It’s a time for rest", isCorrect: false },
                    { answer: "It’s a creation story", isCorrect: true },
                    { answer: "It’s a historical account", isCorrect: false },
                ],
            },
            {
                question: "What is the role of music in Indigenous culture?",
                answers: [
                    { answer: "Entertainment only", isCorrect: false },
                    { answer: "Cultural expression and storytelling", isCorrect: true },
                    { answer: "Background noise", isCorrect: false },
                ],
            }
        ]

    },
    4: {
        title: 'Nature and Environment',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil4.png'),
        questions: [
            {
                question: "What is the predominant climate in Darwin?",
                answers: [
                    { answer: "Tropical savanna", isCorrect: true },
                    { answer: "Arid desert", isCorrect: false },
                    { answer: "Temperate", isCorrect: false },
                ],
            },
            {
                question: "Which national park is located near Darwin?",
                answers: [
                    { answer: "Kakadu National Park", isCorrect: true },
                    { answer: "Uluru-Kata Tjuta National Park", isCorrect: false },
                    { answer: "Grampians National Park", isCorrect: false },
                ],
            },
            {
                question: "What is a unique natural feature of Darwin’s coastline?",
                answers: [
                    { answer: "Cliffs", isCorrect: false },
                    { answer: "Coral reefs", isCorrect: false },
                    { answer: "Mudflats", isCorrect: true },
                ],
            },
            {
                question: "Which plant is commonly found in the Northern Territory?",
                answers: [
                    { answer: "Eucalyptus", isCorrect: true },
                    { answer: "Pine", isCorrect: false },
                    { answer: "Oak", isCorrect: false },
                ],
            },
            {
                question: "What type of tree is significant to the local ecosystem?",
                answers: [
                    { answer: "Baobab", isCorrect: false },
                    { answer: "Mangrove", isCorrect: true },
                    { answer: "Palm", isCorrect: false },
                ],
            },
            {
                question: "Which natural phenomenon is common in Darwin?",
                answers: [
                    { answer: "Earthquakes", isCorrect: false },
                    { answer: "Cyclones", isCorrect: true },
                    { answer: "Snow", isCorrect: false },
                ],
            },
            {
                question: "What is the main threat to Darwin’s marine life?",
                answers: [
                    { answer: "Overfishing", isCorrect: true },
                    { answer: "Oil spills", isCorrect: false },
                    { answer: "Plastic pollution", isCorrect: false },
                ],
            },
            {
                question: "Which animal is a symbol of the Northern Territory?",
                answers: [
                    { answer: "Kangaroo", isCorrect: false },
                    { answer: "Emu", isCorrect: false },
                    { answer: "Saltwater crocodile", isCorrect: true },
                ],
            },
            {
                question: "What is the best time of year to see wildlife in Darwin?",
                answers: [
                    { answer: "Summer", isCorrect: false },
                    { answer: "Winter", isCorrect: false },
                    { answer: "Wet season", isCorrect: true },
                ],
            },
            {
                question: "What conservation effort is important in the region?",
                answers: [
                    { answer: "Reforestation", isCorrect: false },
                    { answer: "Coral restoration", isCorrect: false },
                    { answer: "Marine protected areas", isCorrect: true },
                ],
            }
        ]

    },
    5: {
        title: 'Events and Festivals',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil5.png'),
        questions: [
            {
                question: "What is the biggest festival celebrated in Darwin?",
                answers: [
                    { answer: "Darwin Festival", isCorrect: true },
                    { answer: "Mindil Beach Sunset Market", isCorrect: false },
                    { answer: "National Day", isCorrect: false },
                ],
            },
            {
                question: "When does the Darwin Festival typically take place?",
                answers: [
                    { answer: "June", isCorrect: false },
                    { answer: "August", isCorrect: true },
                    { answer: "December", isCorrect: false },
                ],
            },
            {
                question: "What type of events are featured at the Darwin Festival?",
                answers: [
                    { answer: "Music and arts", isCorrect: true },
                    { answer: "Sports competitions", isCorrect: false },
                    { answer: "Food fairs", isCorrect: false },
                ],
            },
            {
                question: "What is celebrated during the NAIDOC Week in Darwin?",
                answers: [
                    { answer: "Indigenous culture and history", isCorrect: true },
                    { answer: "Environmental awareness", isCorrect: false },
                    { answer: "Local cuisine", isCorrect: false },
                ],
            },
            {
                question: "Which food-related event is popular in Darwin?",
                answers: [
                    { answer: "Taste of Darwin", isCorrect: false },
                    { answer: "Darwin Food Festival", isCorrect: false },
                    { answer: "Mindil Beach Sunset Market", isCorrect: true },
                ],
            },
            {
                question: "What type of performances can you see at the Mindil Beach Sunset Market?",
                answers: [
                    { answer: "Magic shows", isCorrect: false },
                    { answer: "Dance and music", isCorrect: true },
                    { answer: "Stand-up comedy", isCorrect: false },
                ],
            },
            {
                question: "Which festival celebrates the end of the wet season?",
                answers: [
                    { answer: "Territory Day", isCorrect: false },
                    { answer: "Dry Season Festival", isCorrect: true },
                    { answer: "Wet Season Festival", isCorrect: false },
                ],
            },
            {
                question: "What cultural event involves traditional dance and music?",
                answers: [
                    { answer: "Cultural Day", isCorrect: false },
                    { answer: "Aboriginal Festival", isCorrect: true },
                    { answer: "Community Gathering", isCorrect: false },
                ],
            },
            {
                question: "When is Territory Day celebrated?",
                answers: [
                    { answer: "July 1", isCorrect: true },
                    { answer: "August 1", isCorrect: false },
                    { answer: "September 1", isCorrect: false },
                ],
            },
            {
                question: "What is a common feature of festivals in Darwin?",
                answers: [
                    { answer: "Fireworks displays", isCorrect: false },
                    { answer: "Traditional food", isCorrect: true },
                    { answer: "Street parades", isCorrect: false },
                ],
            },
        ]

    },
    6: {
        title: 'Tourism in Darwin',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil6.png'),
        questions: [
            {
                question: "What is a popular tourist attraction in Darwin?",
                answers: [
                    { answer: "Sydney Opera House", isCorrect: false },
                    { answer: "Mindil Beach", isCorrect: true },
                    { answer: "Great Barrier Reef", isCorrect: false },
                ],
            },
            {
                question: "What type of accommodation is commonly found in Darwin?",
                answers: [
                    { answer: "Luxury hotels", isCorrect: false },
                    { answer: "Backpacker hostels", isCorrect: false },
                    { answer: "Both A and B", isCorrect: true },
                ],
            },
            {
                question: "What activity is popular among tourists at Mindil Beach?",
                answers: [
                    { answer: "Swimming", isCorrect: false },
                    { answer: "Surfing", isCorrect: false },
                    { answer: "Watching sunsets", isCorrect: true },
                ],
            },
            {
                question: "Which cruise is popular for exploring the surrounding waters?",
                answers: [
                    { answer: "Sydney Harbour Cruise", isCorrect: false },
                    { answer: "Darwin Harbour Cruise", isCorrect: true },
                    { answer: "Brisbane River Cruise", isCorrect: false },
                ],
            },
            {
                question: "What is a unique experience for tourists in Darwin?",
                answers: [
                    { answer: "Exploring a rain forest", isCorrect: false },
                    { answer: "Crocodile jumping tour", isCorrect: true },
                    { answer: "Skiing in winter", isCorrect: false },
                ],
            },
            {
                question: "What kind of tours are popular in the Northern Territory?",
                answers: [
                    { answer: "Historical tours", isCorrect: false },
                    { answer: "Nature and wildlife tours", isCorrect: true },
                    { answer: "Shopping tours", isCorrect: false },
                ],
            },
            {
                question: "What is a must-see national park near Darwin?",
                answers: [
                    { answer: "Daintree National Park", isCorrect: false },
                    { answer: "Litchfield National Park", isCorrect: true },
                    { answer: "Kakadu National Park", isCorrect: false },
                ],
            },
            {
                question: "What type of cuisine can tourists enjoy in Darwin?",
                answers: [
                    { answer: "Asian", isCorrect: true },
                    { answer: "Mediterranean", isCorrect: false },
                    { answer: "European", isCorrect: false },
                ],
            },
            {
                question: "Which type of wildlife experience is popular in Darwin?",
                answers: [
                    { answer: "Shark diving", isCorrect: false },
                    { answer: "Crocodile spotting", isCorrect: true },
                    { answer: "Whale watching", isCorrect: false },
                ],
            },
            {
                question: "What is a common souvenir to buy in Darwin?",
                answers: [
                    { answer: "Aboriginal art", isCorrect: true },
                    { answer: "Jewelry", isCorrect: false },
                    { answer: "T-shirts", isCorrect: false },
                ],
            },
        ]

    },
    7: {
        title: 'Local Cuisine',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil7.png'),
        questions: [
            {
                question: "What is a popular dish in Darwin?",
                answers: [
                    { answer: "Kangaroo steak", isCorrect: true },
                    { answer: "Sushi", isCorrect: false },
                    { answer: "Pasta", isCorrect: false },
                ],
            },
            {
                question: "Which seafood is commonly served in Darwin?",
                answers: [
                    { answer: "Barramundi", isCorrect: true },
                    { answer: "Cod", isCorrect: false },
                    { answer: "Salmon", isCorrect: false },
                ],
            },
            {
                question: "What is a traditional Indigenous food source?",
                answers: [
                    { answer: "Wheat", isCorrect: false },
                    { answer: "Bush tucker", isCorrect: true },
                    { answer: "Dairy", isCorrect: false },
                ],
            },
            {
                question: "What type of market is famous for its diverse food options?",
                answers: [
                    { answer: "Night Market", isCorrect: false },
                    { answer: "Mindil Beach Sunset Market", isCorrect: true },
                    { answer: "Farmers Market", isCorrect: false },
                ],
            },
            {
                question: "Which cuisine is particularly popular in Darwin due to its cultural diversity?",
                answers: [
                    { answer: "Asian", isCorrect: true },
                    { answer: "Mediterranean", isCorrect: false },
                    { answer: "Latin American", isCorrect: false },
                ],
            },
            {
                question: "What dessert is commonly found in Darwin?",
                answers: [
                    { answer: "Pavlova", isCorrect: true },
                    { answer: "Cheesecake", isCorrect: false },
                    { answer: "Chocolate mousse", isCorrect: false },
                ],
            },
            {
                question: "What beverage is often enjoyed during warm evenings?",
                answers: [
                    { answer: "Hot chocolate", isCorrect: false },
                    { answer: "Iced coffee", isCorrect: true },
                    { answer: "Mulled wine", isCorrect: false },
                ],
            },
            {
                question: "What is the name of a popular local brew?",
                answers: [
                    { answer: "Tooheys", isCorrect: false },
                    { answer: "XXXX Gold", isCorrect: false },
                    { answer: "Darwin Draught", isCorrect: true },
                ],
            },
            {
                question: "Which fruit is grown abundantly in the Northern Territory?",
                answers: [
                    { answer: "Apples", isCorrect: false },
                    { answer: "Mangoes", isCorrect: true },
                    { answer: "Bananas", isCorrect: false },
                ],
            },
            {
                question: "What is a common ingredient in traditional Aboriginal dishes?",
                answers: [
                    { answer: "Olive oil", isCorrect: false },
                    { answer: "Bush tomatoes", isCorrect: true },
                    { answer: "Garlic", isCorrect: false },
                ],
            },
        ]

    },
    8: {
        title: 'Sports and Recreation',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil8.png'),
        questions: [
            {
                question: "What sport is popular in Darwin due to the warm climate?",
                answers: [
                    { answer: "Ice hockey", isCorrect: false },
                    { answer: "Cricket", isCorrect: true },
                    { answer: "Snowboarding", isCorrect: false },
                ],
            },
            {
                question: "Which water activity is commonly enjoyed in Darwin?",
                answers: [
                    { answer: "Kayaking", isCorrect: true },
                    { answer: "Skiing", isCorrect: false },
                    { answer: "Surfing", isCorrect: false },
                ],
            },
            {
                question: "What is a popular event in the local sports calendar?",
                answers: [
                    { answer: "Darwin Cup", isCorrect: true },
                    { answer: "AFL Grand Final", isCorrect: false },
                    { answer: "NRL State of Origin", isCorrect: false },
                ],
            },
            {
                question: "Which sport is played at a professional level in Darwin?",
                answers: [
                    { answer: "Basketball", isCorrect: false },
                    { answer: "AFL", isCorrect: true },
                    { answer: "Rugby", isCorrect: false },
                ],
            },
            {
                question: "What recreational activity can be done at Mindil Beach?",
                answers: [
                    { answer: "Sandboarding", isCorrect: false },
                    { answer: "Beach volleyball", isCorrect: true },
                    { answer: "Kite surfing", isCorrect: false },
                ],
            },
            {
                question: "Which national sport is played in Darwin?",
                answers: [
                    { answer: "Netball", isCorrect: false },
                    { answer: "Rugby", isCorrect: false },
                    { answer: "Australian Rules Football", isCorrect: true },
                ],
            },
            {
                question: "What outdoor event is often held in Darwin?",
                answers: [
                    { answer: "Fun runs", isCorrect: true },
                    { answer: "Ice skating", isCorrect: false },
                    { answer: "Ski races", isCorrect: false },
                ],
            },
            {
                question: "Which type of fishing is popular in Darwin?",
                answers: [
                    { answer: "Freshwater fishing", isCorrect: false },
                    { answer: "Deep-sea fishing", isCorrect: true },
                    { answer: "Ice fishing", isCorrect: false },
                ],
            },
            {
                question: "What sporting facility is located in Darwin?",
                answers: [
                    { answer: "Darwin Tennis Centre", isCorrect: true },
                    { answer: "Darwin Ice Rink", isCorrect: false },
                    { answer: "Darwin Golf Club", isCorrect: false },
                ],
            },
            {
                question: "Which fitness trend has gained popularity in Darwin?",
                answers: [
                    { answer: "Pilates", isCorrect: false },
                    { answer: "Outdoor yoga", isCorrect: true },
                    { answer: "CrossFit", isCorrect: false },
                ],
            },
        ]

    },
    9: {
        title: 'Transportation in Darwin',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil9.png'),
        questions: [
            {
                question: "What is the main airport serving Darwin?",
                answers: [
                    { answer: "Brisbane Airport", isCorrect: false },
                    { answer: "Darwin International Airport", isCorrect: true },
                    { answer: "Sydney Airport", isCorrect: false },
                ],
            },
            {
                question: "Which mode of transportation is common for tourists in Darwin?",
                answers: [
                    { answer: "Bicycle", isCorrect: true },
                    { answer: "Train", isCorrect: false },
                    { answer: "Subway", isCorrect: false },
                ],
            },
            {
                question: "What is a popular way to get around the city?",
                answers: [
                    { answer: "Taxis", isCorrect: true },
                    { answer: "Ferries", isCorrect: false },
                    { answer: "Buses", isCorrect: false },
                ],
            },
            {
                question: "Which road connects Darwin to other major cities?",
                answers: [
                    { answer: "Stuart Highway", isCorrect: true },
                    { answer: "Pacific Highway", isCorrect: false },
                    { answer: "Great Northern Highway", isCorrect: false },
                ],
            },
            {
                question: "What type of public transport is available in Darwin?",
                answers: [
                    { answer: "Trams", isCorrect: false },
                    { answer: "Buses", isCorrect: true },
                    { answer: "Subways", isCorrect: false },
                ],
            },
            {
                question: "How can tourists explore the nearby national parks?",
                answers: [
                    { answer: "Guided tours", isCorrect: true },
                    { answer: "Helicopter rides", isCorrect: false },
                    { answer: "Car rentals", isCorrect: false },
                ],
            },
            {
                question: "What is the average driving speed limit in Darwin?",
                answers: [
                    { answer: "50 km/h", isCorrect: false },
                    { answer: "60 km/h", isCorrect: false },
                    { answer: "100 km/h", isCorrect: true },
                ],
            },
            {
                question: "What is a unique transport option in Darwin?",
                answers: [
                    { answer: "River cruises", isCorrect: true },
                    { answer: "Cable cars", isCorrect: false },
                    { answer: "Hot air balloons", isCorrect: false },
                ],
            },
            {
                question: "What should visitors be cautious of when driving in Darwin?",
                answers: [
                    { answer: "Traffic jams", isCorrect: false },
                    { answer: "Wildlife on roads", isCorrect: true },
                    { answer: "Road construction", isCorrect: false },
                ],
            },
            {
                question: "What is a recommended way to experience the sunset in Darwin?",
                answers: [
                    { answer: "Drive to a lookout", isCorrect: false },
                    { answer: "Take a sunset cruise", isCorrect: true },
                    { answer: "Watch from a hotel balcony", isCorrect: false },
                ],
            },
        ]

    },
    10: {
        title: 'Arts and Entertainment',
        image: require('../assets/images/easyBreezyImages/easyBreezyImageMindil10.png'),
        questions: [
            {
                question: "What is a major cultural institution in Darwin?",
                answers: [
                    { answer: "Museum and Art Gallery of the Northern Territory", isCorrect: true },
                    { answer: "National Gallery of Australia", isCorrect: false },
                    { answer: "Queensland Art Gallery", isCorrect: false },
                ],
            },
            {
                question: "Which type of art is celebrated in Darwin?",
                answers: [
                    { answer: "Contemporary art", isCorrect: false },
                    { answer: "Indigenous art", isCorrect: true },
                    { answer: "Classical art", isCorrect: false },
                ],
            },
            {
                question: "What type of performances are common at the Darwin Entertainment Centre?",
                answers: [
                    { answer: "Concerts", isCorrect: true },
                    { answer: "Sports events", isCorrect: false },
                    { answer: "Trade shows", isCorrect: false },
                ],
            },
            {
                question: "Which event showcases local artists and performers?",
                answers: [
                    { answer: "Darwin Festival", isCorrect: true },
                    { answer: "Sydney Festival", isCorrect: false },
                    { answer: "Melbourne International Arts Festival", isCorrect: false },
                ],
            },
            {
                question: "What is the focus of the Museum and Art Gallery of the Northern Territory?",
                answers: [
                    { answer: "Marine life", isCorrect: false },
                    { answer: "Indigenous culture and art", isCorrect: true },
                    { answer: "European history", isCorrect: false },
                ],
            },
            {
                question: "What is a popular form of entertainment during the dry season?",
                answers: [
                    { answer: "Outdoor cinema", isCorrect: true },
                    { answer: "Indoor theater", isCorrect: false },
                    { answer: "Sports games", isCorrect: false },
                ],
            },
            {
                question: "Which music genre is commonly associated with Darwin?",
                answers: [
                    { answer: "Classical", isCorrect: false },
                    { answer: "Country", isCorrect: false },
                    { answer: "World music", isCorrect: true },
                ],
            },
            {
                question: "What type of cultural events are often held in public parks?",
                answers: [
                    { answer: "Music festivals", isCorrect: true },
                    { answer: "Food festivals", isCorrect: false },
                    { answer: "Sports events", isCorrect: false },
                ],
            },
            {
                question: "Which famous Australian band originated in Darwin?",
                answers: [
                    { answer: "Midnight Oil", isCorrect: false },
                    { answer: "Yothu Yindi", isCorrect: true },
                    { answer: "Crowded House", isCorrect: false },
                ],
            },
            {
                question: "What is a common theme in local art exhibitions?",
                answers: [
                    { answer: "Urban life", isCorrect: false },
                    { answer: "Nature and wildlife", isCorrect: true },
                    { answer: "Historical events", isCorrect: false },
                ],
            },
        ]

    },
};

const fontIterBold = 'Inter_18pt-Bold';
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';

const EasyBreezyScreen = ({ activeScreenTab, setActiveScreenTab, testNumber }) => {
    const [selectedPrize, setSelectedPrize] = useState('');
    const [progress, setProgress] = useState(new Animated.Value(1));
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const gamePalms = useSelector(state => state.user.gamePalms);
    const palms = useSelector(state => state.user.palms);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [gameTimer, setGameTimer] = useState(120);
    const [modalVisible, setModalVisible] = useState(false);
    const [hintModalVisible, setHintModalVisible] = useState(false);
    const [hearts, setHearts] = useState(3);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isCanBuyHearts, setCanBuyHearts] = useState(true);
    const dispatch = useDispatch();
    const [hint, setHint] = useState(3);
    const [hintsAvailable, setHintsAvailable] = useState({
        showMeAnswer: true,
        hideOneAnswer: true,
    });
    const [transparentOptions, setTransparentOptions] = useState([]);

    const [isHintAvaileble, setIsHintAvaileble] = useState(true);

    const testObject = gameNumber[testNumber];
    const questions = testObject?.questions || [];

    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        console.log('testNumber', testNumber);
        console.log('typeof testNumber', typeof testNumber);
        console.log('currentQuestionNumber', currentQuestionNumber);
    }, [activeScreenTab, currentQuestionNumber, testNumber])


    useEffect(() => {
        if (selectedPrize === '1 heart') {
            setHearts(prevHearts => prevHearts + 1);
        } else if (selectedPrize === '3 hearts') {
            setHearts(prevHearts => prevHearts + 3);
        } else if (selectedPrize === '2 hearts') {
            setHearts(prevHearts => prevHearts + 2);
        } else if (selectedPrize === 'Skip question') {
            setTimeout(() => {
                nextQuestion();

            }, 100)
        } else if (selectedPrize === 'Show answer') {
            openAnswerFunc();
        } else if (selectedPrize === 'Close uncorrect') {
            try {

                hideOneAnswer();
            } catch (e) {
                console.log(e);
            }
        }

    }, [selectedPrize]);

    useEffect(() => {
        console.log('testNumber', testNumber);
    }, [testNumber])

    const hideOneAnswer = () => {
        const currentQuestion = questions[currentQuestionNumber];
        if (currentQuestion && Array.isArray(currentQuestion.answers)) {
            const incorrectOptions = currentQuestion.answers
                .map((answer, index) => ({ ...answer, index }))
                .filter((answer) => !answer.isCorrect && !transparentOptions.includes(answer.index));
            if (incorrectOptions.length > 0) {
                const randomAnswerIndex = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)].index;
                setTransparentOptions((prev) => [...prev, randomAnswerIndex]);
            }
        } else {
            console.error('Invalid question or answers:', currentQuestion);
        }
    };


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

    useEffect(() => {
        dispatch(updateUserData({ gamePalms: 25, finalPalmsGameAmount: 25 }));
        dispatch(saveUserData({ gamePalms: 25, finalPalmsGameAmount: 25 }));
    }, [])

    useEffect(() => {
        if (gameTimer > 0) {
            const timerId = setInterval(() => setGameTimer(prev => prev - 1), 1000);
            return () => clearInterval(timerId);
        } else {
            setActiveScreenTab("Loose");
        }
    }, [gameTimer]);

    const handleToAnswer = (isCorrect) => {
        if (isCorrect) {
            addGamePalms(+100);
            setConsecutiveCorrect(prev => prev + 1);
            if (consecutiveCorrect + 1 === 2) {
                setGameTimer(prev => prev + 10);
                setConsecutiveCorrect(0);
            }
        } else {
            if (gamePalms >= 5 && hearts > 1) {
                setConsecutiveCorrect(0);
            } else {
                if (gamePalms < 5) {
                    setActiveScreenTab('Loose');
                    return;
                }
                if (isCanBuyHearts) {
                    setModalVisible(true);
                    setIsPaused(true);
                }
                else setActiveScreenTab('Loose');

            }
            if (gamePalms >= 50) {
                addGamePalms(-50);

            }
            setHearts(hearts - 1)
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

    const addGamePalms = (amount) => {
        const updatedPalmsGameAmount = gamePalms + amount;
        dispatch(updateUserData({ gamePalms: updatedPalmsGameAmount, finalPalmsGameAmount: updatedPalmsGameAmount }));
        dispatch(saveUserData({ gamePalms: updatedPalmsGameAmount, finalPalmsGameAmount: updatedPalmsGameAmount }));
    };

    const subtractPalms = (amount) => {
        if (palms >= amount) {
            const updatedPalmsAmount = palms - amount;
            dispatch(updateUserData({ palms: updatedPalmsAmount }));
            dispatch(saveUserData({ palms: updatedPalmsAmount }));
        } else Alert.alert('You do not have enough palms');
    };

    const openAnswerFunc = () => {
        if (hint > 0) {
            const correctAnswerNumber = questions[currentQuestionNumber].answers.findIndex(
                (answer) => answer.isCorrect
            );
            const incorrectOptionIndices = questions[currentQuestionNumber].answers
                .map((_, index) => index)
                .filter((index) => index !== correctAnswerNumber);
            setTransparentOptions(incorrectOptionIndices);
            setHintsAvailable((prev) => ({ ...prev, showMeAnswer: false }));
        }
    };

    useEffect(() => {
        setTransparentOptions([])
    }, [currentQuestionNumber])

    const currentQuestion = questions[currentQuestionNumber];

    if (!currentQuestion) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text style={{ fontFamily: fontIterBold, fontSize: 18, color: 'red' }}>
                    Помилка: Питання не знайдено.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 p-5" style={{ width: '100%' }}>
            <View className="flex-row justify-between mx-3  items-center mb-[8px]" style={{ marginTop: dimensions.width < 380 ? 10 : 50 }}>
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

                        borderRadius: dimensions.width * 0.064,
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

                <TouchableOpacity onPress={() => { setIsPaused(true); setHintModalVisible(true) }}
                    disabled={!isHintAvaileble}>
                    <LinearGradient
                        colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                        style={{
                            width: 'auto',
                            paddingVertical: 0,
                            borderRadius: dimensions.width * 0.04,
                            opacity: isHintAvaileble ? 1 : 0.5,
                        }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0, 0.25, 0.5, 0.75, 1]}
                    >

                        <View className="flex-row" style={{ marginBottom: dimensions.width < 380 ? 10 : 0, padding: 10 }}>
                            <Image source={require('../assets/icons/hintIconMindil.png')} className="w-10 h-10" />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </View>



            <View className="flex-1 flex pt-36" style={{ bottom: (dimensions.width < 380 && currentQuestion.question.length > 14) ? 145 : 98 }}>
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
                            borderTopLeftRadius: 5, 
                            borderBottomLeftRadius: 5, 
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


                <LinearGradient
                    colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                    style={{
                        borderRadius: dimensions.width * 0.1,
                        width: '100%',
                        height: dimensions.width < 380 ? '75%' : '70%',
                        alignSelf: 'center',
                        marginTop: -80,
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
                                marginBottom: 19,
                                fontSize: dimensions.width < 380 ? dimensions.width * 0.04 : dimensions.width * 0.05,
                                color: '#D6B66B',
                                textAlign: 'center',
                            }}
                        >
                            {currentQuestionNumber + 1}. {currentQuestion.question}
                        </Text>

                        <View className="flex " style={{ width: '100%', alignSelf: 'center', alignItems: 'center' }}>
                            {questions[currentQuestionNumber].answers.map((answer, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="p-1 "
                                    onPress={() => handleToAnswer(answer.isCorrect)}
                                    style={{ opacity: transparentOptions.includes(index) ? 0 : 1, width: '80%' }}
                                    disabled={transparentOptions.includes(index)}
                                >
                                    <LinearGradient
                                        colors={['#C8A658', '#FCD997', '#FCD997', '#FCD997', '#C8A658']}
                                        style={{
                                            borderRadius: 21,
                                            paddingVertical: 0,
                                            width: '100%',
                                        }}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        locations={[0, 0.25, 0.5, 0.75, 1]}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: fontIterBold,
                                                paddingVertical: 14,
                                                fontSize: dimensions.width < 400 ? dimensions.width * 0.04 : dimensions.width * 0.05,
                                                color: 'black',
                                                textAlign: 'center',
                                                fontWeight: '700',

                                            }}
                                        >
                                            {answer.answer}

                                        </Text>
                                    </LinearGradient>

                                </TouchableOpacity>
                            ))}
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
                        height: '50%',
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
                                >{palms >= 50 ? 'Get an additional chance!' : 'You do not have enough palms in this game'}
                                    {palms < 50 && (
                                        <Image
                                            source={require("../assets/icons/palmIconMindil.png")}
                                            className="h-7 w-7 text-center items-center"
                                        />
                                    )}
                                </Text>

                            </View>


                            <View className="flex-row space-x-3 text-center pt-5" style={{ alignSelf: 'center', alignItems: 'center', width: '100%' }}>
                                <View className="flex space-y-3" >
                                    {palms >= 50 && (
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
                                    {palms >= 75 && (
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
                                    {palms >= 100 && (
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
                                    {palms >= 50 && (
                                        <TouchableOpacity
                                            className="flex-row items-center mr-4"
                                            disabled={palms < 50}
                                            onPress={() => { setHearts((prev) => prev + 1); subtractPalms(50); setModalVisible(false); setIsPaused(false); }}
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
                                    {palms >= 75 && (
                                        <TouchableOpacity
                                            className="flex-row items-center mr-4"
                                            disabled={palms < 75}
                                            onPress={() => { setHearts((prev) => prev + 2); subtractPalms(75); setModalVisible(false); setIsPaused(false); }}
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
                                    {palms >= 100 && (
                                        <TouchableOpacity
                                            className="flex-row items-center mr-4"
                                            disabled={palms < 100}
                                            onPress={() => { setHearts((prev) => prev + 3); subtractPalms(100); setModalVisible(false); setIsPaused(false); }}
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



            <Modal visible={hintModalVisible} transparent={true} animationType="slide">
                <LinearGradient
                    colors={['#0D5752', '#276F6A', '#2A706C', '#276F6A', '#0D5752']}
                    locations={[0, 0.1, 0.5, 0.9, 1]}
                    style={{
                        borderRadius: 37,
                        width: '95%',
                        justifyContent: 'center',
                        height: '80%',
                        marginVertical: 100, //?
                        alignSelf: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="flex-1  items-center shadow-xl mx-3"
                >
                    <TouchableOpacity onPress={() => { setHintModalVisible(false); setIsPaused(false); }}
                        style={{ position: 'absolute', top: 16, right: 16, zIndex: 50 }}
                    >
                        <View >
                            <XMarkIcon size={42} color='#FCD997' />
                        </View>
                    </TouchableOpacity>
                    <View className="px-4 rounded-3xl items-center shadow-lg" >
                        <View className="flex" style={{ height: '80%', }}>
                            <Text style={{
                                paddingBottom: 5,
                                fontFamily: fontIterBold,
                                fontWeight: 700,
                                textAlign: 'center',
                                marginBottom: 19,
                                fontSize: dimensions.width * 0.05,
                                color: '#FCD997',
                            }}
                            >Spin the wheel of fortune and let luck be on your side!</Text>
                            <View>
                                <Image
                                    source={require("../assets/images/fortuneTriangleMindil.png")}
                                    className="text-center items-center "
                                    style={{ alignSelf: 'center', height: dimensions.width * 0.08, width: dimensions.width * 0.08, marginBottom: 70 }}
                                />
                                <FortuneWheel selectedPrize={selectedPrize} setSelectedPrize={setSelectedPrize} setHintModalVisible={setHintModalVisible} setIsHintAvaileble={setIsHintAvaileble} />

                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </Modal>
        </View>
    );
};

export default EasyBreezyScreen;
