import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({currentTime, setCurrentTime, setTime, setTimePrev, setIsActive}){

  function handlePress(index){
      const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
      setCurrentTime(index);
      setTime(newTime * 60);
      setTimePrev(newTime * 60);
      setIsActive(false);
  }

  return (
      <View style={styles.header}>
          {
            options.map( (option, index) =>  (
                <TouchableOpacity key={index}
                                  onPress={ () =>{
                                    handlePress(index);
                                  }}
                                  style={[styles.item, 
                                  currentTime !== index && {borderColor : 'transparent'}]} 
                >
                  <Text style={{ fontWeight: 'bold' }}>{option}</Text>
                </TouchableOpacity>
              )
            )
          }
      </View>
  );
}

const styles = StyleSheet.create({
    header: {
      flexDirection : 'row',
      width: '100%',
      justifyContent : 'space-between',
    },
    item :{
        borderRadius : 10,
        width : '33%',
        borderWidth : 3,
        padding: 5,
        borderColor : 'white',
        marginVertical: 20,
        alignItems : 'center',
    }
});