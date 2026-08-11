import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function CampoFormulario({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  placeholder,
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#888"
        autoCapitalize="none"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 7,
    color: "#222",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },

  inputError: {
    borderColor: "#d32f2f",
  },

  error: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: 5,
  },
});