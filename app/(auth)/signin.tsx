import { Text, SafeAreaView, Alert } from "react-native";
import React from "react";
import InputWithIcon from "@/components/InputWithIcon";
import icons from "../../constants/icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const signin = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [fields, setFields] = React.useState({
    email: "",
    password: "",
  });

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: fields.email,
        password: fields.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      Alert.alert("Error signing in", err.errors[0].longMessage)
    }
  }, [isLoaded, fields])

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
          containerStyle="border-2 border-black rounded-full focus:border-neutral-200 p-4"
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
          containerStyle="border-2 border-black rounded-full focus:border-neutral-200 p-4"
          onChangeText={(text) => {
            setFields({ ...fields, password: text });
          }}
          hideText={true}
        />
        <SafeAreaView className="justify-center items-center my-8 w-full">
          <CustomButton
            onPress={onSignInPress}
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
