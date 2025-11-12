    // components/CustomPressable.js
    import React from 'react';
    import { Pressable, Text, StyleSheet } from 'react-native';
    import { globalTextStyles } from '../styles/globalStyles';

    const DateDisplay = ({ children, title='',date='', style={}, textStyle='', onPress='', ...props }) => {
      // const getPressableStyle = ({ pressed }) => {
      //   const baseStyle = globalPressableStyles.basePressable;
      //   const pressedStyle = pressed ? globalPressableStyles.pressedState : {};
      //   const localStyle = typeof style === 'function' ? style({ pressed }) : style;

      //   return StyleSheet.flatten([baseStyle, pressedStyle, localStyle]);
      // };

      const getTextStyle = () => {
        const baseTextStyle = globalTextStyles.textStyle;
        return StyleSheet.flatten([baseTextStyle, textStyle]);
      };

      return (
        <Pressable style={getTextStyle} onPress={onPress} {...props}>
          {typeof children === 'string' ? <Text style={getTextStyle()}>{children}</Text> : children}
          {typeof date === 'string' ? <Text style={getTextStyle()}>{date}</Text> : date}
        </Pressable>
      );
    };

    export default DateDisplay;