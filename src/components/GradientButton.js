import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const GradientButton = ({
  title,
  onPress,
  icon,
  colors = ["#3b82f6", "#8b5cf6"],
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {icon && (
            <Image source={icon} style={{ width: 18, height: 18 }} />
          )}
          <Text
            style={[
              {
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};