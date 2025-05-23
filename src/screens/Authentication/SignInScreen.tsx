import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { TextInput, Button, Text, Appbar } from "react-native-paper";
import { AuthScreenProps } from "../../navigation/types";
import { useAuth } from "../../context/AuthContext";

type Props = AuthScreenProps<"SignIn">;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      Alert.alert("Success", "Login successful!");
    } catch (error: any) {
      setError(error.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Button
        mode="outlined"
        onPress={() => {
          setEmail("mehmettaskaya16@gmail.com");
          setPassword("123456md");
        }}
        style={styles.button}
      >
        Fill Test Credentials
      </Button>

      <Appbar.Header>
        <Appbar.Content title="Storybook Login" />
      </Appbar.Header>

      <View style={styles.form}>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
          disabled={loading}
        >
          Sign In
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password?
        </Button>
        <Button mode="text" onPress={() => navigation.navigate("SignUp")}>
          Don't have an account? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
