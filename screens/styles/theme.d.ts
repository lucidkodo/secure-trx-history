import '@rneui/themed';

declare module '@rneui/themed' {
  export interface ButtonProps {
    isPrimary?: boolean;
  }

  export interface ComponentTheme {
    Button: Partial<ButtonProps>;
  }
}
