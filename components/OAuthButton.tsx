import { View, Text, TouchableOpacity, Image } from "react-native";
import icons from "../constants/icons";

type OAuthButtonProps = {
  onPress: (x?: any) => void;
};

const OAuthButton = ({ onPress }: OAuthButtonProps) => (
  <View>
    <View className="flex flex-row justify-center items-center gap-x-3 mb-4">
      <View className="flex-1 h-[1px] bg-neutral-200" />
      <Text className="text-lg font-pregular text-gray-200">Or</Text>
      <View className="flex-1 h-[1px] bg-neutral-200" />
    </View>
    <TouchableOpacity
      className={`flex flex-row min-w-full justify-center items-center bg-neutral-200 rounded-full py-1`}
      onPress={onPress}
      style={{ alignSelf: "flex-start" }}
    >
      <Image
        className="w-5 h-5 mx-2"
        source={icons.googleColor}
        resizeMode="contain"
      ></Image>
      <Text className="text-[20px] text-zinc-800">Sign up with Google</Text>
    </TouchableOpacity>
  </View>
);

export default OAuthButton;
