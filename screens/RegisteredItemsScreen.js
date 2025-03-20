import { View, Text, ScrollView } from 'react-native'
import { Background, BackButton, Logo, Header, Button } from '../components'
import { Divider, List } from 'react-native-paper'
import { useFetch } from '../hooks/useFetch'
import { useEffect, useState } from 'react'

export const RegisteredItemsScreen = ({ navigation }) => {

  const { getData } = useFetch();
  const [items, setItems] = useState([]);

  const getItems = async() => {
    const _items = await getData('http://localhost:3000/api/items/all');
    console.log(_items);
    if (_items.error) return;
    setItems( _items.data );
  }

  useEffect(() => {
    getItems();
  }, [])
  

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Agregar artículo</Header>

      <ScrollView style={{ width:"100%" }}>

        {
          // Imprime la lista de artículos siempre y cuando haya elementos en el arreglo de Items
          items.length>0
          ? 
            items.map( (item) => {
              return (
                <>
                  <List.Item
                    title={ item.name }
                    description={ item.description }
                    onPress={()=> navigation.navigate('EditionItem', {
                      id: item._id
                    }) }
                  />
                  <Divider />
                </>
              )
            })
          : 
            <>
              <List.Item
                title="No hay elementos"
              />
              <Divider />
            </>

        }
          
      </ScrollView>

      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        onPress={() => navigation.navigate('Menu') }
      >
        Regresar
      </Button>
    </Background>
  )
}
