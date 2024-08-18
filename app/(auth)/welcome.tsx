import {
    View,
    Text,
    Image,
    SafeAreaView,
    ScrollView,
    Pressable,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import images from "../../constants/images"
  import { router } from "expo-router";
  import Swiper from "react-native-swiper";
  import { welcomeScreen } from "@/constants";
  import CustomButton from "@/components/CustomButton";
  
  const index = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeCard, setActiveCard] = useState<number>(0);
  
    const isLastSlide = activeCard == (welcomeScreen.length - 1)
  
    return (
      <GestureHandlerRootView>
        <SafeAreaView className="bg-primary h-full">
            <View className="w-full h-full">
              <Swiper
                ref={swiperRef}
                loop={false}
                dot={
                  <View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
                }
                activeDot={
                  <View className="w-[32px] h-[4px] mx-1 bg-orange-500 rounded-full" />
                }
                onIndexChanged={(idx) => setActiveCard(idx)}
              >
                {welcomeScreen.map((card) => (
                  <View className="w-full items-center mt-24">
                    <Text className="text-4xl font-lonelycake text-orange-500">
                      {card.title}
                    </Text>
                    <Image
                      source={card.image}
                      className="w-[300px] h-[300px] m-8"
                      resizeMode="contain"
                    />
                    <Text className="text-xl text-white px-6">
                      {card.description}
                    </Text>
                    <View className="items-center m-8 px-8 w-full">
                      <CustomButton
                        onPress={() => {
                          isLastSlide ? router.replace("/(auth)/signup") : swiperRef.current?.scrollBy(1) 
                        }}
                        textStyle="text-[28px] text-white"
                        color="orange"
                        text={card.id === 3 ? "Continue" : "Next"}
                      />
                    </View>
                  </View>
                ))}
              </Swiper>
            </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  };
  
  export default index;
  