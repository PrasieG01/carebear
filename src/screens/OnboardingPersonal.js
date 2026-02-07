import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { saveUserProfile, getUserProfile } from '../utils/storage';

export default function OnboardingPersonal({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      const p = await getUserProfile();
      if (p) {
        setFirstName(p.firstName || '');
        setLastName(p.lastName || '');
        setDob(p.dob || '');
        setGender(p.gender || '');
        setPhone(p.phone || '');
        setEmail(p.email || '');
      }
    })();
  }, []);

  const next = async () => {
    await saveUserProfile({ firstName, lastName, dob, gender, phone, email });
    navigation.navigate('MedHistory');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tell us about you</Text>
      <TextInput style={styles.input} placeholder="First name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Date of birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
      <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
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
