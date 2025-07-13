import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ThoughtReframer() {
  const [thought, setThought] = useState('');
  const [result, setResult] = useState({
    distortion: '',
    response: '',
    conclusion: ''
  });

  const handleReframe = async () => {
    try {
      const res = await fetch('https://triplecolumn-production.up.railway.app/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Shift Your Perspective</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.prompt}>What thought is bothering you right now?</Text>
          <TextInput
            style={styles.input}
            placeholder="I always ruin everything…"
            value={thought}
            onChangeText={setThought}
          />

          <TouchableOpacity style={styles.reframeButton} onPress={handleReframe}>
            <Ionicons name="refresh" size={18} color="white" />
            <Text style={styles.reframeText}>Reframe Thought</Text>
          </TouchableOpacity>

          {result.distortion !== '' && (
            <>
              <View style={[styles.resultBox, styles.distortionBox]}>
                <Text style={styles.resultTitle}>Distortion</Text>
                <Text>{result.distortion}</Text>
              </View>
              <View style={[styles.resultBox, styles.responseBox]}>
                <Text style={styles.resultTitle}>Rational Response</Text>
                <Text>{result.response}</Text>
              </View>
              <View style={[styles.resultBox, styles.conclusionBox]}>
                <Text style={styles.resultTitle}>Balanced Conclusion</Text>
                <Text>{result.conclusion}</Text>
              </View>
              <TouchableOpacity style={styles.saveButton}>
                <FontAwesome name="bookmark" size={18} color="white" />
                <Text style={styles.saveText}>Save Entry</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        <View style={styles.navbar}>
          <Ionicons name="home" size={24} />
          <Ionicons name="document-text" size={24} />
          <Ionicons name="chatbubble" size={24} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: '#f0edff',
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000'
  },
  content: {
    padding: 20,
    paddingBottom: 80
  },
  prompt: {
    fontSize: 14,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15
  },
  reframeButton: {
    backgroundColor: '#3c74f4',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20
  },
  reframeText: {
    color: 'white',
    fontWeight: 'bold'
  },
  resultBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  distortionBox: { backgroundColor: '#e9e6ff' },
  responseBox: { backgroundColor: '#e6ffee' },
  conclusionBox: { backgroundColor: '#ffe6e6' },
  saveButton: {
    backgroundColor: '#3c74f4',
    borderRadius: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f0edff',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});
