import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { sendThought } from './services/api';

export default function App() {
  const [thought, setThought] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await sendThought(thought);
      setResult(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Triple Column CBT Tool</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your thought..."
        multiline
        value={thought}
        onChangeText={setThought}
      />

      <Button title={loading ? "Processing..." : "Process Thought"} onPress={handleSubmit} disabled={loading} />

      {result && (
        <View style={styles.resultContainer}>
          <View style={styles.card}>
            <Text style={styles.label}>Distortion:</Text>
            <Text style={styles.text}>{result.distortion}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Rational Response:</Text>
            <Text style={styles.text}>{result.response}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Conclusion:</Text>
            <Text style={styles.text}>{result.conclusion}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    minHeight: 80,
    textAlignVertical: 'top'
  },
  resultContainer: {
    marginTop: 30,
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 16
  }
});
