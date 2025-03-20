import { useEffect, useState } from 'react'
import { Background, BackButton, Logo, Header, TextInput, CustomDropDownList, Button } from '../components'
import { useFetch } from '../hooks/useFetch'
import { useRoute } from '@react-navigation/native'

export const EditionItemScreen = () => {

    const [name, setName] = useState({ value: '', error: '' })
  const [description, setDescription] = useState({ value: '', error: '' } )
  const [itemType, setItemType] = useState({ value: '', error: '' })
  const [itemStatus, setItemStatus] = useState({ value: '', error: '' })
  const [itemLocation, setItemLocation] = useState({ value: '', error: '' })

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

  const { getData } = useFetch();
    //   Recuperando parametros de otro pantalla
  const route = useRoute();
  const { id } = route.params;

    // Función para recuperar un producto usando su _id
    const getItemById = async( id ) => {
        const _item = await getData('http://localhost:3000/api/items/byId/' + id);
        console.log(_item);
        const { data } = _item;
        setName({value: data[0].name, error: ''});
        setDescription({value: data[0].description, error: ''});
        setItemType({value: data[0].type, error: ''});
        setItemStatus({value: data[0].state, error: ''});
        setItemLocation({value: data[0].location, error: ''});
    } 

  useEffect(() => {
    getItemById( id )
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

      <CustomDropDownList 
        items={ itemTypes } 
        defaultText={ itemType.value }
        errorText={ itemType.error }
        setValue={ setItemType }
      />

      <CustomDropDownList 
        items={
          [
            {title: 'Malo'},
            {title: 'Regular'},
            {title: 'Bueno'},
            {title: 'Excelente'},
          ]
        } 
        defaultText={ itemStatus.value }
        errorText={ itemStatus.error }
        setValue={ setItemStatus }
      />
      
      <CustomDropDownList 
        items={ locations }
        defaultText={ itemLocation.value }
        errorText={ itemLocation.error }
        setValue={ setItemLocation }
      />

      <TextInput
        label="Descripción"
        returnKeyType="next"
        value={ description.value }
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
        onPress={() => {}}
      >
        Actualizar
      </Button>
    </Background>
  )
}