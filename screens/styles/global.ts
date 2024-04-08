import { StyleSheet, StyleProp, TextStyle } from 'react-native';

/* style variables */
const colors = {
  darkGreen: '#004643',
  lightGreen: '#abd1c6',
  lightGreen2: '#d6f7ed',
  primaryYellow: '#f9bc60',
  stroke: '#001e1d',
  grey1: '#ccc',
  grey2: '#fefefe',
  grey3: '#fefefe',
  negative: '#dc5252',
  positive: '#06911b',
};

const primaryBtn = {
  backgroundColor: colors.primaryYellow,
  borderColor: colors.primaryYellow,
  borderWidth: 3, // increase visual weight
};

const secondaryBtn = {
  backgroundColor: colors.lightGreen,
  borderColor: colors.darkGreen,
  borderWidth: 2,
};

const buttonTitle = {
  color: colors.stroke,
  fontSize: 14,
  fontWeight: '400',
} satisfies StyleProp<TextStyle>;

export { colors, primaryBtn, secondaryBtn, buttonTitle };

/* creates global style */
const globalStyles = StyleSheet.create({
  appBg: {
    backgroundColor: colors.lightGreen,
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn,
  secondaryBtn,
});

export default globalStyles;
