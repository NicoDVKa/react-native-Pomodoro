import { StyleSheet, Text, View, Button, SafeAreaView, Platform,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import {Audio} from "expo-av";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
    const [time, setTime] = useState(25*60);
    const [timePrev, setTimePrev] = useState(25*60);
    const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;

        if(isActive){
          interval = setInterval(() => {
            setTime(time - 1);
          }, 1000);
        }else{
          clearInterval(interval);
        }

        if(time <= 0){
          setIsActive(false);
          setTime(timePrev);
        }

        return () => clearInterval(interval);

    }, [isActive, time]);

  function handleStartStop(){
      playSound();
      setIsActive(!isActive);
  }

  async function playSound(){
      const { sound } = await Audio.Sound.createAsync(
          require('./assets/click.mp3'),
      );

      await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor : colors[currentTime] }]}>
        <View style={{
          flex: 1,
          paddingHorizontal : 15,
          }}>
          <Text style={styles.text}>Pomodoro</Text>
          <Header 
            currentTime={currentTime} 
            setCurrentTime={setCurrentTime} 
            setTime={setTime}
            setTimePrev={setTimePrev}
            setIsActive={setIsActive}
          />
          <Timer time={time}/>
          <TouchableOpacity onPress={handleStartStop} style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold'}} >{isActive ? "STOP" : "START"}</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  text :{
    fontSize: 32, 
    fontWeight: "bold"
  },
  button:{
    alignItems : 'center',
    backgroundColor : '#333333',
    marginTop: 15,
    padding : 15,
    borderRadius: 15
  },
});
