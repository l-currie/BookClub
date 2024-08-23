import {
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
  ImageSourcePropType,
  KeyboardTypeOptions,
  TouchableWithoutFeedback
} from "react-native";
import React from "react";
import {
  TextInput,
} from "react-native-gesture-handler";

type InputWithIconProps = {
  label: string;
  placeholder: string;
  labelStyle: string;
  inputStyle: string;
  containerStyle: string;
  onChangeText: (x?: any) => void;
  keyboardType?: KeyboardTypeOptions;
  hideText?: boolean;
  icon?: ImageSourcePropType;
};

export default function InputWithIcon({
  label,
  placeholder,
  icon,
  hideText,
  labelStyle,
  inputStyle,
  containerStyle,
  onChangeText,
  keyboardType,
}: InputWithIconProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <View className="my-1 w-full">
          <Text
            className={`text-lg font-pmedium mb-1 mt-2 text-neutral-200 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-primaryLight px-3 ${containerStyle}`}
          >
            {icon && (
              <Image
                className="w-6 h-6"
                source={icon}
                resizeMode="contain"
              ></Image>
            )}
            <TextInput
              className={`rounded-full font-pregular text-base flex-1 text-left ${inputStyle} ml-1`}
              secureTextEntry={hideText}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={"#7c7c7c"}
              keyboardType={keyboardType ?? "default"}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
