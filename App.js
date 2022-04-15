import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Voice from '@react-native-voice/voice';
import { useEffect, useState } from 'react';

export default function App() {

  
  const [isStarted,setIsStarted] = useState();
  
  useEffect(()=>{

    async function checkVoiceAvailability(params) {
      const data =  await Voice.isAvailable();
      console.log(data);
    }
    
    checkVoiceAvailability()

    function onSpeechStart(e) {
      console.log(e);
    }

    onSpeechResults = (e) => {
      console.log('onSpeechResults: ', e);
    };


    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;

    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  },[])
  
  const onSpeechStart = async()=>{
    try {
      await Voice.start('en-US');
      console.log('asd');
    } catch (e) {
      console.error(e);
    }
  }

  const onSpeechEnd = async()=>{
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{
        flexDirection:"row",
      }} >
        <TouchableOpacity style={{
          padding:15,
          backgroundColor:"#fe123d",
          marginRight:20,
        }} onPress={()=>{
          onSpeechStart();
        }} >
          <Text>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          padding:15,
          borderColor:"#fe123d",
          borderWidth:1,
        }} onPress={()=>{
          onSpeechEnd();
        }} >
          <Text>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
