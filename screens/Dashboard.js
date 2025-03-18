import React from 'react'
import { View } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { IonButton } from '../components/IonButton'

export function Dashboard({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>

      <View style={{
        flexDirection:'row'
      }}>
        
        <IonButton 
          onPress={ () => navigation.navigate('Items') }
        />
        <IonButton 
          name='person' 
          text='Personas' 
          onPress={ () => navigation.navigate('Persons') }
        />
        <IonButton 
          text='Ubicaciones' 
          name='business' 
          onPress={ () => navigation.navigate('Locations') }
        />

      </View>

      <View style={{
        flexDirection:'row'
      }}>
        
        <IonButton 
          text='Asignaciones' 
          name='shield-checkmark'
          onPress={ () => navigation.navigate('Assignments') }
        />
        <IonButton
          text='Inventarios'
          name='bag-check'
          onPress={ () => navigation.navigate('Inventaries') }
        />
        <IonButton 
          text='Escaner' 
          name='scan-circle'
          onPress={ () => navigation.navigate('Scan') }
        />

      </View>

      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  )
}
