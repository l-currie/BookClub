import { View, Text, Image, SafeAreaView, Keyboard, Alert } from "react-native";
import React from "react";
import InputWithIcon from "@/components/InputWithIcon";
import icons from "../../constants/icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuthButton from "@/components/OAuthButton";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/helpers/helpers";

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
  const [showSuccessModal, setShowSuccessModal] =
    React.useState<boolean>(false);

  const disableSignUpButton =
    !fields.email || !fields.username || !fields.password;
  const showVerificationModal = verification.state === "pending";

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: fields.email,
        password: fields.password,
        username: fields.username,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
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
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            username: fields.username,
            email: fields.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "sucess" });
        setShowSuccessModal(true);
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
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

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
          containerStyle="border-2 border-black rounded-full focus:border-neutral-200 p-4"
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
            onPress={onSignUpPress}
            textStyle="text-[20px] text-white"
            color="orange"
            text="Sign Up"
            disabled={disableSignUpButton}
          />
        </SafeAreaView>
        {/* TODO: Oauth signup */}
        <OAuthButton onPress={() => null} />
        <Link
          href="/(auth)/signin"
          className="text-lg font-pregular items-center text-center"
        >
          <Text className="text-neutral-200">
            Already have an account?
            <Text className="text-orange-500">Sign In</Text>
          </Text>
        </Link>
        <ReactNativeModal isVisible={showVerificationModal}>
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl h-[300px] justify-center items-center">
            <Text className="font-psemibold text-white text-2xl">
              Verify Your Email
            </Text>
            <Text className="text-neutral-300 font-pregular text-base mt-1">
              {`We have sent an email with a code to ${fields.email}`}
            </Text>
            <View className="mt-2">
              <InputWithIcon
                label="Verification Code"
                placeholder="000000"
                icon={icons.lockBlack}
                inputStyle="text-neutral-200"
                labelStyle="font-orange-500"
                containerStyle="border-2 border-black rounded-full focus:border-neutral-200 p-4"
                onChangeText={(text) => {
                  setVerification({ ...verification, code: text });
                }}
                keyboardType="numeric"
              />
            </View>
            <View className="w-full px-12 mt-8">
              <CustomButton
                onPress={() => {
                  onPressVerify();
                }}
                text="Verify Email"
                color="orange"
                textStyle="font-psemibold text-neutral-100 text-xl "
              ></CustomButton>
            </View>
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-primaryLight border-orange-500 border-2 rounded-2xl min-h-[300px] min-w-[300px] justify-center items-center">
            <Image
              source={icons.checkColor}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            ></Image>
            <Text className="font-psemibold text-white text-2xl mt-8">
              Success
            </Text>
            <Text className="text-neutral-300 font-pregular text-base mt-1">
              Your email has been Verified
            </Text>
            <View className="w-full px-12 mt-8">
              <CustomButton
                onPress={() => {
                  router.push("/(tabs)/home");
                }}
                text="Continue to Home"
                color="orange"
                textStyle="font-psemibold text-neutral-100 text-xl"
              ></CustomButton>
            </View>
          </View>
        </ReactNativeModal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default signup;
