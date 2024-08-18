import { View, Text, Image, SafeAreaView } from "react-native";
import React from "react";
import InputWithIcon from "@/components/InputWithIcon";
import icons from "../../constants/icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuthButton from "@/components/OAuthButton";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [fields, setFields] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = React.useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: fields.email,
        password: fields.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        //TODO: Create a user in the DB
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "sucess" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };
  const doSignup = () => {};
  const doOauthSignUp = () => {};

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full px-6">
        <Text className="text-4xl font-lonelycake text-orange-500 mt-16">
          Create Your Account
        </Text>
        <InputWithIcon
          label="Username"
          placeholder="Enter your username"
          icon={icons.userBlack}
          labelStyle="font-orange-500"
          inputStyle="text-neutral-200"
          containerStyle="border-2 border-black rounded-full focus:border-neutral-200"
          onChangeText={(text) => {
            setFields({ ...fields, username: text });
          }}
        />
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
            onPress={doSignup}
            textStyle="text-[20px] text-white"
            color="orange"
            text="Sign Up"
          />
        </SafeAreaView>
        <OAuthButton onPress={doOauthSignUp} />
        <Link
          href="/(auth)/signin"
          className="text-lg font-pregular items-center text-center"
        >
          <Text className="text-neutral-200">
            Already have an account?
            <Text className="text-orange-500">Sign In</Text>
          </Text>
        </Link>
      </SafeAreaView>

      <ReactNativeModal isVisible={true}>
        <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl min-h-[300px] min-w-[300px]">

        </View>

      </ReactNativeModal>
    </GestureHandlerRootView>
  );
};

export default signup;
