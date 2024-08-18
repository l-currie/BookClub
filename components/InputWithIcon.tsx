import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

type InputWithIconProps = {
  label: string;
  placeholder: string;
  icon?: ImageSourcePropType;
  hideText?: boolean;
  labelStyle: string;
  inputStyle: string;
  containerStyle: string;
  onChangeText: (x?: any) => void;
};

export default function InputWithIcon({
  label,
  placeholder,
  icon,
  hideText,
  labelStyle,
  inputStyle,
  containerStyle,
  onChangeText
}: InputWithIconProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
      onPress={() => {Keyboard.isVisible() ?? Keyboard.dismiss}}>
        <ScrollView className="my-1 w-full">
          <Text className={`text-lg font-pmedium mb-3 text-neutral-200 ${labelStyle}`}>{label}</Text>
          <View className={`flex flex-row justify-start items-center relative bg-primaryLight px-3 ${containerStyle}`}>
            {icon && <Image className="w-6 h-6" source={icon}></Image>}
            <TextInput
              className={`rounded-full p-4 font-pregular text-base flex-1 text-left ${inputStyle}`}
              secureTextEntry={hideText}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={'#7c7c7c'}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
