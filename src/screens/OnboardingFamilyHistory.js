import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { saveUserProfile, getUserProfile } from '../utils/storage';

export default function OnboardingFamilyHistory({ navigation }) {
  const [family, setFamily] = useState('');

  useEffect(() => {
    (async ()=>{
      const p = await getUserProfile();
      if (p && p.familyHistory) setFamily(p.familyHistory.join(', '));
    })();
  }, []);

  const next = async () => {
    const arr = family.split(',').map(s=>s.trim()).filter(Boolean);
    await saveUserProfile({ familyHistory: arr });
    navigation.navigate('Summary');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Family medical history</Text>
      <Text style={{color:'#333'}}>e.g. Heart disease, Hypertension</Text>
      <TextInput style={[styles.input,{height:120}]} multiline placeholder="List family conditions" value={family} onChangeText={setFamily} />
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
