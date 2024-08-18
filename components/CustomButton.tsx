import React from "react";
import { Pressable, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type CustomButtonProps = {
  onPress: (x?: any) => any;
  text: string;
  color: string;
  textStyle: string;
  disabled?: boolean;
};

function CustomButton({ onPress, text, color, textStyle, disabled }: CustomButtonProps) {
  return (
    <TouchableOpacity
      className={`min-w-full items-center bg-${color}-500 rounded-full py-1`}
      onPress={onPress}
      style={{ alignSelf: "flex-start"}}
      disabled={disabled}
    >
      <Text className={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
