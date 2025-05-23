import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Text,
  RadioButton,
  Appbar,
} from "react-native-paper";
import { AuthScreenProps } from "../../navigation/types";
import { useAuth } from "../../context/AuthContext";
type Props = AuthScreenProps<"SignUp">;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<"Parent" | "Teacher" | "Child">("Parent");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, role, displayName);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("SignIn");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Create Account" />
      </Appbar.Header>

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
      <TextInput
        label="Confirm Password"
        mode="outlined"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Username (Optional)"
        mode="outlined"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />

      <Text>Select Role:</Text>
      <RadioButton.Group
        onValueChange={(value) =>
          setRole(value as "Parent" | "Teacher" | "Child")
        }
        value={role}
      >
        <View style={styles.radioGroup}>
          <RadioButton value="Parent" />
          <Text>Parent</Text>
        </View>
        <View style={styles.radioGroup}>
          <RadioButton value="Teacher" />
          <Text>Teacher</Text>
        </View>
        <View style={styles.radioGroup}>
          <RadioButton value="Child" />
          <Text>Child</Text>
        </View>
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Sign Up
      </Button>

      <Button mode="text" onPress={() => navigation.navigate("SignIn")}>
        Already have an account? Sign In
      </Button>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});
