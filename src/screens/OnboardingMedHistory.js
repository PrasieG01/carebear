import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { saveUserProfile, getUserProfile } from '../utils/storage';

export default function OnboardingMedHistory({ navigation }) {
  const [meds, setMeds] = useState('');

  useEffect(() => {
    (async () => {
      const p = await getUserProfile();
      if (p && p.medicineHistory) setMeds(p.medicineHistory.join(', '));
    })();
  }, []);

  const next = async () => {
    const arr = meds.split(',').map(s=>s.trim()).filter(Boolean);
    await saveUserProfile({ medicineHistory: arr });
    navigation.navigate('HealthConditions');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Medicine history</Text>
      <Text style={{color:'#333'}}>Type medicines separated by commas (we store simple list for now)</Text>
      <TextInput style={styles.input} placeholder="Paracetamol, Cetirizine, ..." value={meds} onChangeText={setMeds} />
      <View style={{height:12}} />
      <Button title="Next" onPress={next} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:22, fontWeight:'600', marginBottom:12, color:'#000' },
  input: { borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:8, marginBottom:10 }
});
