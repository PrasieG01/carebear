import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { saveUserProfile, getUserProfile } from '../utils/storage';

export default function OnboardingHealthConditions({ navigation }) {
  const [conditions, setConditions] = useState('');

  useEffect(() => {
    (async () => {
      const p = await getUserProfile();
      if (p && p.currentHealthConditions) setConditions((p.currentHealthConditions || []).join(', '));
    })();
  }, []);

  const next = async () => {
    const arr = conditions.split(',').map(s=>s.trim()).filter(Boolean);
    await saveUserProfile({ currentHealthConditions: arr });
    navigation.navigate('Pregnancy');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Current health conditions</Text>
      <Text style={{color:'#333'}}>e.g. Asthma, Diabetes</Text>
      <TextInput style={[styles.input,{height:100}]} multiline placeholder="List conditions separated by commas" value={conditions} onChangeText={setConditions} />
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
