import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, ImageBackground, Dimensions, Image, Platform, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { set } from 'date-fns';


const articles = [
    {
        id: '1',
        title: 'Sunsets at Mindil Beach: How to capture the perfect moment',
        image: require('../assets/images/archiveImages/archiveImageMindil1.png'),
        nextImage: require('../assets/images/archiveImages/archiveImageMindil2.png'),

        articles: ['The Perfect Spot: Where to Watch the Sunset at Mindil Beach', 
            'Timing is Everything: When to Catch the Best Sunset at Mindil Beach', 
            'Creating Unforgettable Memories: How to Make the Most of a Sunset at Mindil Beach'],

        articleText: [
            'Mindil Beach in Darwin is famous for its breathtaking sunsets, and choosing the right spot is key to capturing this magical moment. Located along the tropical coastline of Australia\'s Northern Territory, the beach offers various vantage points, each with a unique perspective.\n\nTo get the best view, arrive early and head towards the western end of the beach, where the crowds are thinner, and the horizon is unobstructed. From here, you can see the sun slowly descend into the Timor Sea, painting the sky in shades of pink, orange, and purple. For a more elevated view, the rocky ledges near the Mindil Beach Casino Resort provide a stunning panoramic backdrop, perfect for photography enthusiasts.\n\nFor those seeking a more intimate experience, pack a picnic and sit along the beach, letting the sound of the waves enhance the tranquility of the moment. Pro tip: the sunsets are most spectacular during the dry season (May to October), when the skies are clear, and the light is at its softest, making it the ideal time for sunset watching.',
            'One of the secrets to experiencing the perfect sunset at Mindil Beach is knowing the right time to be there. In Darwin, sunset times vary throughout the year, so planning ahead can make all the difference. Typically, sunsets occur between 6:00 PM and 7:00 PM, but the ideal time to arrive is at least an hour earlier.\n\nWhy so early? The golden hour — the hour before sunset — is when the light begins to soften, creating beautiful shadows and reflections along the shoreline. As the sun gets closer to the horizon, the sky shifts into vibrant hues, and you’ll have ample time to find the perfect spot. Keep an eye on the weather forecast; clear skies offer the most vivid sunsets, but a few scattered clouds can add drama and texture to the scene.\n\nFor the best experience, try to visit Mindil Beach during the dry season. This time of year, from May to October, offers consistently stunning skies and mild weather, making the sunset even more enjoyable. If you\'re visiting during the wet season, the sunsets can be equally beautiful, though more unpredictable, often framed by dramatic tropical thunderstorms in the distance.',
            'Watching a sunset at Mindil Beach is more than just witnessing the beauty of nature; it’s about creating a memorable experience. To turn this into a truly unforgettable moment, consider blending the visual spectacle with some personal touches.\n\nStart your evening with a visit to the famous Mindil Beach Sunset Market, which runs from late April to October. You can pick up a variety of local food from diverse cuisines — ranging from fresh seafood to Asian street food — and find a cozy spot on the sand to enjoy a picnic as the sky begins to change color. The market atmosphere, combined with live music and local artisans selling their crafts, creates a festive backdrop for the evening.\n\nIf you\'re looking to capture the perfect photo, bring along a camera or smartphone with a good low-light setting. Tripods can help stabilize your shots during the fading light, ensuring that you don’t miss the radiant colors of the setting sun. Try framing your shots with silhouettes of palm trees or the market stalls in the foreground to add a creative twist.\n\nLastly, don’t rush to leave as soon as the sun dips below the horizon. The afterglow often offers some of the most beautiful moments, with the sky continuing to evolve in color for 20-30 minutes after sunset. Let this peaceful transition from day to night be the perfect close to a magical experience at Mindil Beach.'
        ],
    },
    {
        id: '2',
        title: 'Mindil Beach Sunset Market: History, food and crafts',
        previousImage: require('../assets/images/archiveImages/archiveImageMindil1.png'),
        image: require('../assets/images/archiveImages/archiveImageMindil2.png'),
        nextImage: require('../assets/images/archiveImages/archiveImageMindil3.png'),

        articles: ['The History of Mindil Beach Sunset Market: How One of Darwin’s Most Vibrant Events Began', 
            'Food at Mindil Beach Sunset Market: A Culinary Journey Around the World',
            'Local Crafts at Mindil Beach Sunset Market: Handmade Treasures from Darwin’s Artisans'
        ],

        articleText: [
            'The Mindil Beach Sunset Market has become a cornerstone of Darwin\'s cultural life, attracting thousands of locals and tourists each year. But how did this famous market come to be, and why has it grown into such a popular event? The market’s story began in 1987 when a small group of local vendors gathered on Mindil Beach to sell their products. At first, it was a modest affair, with only a handful of stalls and a limited selection of food. However, over time, the market began to gain attention due to its unique atmosphere and stunning beachside location. One of the key factors in its success was the perfect pairing of spectacular sunsets with fresh street food, which quickly became the market\'s main attraction. Today, the Mindil Beach Sunset Market has grown into one of Darwin’s most iconic events. Held during the dry season (from April to October), the market represents the multicultural heart of Darwin, offering visitors a chance to experience a true local tradition. It is not just a place to eat and shop, but a celebration of community, creativity, and the laid-back coastal lifestyle that defines the city.', 
            'One of the biggest draws of the Mindil Beach Sunset Market is the incredible variety of food on offer. Whether you’re a local or a visitor, the market invites you to embark on a culinary journey that reflects Darwin\'s diverse cultural heritage. With over 60 food stalls, the market offers a taste of nearly every corner of the globe. Southeast Asian dishes like Thai pad see ew, Vietnamese pho, and Indonesian satay skewers are a staple here. You’ll also find vibrant Indian curries, Middle Eastern kebabs, and even Italian-style wood-fired pizzas. For those looking to try something local, there’s a range of Australian dishes, including freshly caught barramundi and crocodile sausages. A visit to the market isn’t complete without sampling some of its famous tropical desserts. Fresh mango smoothies, coconut ice cream, and hand-crafted gelato are perfect ways to cool down on a balmy Darwin evening. The market is also known for its incredible variety of vegetarian, vegan, and gluten-free options, ensuring there’s something for everyone to enjoy. The dining experience at Mindil Beach Sunset Market is more than just food—it’s the combination of flavors, the colorful setting, and the backdrop of the sun setting over the Timor Sea that creates a magical experience for all who visit.',
            'In addition to its culinary offerings, Mindil Beach Sunset Market is a treasure trove of local crafts and artisan products. From handmade jewelry to Aboriginal art, the market provides visitors with the opportunity to take home a unique piece of Darwin’s creative spirit. Many of the stalls are run by local artists who have honed their craft over decades. One of the highlights is the variety of traditional Aboriginal art available for purchase. From vibrant dot paintings to intricately woven baskets, these works often tell stories of the land, its people, and its wildlife. Purchasing such items supports local Indigenous communities and keeps these artistic traditions alive. You can also find an array of handcrafted goods, including leather products, glassware, home décor, and clothing. Local jewelers often showcase pieces made from native materials such as pearls, shells, and semi-precious stones sourced from the Northern Territory. The market also offers a range of souvenirs and gifts that reflect the natural beauty of the region. Whether it’s a handmade soap infused with Kakadu plum or a sculpture carved from locally sourced wood, the craftsmanship and care put into each piece are evident. Mindil Beach Sunset Market is more than just a place to shop—it\'s a celebration of Darwin\'s creative community, where visitors can connect with the artisans and hear the stories behind the items they purchase.'

        ],
    },
    {
        id: '3',
        title: 'Larrakia Culture: Influence on Mindil Beach and Darwin',
        previousImage: require('../assets/images/archiveImages/archiveImageMindil2.png'),
        image: require('../assets/images/archiveImages/archiveImageMindil3.png'),
        nextImage: require('../assets/images/archiveImages/archiveImageMindil4.png'),

        articles: ['The Culture of the Larrakia People: A Historical Perspective', 
            'Larrakia Traditions and Customs: Shaping the Identity of Mindil Beach', 
            'The Impact of Larrakia Culture on Modern Darwin: A Cultural Revival'
        ],

        articleText: [
            'The Larrakia people are the traditional custodians of the land around Darwin and Mindil Beach, with a rich cultural heritage that dates back thousands of years. Their history is intertwined with the landscape, and their connection to the land informs their customs, beliefs, and way of life. The Larrakia people have a deep spiritual connection to the land and sea, viewing themselves as caretakers of the natural environment. This connection is reflected in their Dreamtime stories, which convey the spiritual significance of various locations, including Mindil Beach. These stories serve as a means of passing down knowledge, history, and cultural values from one generation to the next. The Larrakia culture has been shaped by their experiences over centuries, including the impacts of colonization and modernity. Despite these challenges, the Larrakia have maintained their cultural identity and continue to actively engage in cultural practices. Events like cultural festivals, art exhibitions, and storytelling sessions are essential for preserving their traditions and sharing them with the broader community. The influence of Larrakia culture on Mindil Beach is palpable. The area not only serves as a historical site but also as a place where Larrakia people gather to celebrate their heritage, engage in cultural practices, and educate visitors about their customs and beliefs.',
            'The Larrakia people\'s traditions and customs play a vital role in shaping the identity of Mindil Beach and the surrounding areas. Their cultural practices include art, music, dance, and storytelling, all of which are integral to their community and social fabric. Art holds a prominent place in Larrakia culture, with many artists drawing inspiration from their ancestral lands and cultural stories. Traditional Larrakia art often features motifs representing local flora, fauna, and significant Dreamtime stories. The presence of local artisans at events like the Mindil Beach Sunset Market allows visitors to appreciate and purchase authentic Larrakia art, thereby supporting the artists and fostering cultural exchange. Additionally, music and dance are vital forms of expression for the Larrakia people. Traditional songs often tell stories of the land and sea, serving as a connection to their ancestors. Dance ceremonies, performed during community gatherings, are not just artistic expressions but also rituals that honor their heritage and ancestors. The Larrakia people actively participate in local events, fostering a sense of community and connection with non-Indigenous residents. This cultural exchange enriches the Mindil Beach experience, making it not only a place for leisure but also a vibrant cultural hub that celebrates the richness of Larrakia traditions.',
            'The Larrakia people\'s influence extends beyond Mindil Beach to the broader community of Darwin, where their culture is experiencing a revival in contemporary society. Efforts to recognize and celebrate Larrakia culture have been gaining momentum, resulting in a greater appreciation for their contributions to the city\'s identity. One significant initiative is the incorporation of Larrakia language and cultural practices in local schools and community programs. This educational approach aims to promote understanding and respect for Indigenous cultures among young people, fostering a more inclusive community. Local events, such as cultural festivals and workshops, provide opportunities for residents and visitors to engage with Larrakia culture firsthand. Mindil Beach, with its breathtaking sunsets and vibrant market, serves as a focal point for cultural exchange. The presence of Larrakia people at the market not only enhances the cultural atmosphere but also creates an opportunity for dialogue and connection between cultures. Visitors can learn about traditional practices, such as fishing and bush tucker, which highlight the sustainable relationship the Larrakia have with their environment. As Darwin embraces its multicultural identity, the influence of the Larrakia people becomes increasingly significant. Their cultural revival is a testament to their resilience and adaptability, reminding the community of the importance of honoring the land’s original custodians. Through ongoing collaboration and cultural celebration, the legacy of the Larrakia people continues to thrive, enriching the cultural landscape of Mindil Beach and Darwin.'
        ],
    },
    {
        id: '4',
        title: 'Ecology and nature around Mindil Beach',
        previousImage: require('../assets/images/archiveImages/archiveImageMindil3.png'),
        image: require('../assets/images/archiveImages/archiveImageMindil4.png'),
        nextImage: require('../assets/images/archiveImages/archiveImageMindil5.png'),
        articles: ['The Unique Ecosystem of Mindil Beach', 
            'Conservation Efforts at Mindil Beach', 
            'Flora and Fauna of Mindil Beach'
        ],
        articleText: [
            'Mindil Beach, located in Darwin, Australia, boasts a diverse coastal ecosystem comprising tidal flats, mangroves, and coastal dunes. These habitats support a rich array of marine life, including fish, crabs, and mollusks. Seagrass beds serve as essential feeding grounds for turtles and dugongs, while mangroves provide shelter for birds and filter pollutants, enhancing water quality. The coastal dunes are home to unique plant species that stabilize the sands and support small animals. This intricate interplay between the beach, mangroves, and dunes creates a thriving environment, making Mindil Beach a vital ecological hotspot in the Northern Territory.',
            'Mindil Beach faces environmental challenges due to human activity, making conservation efforts essential. Local organizations and the Larrakia people are implementing initiatives to protect this unique area. Community clean-up events help raise awareness about littering and its effects on the environment, fostering a sense of responsibility among residents and visitors. Education plays a crucial role, with workshops that inform the public about the local ecosystem and sustainable practices. Collaborations with the Larrakia people integrate traditional ecological knowledge into modern conservation strategies, ensuring that Mindil Beach\'s natural beauty and cultural significance are preserved for future generations.',
            'The area around Mindil Beach showcases a rich tapestry of flora and fauna. Coastal vegetation includes salt-tolerant species like mangroves and beach grass, which stabilize dunes and provide habitats for various animals. Birdwatchers can spot numerous species, including herons and migratory birds. In the waters off Mindil Beach, diverse marine life thrives, with colorful reef fish, turtles, and dugongs utilizing the nearby reef systems. Terrestrial species, including reptiles and small mammals, also inhabit the dunes and surrounding areas. This rich biodiversity highlights Mindil Beach\'s ecological importance and underscores the need for ongoing conservation efforts to protect its unique environments.'
        ],
    },
    {
        id: '5',
        previousImage: require('../assets/images/archiveImages/archiveImageMindil4.png'),
        image: require('../assets/images/archiveImages/archiveImageMindil5.png'),
        nextImage: require('../assets/images/archiveImages/archiveImageMindil6.png'),
        title: 'Events and festivals on Mindil Beach: What\'s in store for you this season?',

        articles: ['Upcoming Events at Mindil Beach: A Seasonal Overview', 
            'Cultural Celebrations: Festivals Reflecting the Spirit of Mindil Beach', 
            'Mindil Beach Sunset Markets: A Culinary and Artistic Extravaganza'
        ],

        articleText: [
            'Mindil Beach is a vibrant hub for events and festivals throughout the year, drawing locals and tourists alike. As the season unfolds, visitors can look forward to a variety of activities, including cultural celebrations, food festivals, and music events. This season, the Mindil Beach Sunset Market continues to be a highlight, offering an array of food stalls featuring local delicacies and international cuisine. Visitors can indulge in everything from traditional Aboriginal dishes to Asian street food while enjoying live music performances. Additionally, special events like the Mindil Beach Sunset Festival are set to take place, where families can enjoy entertainment, art displays, and cultural performances, creating a lively atmosphere for all. As the year progresses, don’t miss seasonal events such as beach clean-ups and outdoor movie nights, promoting community involvement and environmental awareness. The eclectic mix of events at Mindil Beach ensures that there’s something for everyone, making it a must-visit destination for seasonal festivities.',
            'Mindil Beach is not only known for its picturesque sunsets but also for its rich cultural heritage, showcased through various festivals. This season, the beach will host a series of cultural celebrations that highlight the traditions and history of the Larrakia people, the traditional custodians of the land. One notable event is the Larrakia Cultural Festival, where visitors can immerse themselves in Aboriginal culture through storytelling, dance performances, and art exhibitions. Local artisans will showcase their crafts, allowing attendees to purchase unique handmade items while supporting Indigenous artists. These festivals provide an opportunity for cultural exchange, fostering respect and understanding among different communities. In addition to celebrating Indigenous culture, events like the Darwin Festival bring together diverse communities for music, dance, and food. These celebrations contribute to the vibrant atmosphere of Mindil Beach, making it a cultural melting pot where visitors can experience the true spirit of the region.',
            'The Mindil Beach Sunset Market is a cornerstone of the local events calendar, attracting thousands each week with its enticing mix of food, art, and entertainment. As the sun sets over the horizon, the market comes alive, offering an unforgettable experience for all ages. This season, visitors can expect an even more diverse selection of food stalls, featuring everything from fresh seafood and gourmet desserts to vegetarian options and gluten-free treats. The emphasis on local produce ensures that guests can taste the flavors of the Northern Territory. In addition to culinary delights, the market features live performances from local musicians and entertainers, creating a festive atmosphere. Artisans display their handmade crafts, allowing attendees to browse and purchase unique souvenirs that reflect the region\'s creativity. With its combination of delicious food, engaging entertainment, and a warm community spirit, the Mindil Beach Sunset Market is an event not to be missed this season. Whether you\'re a foodie, art lover, or just looking for a fun evening out, the market has something special for everyone.'
        ],
    },
    {
        id: '6',
        title: 'Sports and active recreation on Mindil Beach',
        previousImage: require('../assets/images/archiveImages/archiveImageMindil5.png'),
        image: require('../assets/images/archiveImages/archiveImageMindil6.png'),
        articles: ['Beach Yoga: Finding Zen at Mindil Beach', 
            'Volleyball Fun: Join the Action at Mindil Beach', 
            'Kayaking Adventures: Explore the Waters Around Mindil Beach'
        ],
        articleText: [
            'Mindil Beach is not only famous for its stunning sunsets but also for its peaceful atmosphere, making it an ideal location for yoga enthusiasts. Beach yoga sessions take place regularly, offering participants a chance to connect with nature while enjoying the soothing sounds of the waves. Practicing yoga on the beach provides a unique experience, combining the benefits of traditional yoga with the rejuvenating effects of fresh sea air and gentle ocean breezes. Whether you\'re a beginner or an experienced yogi, these sessions cater to all levels and promote mindfulness, flexibility, and relaxation. Instructors often guide participants through various poses while encouraging them to focus on their breath and the beauty of their surroundings. Many classes are held during sunrise or sunset, providing breathtaking views that enhance the overall experience. After the session, participants can take a refreshing swim or simply relax on the beach, making it a perfect way to start or end the day.',
            'For those looking to engage in a more competitive sport, beach volleyball at Mindil Beach is a popular option. The sandy shores provide an excellent setting for both casual and organized games, attracting players of all ages and skill levels. Local leagues and casual pickup games are common, encouraging friendly competition and camaraderie among players. The beach volleyball courts are easily accessible, and visitors can join in or simply watch the action unfold while soaking up the sun. Many players appreciate the social aspect of beach volleyball, as it fosters community connections and brings together people from various backgrounds. Whether you\'re looking to play a quick game with friends or join a local league, Mindil Beach offers an inviting atmosphere for volleyball enthusiasts.',
            'Kayaking is another fantastic way to enjoy the beautiful surroundings of Mindil Beach. The calm waters offer an excellent opportunity for both beginners and experienced kayakers to explore the coastline and nearby mangroves. Several local operators provide kayak rentals and guided tours, allowing visitors to discover the area\'s rich marine life and stunning scenery. Paddling through the waters, you may encounter various species of fish, sea turtles, and even dolphins, making each outing an exciting adventure. Kayaking is not only a great way to enjoy the outdoors, but it also provides a full-body workout. Whether you prefer a leisurely paddle or a more intense workout, the flexible options available at Mindil Beach cater to all preferences. In addition to the physical benefits, kayaking offers a chance to connect with nature and appreciate the serene beauty of the Northern Territory\'s coastline. As you glide through the waters, the vibrant colors of the sunset create a picturesque backdrop, making every kayaking experience at Mindil Beach truly memorable.'

        ],
    },
];


const StyledView = styled(View);
const fontAbhayaSemiBold = 'AbhayaLibre-SemiBold';
const fontIterBold = 'Inter_18pt-Bold';

const ArchiveScreen = ({ setActiveScreenTab }) => {
    const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const slidesRef = useRef(null);
    const scrollHorizontal = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const [isArticleVisible, setIsArticleVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState({ title: '', content: '' });
    const [rating, setRating] = useState(0);

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

    const truncateTitle = (text) => (text.length > 25 ? `${text.substring(0, 25)}...` : text);

    const renderItem = ({ item }) => (
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
                            marginRight: 10,
                        }}
                        resizeMode="cover"
                    />
                )}

                <Image
                    source={item.image}
                    style={{
                        width: dimensions.width * 0.7,
                        height: dimensions.height * 0.17,
                        marginTop: 37,
                        borderRadius: 37,
                    }}
                    resizeMode="cover"
                />

                {item.nextImage && (
                    <Image
                        source={item.nextImage}
                        style={{
                            width: dimensions.width * 0.1,
                            height: dimensions.height * 0.17,
                            marginTop: 37,
                            borderRadius: 37,
                            marginLeft: 10,
                        }}
                        resizeMode="cover"
                    />
                )}
            </View>
        </SafeAreaView>
    );

    return (
        <SafeAreaView className="flex-1 items-center  justify-between">

            {!isArticleVisible && (
                <StyledView className="flex-[3]">
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
                        Sunsets at Mindil Beach: How to capture the perfect moment
                    </Text>

                    <View>


                        {articles[currentArticleIndex].articles.map((article, index) => (
                            <TouchableOpacity
                                key={index}
                                className="py-2 px-4 mt-2"
                                onPress={() => {
                                    setSelectedArticle({
                                        title: article, content: articles[currentArticleIndex].articleText[index]
                                    })
                                    setIsArticleVisible(true);
                                }}
                            >
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
                                        {truncateTitle(article)}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <FlatList
                        data={articles}
                        renderItem={renderItem}
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
                </StyledView>
            )}
            {isArticleVisible && (
                <SafeAreaView>

                    <ScrollView style={{ flex: 1, marginTop: 10, marginBottom: dimensions.width < 380 ? 80 : 50 }}>
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
                                    {selectedArticle.title}
                                </Text>

                                <Text style={{
                                    paddingHorizontal: 30,
                                    fontFamily: fontAbhayaSemiBold,
                                    fontWeight: 700,
                                    textAlign: 'left',
                                    marginBottom: 19,
                                    fontSize: dimensions.width * 0.05,
                                    color: 'white',
                                }}
                                >
                                    {selectedArticle.content}
                                </Text>
                            </View>

                        </LinearGradient>

                        <TouchableOpacity onPress={() => {
                            setIsArticleVisible(false);
                            setSelectedArticle({ title: '', content: '' });
                            setActiveScreenTab('Archive');
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
                                    Back
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </ScrollView>
                </SafeAreaView>
            )}



        </SafeAreaView>
    );
};

export default ArchiveScreen;
