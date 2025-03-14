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
import { textValidator } from '../helpers/textValidator'
import { listValidator } from '../helpers/listValidator'

export function ArticleScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [description, setDescription] = useState({ value: '', error: '' })
  const [typeItem, setTypeItem] = useState({ value: '', error: '' })
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

  const onRegisterPressed = async() => {
      const nameError = textValidator(name.value)
      const descriptionError = textValidator(description.value)
      const typeItemError = listValidator( typeItem.value )

      if (descriptionError || nameError || typeItemError ) {
        setName({ ...name, error: nameError })
        setDescription({ ...description, error: descriptionError })
        setTypeItem({ ...typeItem, error: typeItemError })
        return
      }
  
      // const usuario = await getData('http://localhost:3000/api/users/byNick/' + email.value);
      // if (usuario.error) return;
      // const { data } = usuario;
      // if( data.length>0 ) return;
  
      // const nuevoUsuario = {
      //   name: name.value,
      //   lastName: lastName.value,
      //   nickname: email.value,
      //   password: password.value,
      //   profile: 1,
      //   state: 1
      // }
  
      // const nuevo = await setData('http://localhost:3000/api/users/add', nuevoUsuario );
      // if (nuevo.error) return;
      
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Dashboard' }],
      // })
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
        label="Nombre del artículo"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <CustomDropDownList 
        items={ itemTypes } 
        defaultText='Tipo de artículo'
        setValue={ setTypeItem }
      />

      <CustomDropDownList 
        items={ itemState } 
        defaultText='Estado del artículo'
        style={{
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      
      <CustomDropDownList 
        items={ locations }
        defaultText='Ubicación del artículo'
      />

      <TextInput
        label="Descripción del artículo"
        returnKeyType="next"
        value={description.value}
        onChangeText={(text) => setDescription({ value: text, error: '' })}
        error={!!description.error}
        errorText={description.error}
        autoCapitalize="none"
        autoCompleteType="none"
        textContentType="none"
        keyboardType="text"
      />
      
      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        onPress={()=>onRegisterPressed()}
      >
        Agregar
      </Button>
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
