import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { getUserProfile, setIsOnboarded } from '../utils/storage';

export default function OnboardingSummary({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async ()=>{
      const p = await getUserProfile();
      setProfile(p || {});
    })();
  }, []);

  const finish = async () => {
    await setIsOnboarded(true);
    navigation.reset({ index:0, routes:[{name:'Home'}] });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Review your info</Text>
      {profile ? (
        <View style={{padding:8}}>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Name:</Text> {profile.firstName} {profile.lastName}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>DOB:</Text> {profile.dob}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Gender:</Text> {profile.gender}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Email:</Text> {profile.email}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Phone:</Text> {profile.phone}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Medicines:</Text> {(profile.medicineHistory || []).join(', ')}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Conditions:</Text> {(profile.currentHealthConditions || []).join(', ')}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Pregnant:</Text> {profile.pregnant ? 'Yes' : 'No'}</Text>
          <Text style={styles.item}><Text style={{fontWeight:'600'}}>Family history:</Text> {(profile.familyHistory || []).join(', ')}</Text>
        </View>
      ) : <Text>Loading...</Text>}
      <View style={{height:16}} />
      <Button title="Finish and go to Care Bear" onPress={finish} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:22, fontWeight:'600', marginBottom:12, color:'#000' },
  item: { marginBottom:8 }
});
