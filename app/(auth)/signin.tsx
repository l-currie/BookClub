import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import InputWithIcon from "@/components/InputWithIcon";
import icons from "../../constants/icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const signin = () => {
  const [fields, setFields] = React.useState({
    email: "",
    password: "",
  });

  const doSignIn = () => {};

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full px-6">
        <Text className="text-4xl font-lonelycake text-orange-500 mt-16">
          Sign In
        </Text>
        <InputWithIcon
          label="Email"
          placeholder="Enter your email"
          icon={icons.emailBlack}
          labelStyle="font-orange-500"
          inputStyle="text-neutral-200"
          containerStyle="border-2 border-black rounded-full focus:border-neutral-200"
          onChangeText={(text) => {
            setFields({ ...fields, email: text });
          }}
          keyboardType="email-address"
        />
        <InputWithIcon
          label="Password"
          placeholder="Enter your password"
          icon={icons.lockBlack}
          labelStyle="font-orange-500"
          inputStyle="text-neutral-200"
          containerStyle="border-2 border-black rounded-full focus:border-neutral-200"
          onChangeText={(text) => {
            setFields({ ...fields, password: text });
          }}
          hideText={true}
        />
        <SafeAreaView className="justify-center items-center my-8 w-full">
          <CustomButton
            onPress={doSignIn}
            textStyle="text-[20px] text-white"
            color="orange"
            text="Sign In"
          />
        </SafeAreaView>
        {/* OAUTH */}
        <Link href="/(auth)/signup"> 
        <Text className="text-neutral-200">Dont have have an account? <Text className="text-orange-500">Sign Up</Text></Text></Link>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default signin;
