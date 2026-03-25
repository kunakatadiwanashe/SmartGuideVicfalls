import { StyleSheet } from 'react-native';

export const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const createStyles = StyleSheet.create;

