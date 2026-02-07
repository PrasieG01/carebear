import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { saveUserProfile, getUserProfile } from '../utils/storage';

export default function OnboardingPregnancy({ navigation }) {
  const [pregnant, setPregnant] = useState(false);

  useEffect(() => {
    (async ()=>{
      const p = await getUserProfile();
      if (p && typeof p.pregnant === 'boolean') setPregnant(p.pregnant);
    })();
  }, []);

  const next = async () => {
    await saveUserProfile({ pregnant });
    navigation.navigate('FamilyHistory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pregnancy</Text>
      <Text style={{color:'#333'}}>Are you currently pregnant?</Text>
      <View style={{flexDirection:'row',alignItems:'center',marginVertical:12}}>
        <Switch value={pregnant} onValueChange={setPregnant} />
        <Text style={{marginLeft:10}}>{pregnant ? 'Yes' : 'No'}</Text>
      </View>
      <Button title="Next" onPress={next} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  title: { fontSize:22, fontWeight:'600', marginBottom:12, color:'#000' }
});
