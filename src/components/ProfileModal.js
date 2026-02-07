import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getUserProfile, saveUserProfile } from '../utils/storage';

export default function ProfileModal({ onClose }) {
  const [profile, setProfile] = useState(null);

  useEffect(()=>{ (async()=>{ const p = await getUserProfile(); setProfile(p || {}); })(); }, []);

  const generateReport = () => {
    if(!profile) return;
    const report = {
      name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
      dob: profile.dob || '',
      contact: { email: profile.email || '', phone: profile.phone || '' },
      medicineHistory: profile.medicineHistory || [],
      currentHealthConditions: profile.currentHealthConditions || [],
      pregnant: profile.pregnant || false,
      familyHistory: profile.familyHistory || []
    };

    // For now: show the JSON in an alert and suggest copying/sharing.
    Alert.alert('Generated report (JSON)', JSON.stringify(report, null, 2).slice(0,2000), [
      { text: 'Close' }
    ], { cancelable:true });

    // NOTE: Integrate expo-file-system + expo-sharing or react-native-pdf to export as file/PDF for doctor.
  };

  if(!profile) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Name:</Text> {profile.firstName} {profile.lastName}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>DOB:</Text> {profile.dob}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Email:</Text> {profile.email}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Phone:</Text> {profile.phone}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Medicines:</Text> {(profile.medicineHistory||[]).join(', ')}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Conditions:</Text> {(profile.currentHealthConditions||[]).join(', ')}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Pregnant:</Text> {profile.pregnant ? 'Yes' : 'No'}</Text>
      <Text style={styles.item}><Text style={{fontWeight:'600'}}>Family history:</Text> {(profile.familyHistory||[]).join(', ')}</Text>

      <View style={{height:16}} />
      <Button title="Generate Report" onPress={generateReport} />
      <View style={{height:8}} />
      <Button title="Close" onPress={onClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding:20, backgroundColor:'#fff', paddingBottom:40 },
  title: { fontSize:20, fontWeight:'700', marginBottom:12, color:'#000' },
  item: { marginBottom:8 }
});
