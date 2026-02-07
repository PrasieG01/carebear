import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getUserProfile } from '../utils/storage';

export default function CalendarScreen() {
  const [profile, setProfile] = useState(null);

  useEffect(()=>{ (async()=>{ const p = await getUserProfile(); setProfile(p || {}); })(); }, []);

  const meds = (profile && profile.medicineHistory) ? profile.medicineHistory : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Calendar</Text>
      <Text style={{marginBottom:8}}>This is a placeholder calendar. Each medicine should be given a schedule (time, recurrence). Integrate a calendar UI (e.g. react-native-calendars) to show dates and reminders.</Text>

      <FlatList data={meds} keyExtractor={(i,idx)=>String(idx)} renderItem={({item})=> (
        <View style={styles.item}><Text style={{fontWeight:'600'}}>{item}</Text><Text style={{color:'#555'}}>No schedule set</Text></View>
      )} ListEmptyComponent={<Text style={{color:'#666'}}>No medicines listed in profile.</Text>} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#fff' },
  title: { fontSize:20, fontWeight:'700', marginBottom:12 },
  item: { padding:12, borderRadius:8, borderWidth:1, borderColor:'#eee', marginBottom:8 }
});
