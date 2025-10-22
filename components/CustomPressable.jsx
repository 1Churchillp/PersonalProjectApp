    // components/CustomPressable.js
    import React from 'react';
    import { Pressable, Text, StyleSheet } from 'react-native';
    import { globalPressableStyles } from '../styles/globalStyles';

    const CustomPressable = ({ children, title='', style={}, textStyle='', onPress='', ...props }) => {
      const getPressableStyle = ({ pressed }) => {
        const baseStyle = globalPressableStyles.basePressable;
        const pressedStyle = pressed ? globalPressableStyles.pressedState : {};
        const localStyle = typeof style === 'function' ? style({ pressed }) : style;

        return StyleSheet.flatten([baseStyle, pressedStyle, localStyle]);
      };

      const getTextStyle = () => {
        const baseTextStyle = globalPressableStyles.textStyle;
        return StyleSheet.flatten([baseTextStyle, textStyle]);
      };

      return (
        <Pressable style={getPressableStyle} onPress={onPress} {...props}>
          {typeof children === 'string' ? <Text style={getTextStyle()}>{children}</Text> : children}
        </Pressable>
      );
    };

    export default CustomPressable;