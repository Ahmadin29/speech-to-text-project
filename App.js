import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Voice from '@react-native-voice/voice';
import { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';

export default function App() {

  
  const [results,setResults] = useState([]);
  const [isStarted,setIsStarted] = useState(false);
  
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
      setIsStarted(false)
      setResults(e.value)
    };

    onSpeechError = (e) => {
      setIsStarted(false)
      Alert.alert('Oopss','There is an error with error code '+e?.error?.message)
      console.log(e);
    };

    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;

    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  },[])
  
  const onSpeechStart = async()=>{
    try {
      setIsStarted(true)
      await Voice.start('id-id');
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
          width:100,
          height:100,
          backgroundColor:!isStarted ? "#3471eb" : "#eb344f",
          borderRadius:100,
          alignItems:"center",
          justifyContent:"center",
        }} onPress={()=>{
          onSpeechStart();
        }} >
          <Icon
            name={!isStarted ? 'md-mic-outline' : 'md-stop'}
            type='ionicon'
            color="white"
            size={50}
            containerStyle={{
              marginLeft:5,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{
        marginTop:15,
      }} >
        <Text>Results : </Text>
        {
          results?.map(v=>{
            return(
              <Text key={v} >{v}</Text>
            )
          })
        }
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
