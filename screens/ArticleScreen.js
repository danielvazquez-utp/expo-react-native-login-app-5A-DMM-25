import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'


import { useFetch } from '../hooks/useFetch';
import { CustomDropDownList } from '../components/CustomDropDownList'

export function ArticleScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [locations, setLocations] = useState([
    {title:'Almacen'},
    {title:'Recepción'},
  ]);

  const itemTypes = [
    {title:'Mobiliario de oficina'},
    {title:'Equipo de cómputo'},
    {title:'Otros'},
  ];

  const itemState = [
    {title:'Sin determinar'},
    {title:'Mal estado'},
    {title:'Regular'},
    {title:'Buen estado'},
    {title:'Excelente estado'},
  ]

  const { getData, setData } = useFetch();

  // Función para recuperar las ubicaciones
  const getLocations = async() => {
    const locations = await getData('http://localhost:3000/api/locations/all');
    if (locations.error) return;
    const { data } = locations;
    if (data.length>0) {
      const ubicaciones = [];
      data.map( (location) => {
        ubicaciones.push({
          title: `${ location.building } - ${ location.department }`
        })
      });
      setLocations(ubicaciones);
    }
  }

  useEffect(() => {
    getLocations();
  }, [])
  

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Agregar artículo</Header>
      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <CustomDropDownList items={ itemTypes } defaultText='Tipo de artículo' />

      <CustomDropDownList 
        items={
          [
            {title: 'Malo'},
            {title: 'Regular'},
            {title: 'Bueno'},
            {title: 'Excelente'},
          ]
        } 
        defaultText='Estado del artículo'
      />
      
      <CustomDropDownList items={ locations } />

      <TextInput
        label="Correo"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
})
