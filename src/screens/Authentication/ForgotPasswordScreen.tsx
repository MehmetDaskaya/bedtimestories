import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text, Appbar } from "react-native-paper";
import { AuthScreenProps } from "../../navigation/types";

type Props = AuthScreenProps<"ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handlePasswordReset = async () => {
    setMessage(null);
    setError("");
    setLoading(true);

    try {
      setMessage("If this email exists, a reset link will be sent.");
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Reset Password" />
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

        {message ? <Text style={styles.successText}>{message}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button
          mode="contained"
          onPress={handlePasswordReset}
          loading={loading}
          style={styles.button}
        >
          Send Reset Link
        </Button>

        <Button mode="text" onPress={() => navigation.navigate("SignIn")}>
          Back to Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

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
  successText: {
    color: "green",
    textAlign: "center",
    marginBottom: 10,
  },
});
