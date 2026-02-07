import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import ProfileModal from '../components/ProfileModal';
import { getUserProfile } from '../utils/storage';

export default function Home({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [messages, setMessages] = useState([{id:'1', from:'bot', text:"Is your throat still sore?"}]);
  const [text, setText] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(()=>{ (async()=>{ const p = await getUserProfile(); setProfile(p); })(); }, []);

  const send = () => {
    if(!text.trim()) return;
    setMessages(prev => [...prev, {id:String(prev.length+1), from:'user', text: text.trim()}]);
    setText('');
    // TODO: hook up to AI backend / assistant here and push bot replies
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.headerText}>Care Bear</Text></View>

      <View style={styles.centerArea}>
        <View style={styles.bearCircle}>
          <Text style={styles.bearEmoji}>🧸</Text>
        </View>
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>Is your throat still sore?</Text>
        </View>
      </View>

      <View style={styles.chatArea}>
        <FlatList
          data={messages}
          keyExtractor={i=>i.id}
          renderItem={({item})=> (
            <View style={[styles.msgRow, item.from==='bot' ? styles.botMsg : styles.userMsg]}>
              <Text style={{color:item.from==='bot' ? '#000' : '#fff'}}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Tell Care Bear how you feel..." value={text} onChangeText={setText} />
        <TouchableOpacity style={styles.sendBtn} onPress={send}><Text style={{color:'#fff'}}>Send</Text></TouchableOpacity>
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.toggleBtn} onPress={()=>setShowProfile(true)}>
          <Text style={styles.toggleText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleBtn} onPress={()=>navigation.navigate('Calendar')}>
          <Text style={styles.toggleText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showProfile} animationType="slide">
        <ProfileModal onClose={()=>{ setShowProfile(false); (async()=>{ const p = await getUserProfile(); setProfile(p); })(); }} />
      </Modal>
    </View>
  );
}

const BROWN = '#8B5E3C';
const PALE_YELLOW = '#FFF7D6';

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff' },
  header: { height:70, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' },
  headerText: { fontSize:20, fontWeight:'700', color:'#000' },
  centerArea: { alignItems:'center', marginTop:8 },
  bearCircle: { width:140, height:140, borderRadius:70, backgroundColor:BROWN, alignItems:'center', justifyContent:'center' },
  bearEmoji: { fontSize:56 },
  speechBubble: { marginTop:12, backgroundColor:PALE_YELLOW, padding:12, borderRadius:12, borderWidth:1, borderColor:'#eee' },
  speechText: { color:'#000', fontSize:16 },
  chatArea: { flex:1, padding:12 },
  inputRow: { flexDirection:'row', padding:12, alignItems:'center', borderTopWidth:1, borderColor:'#eee' },
  input: { flex:1, borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10, marginRight:8 },
  sendBtn: { backgroundColor:BROWN, paddingHorizontal:14, paddingVertical:10, borderRadius:8 },
  bottomRow: { flexDirection:'row', justifyContent:'space-around', paddingVertical:12, borderTopWidth:1, borderColor:'#f3f3f3' },
  toggleBtn: { alignItems:'center' },
  toggleText: { color:'#000', fontWeight:'600' },
  msgRow: { padding:10, borderRadius:8, marginBottom:8, maxWidth:'80%' },
  botMsg: { backgroundColor:'#f2f2f2', alignSelf:'flex-start' },
  userMsg: { backgroundColor:BROWN, alignSelf:'flex-end' }
});
