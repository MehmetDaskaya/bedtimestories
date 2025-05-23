import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  SignIn: undefined; // ✅ Renamed from "SignInScreen" to "SignIn"
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Library: undefined;
  Create: undefined;
  Profile: undefined;
  Settings: undefined;
  StoryPage: {
    bookId: string;
    mode?: string;
  };
};

// Navigation prop type for screens
export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
