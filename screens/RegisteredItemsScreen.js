import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useFetch } from '../hooks/useFetch';
import { Background, BackButton, Button, Logo, Header, IonButton } from "../components"

export const RegisteredItemsScreen = () => {

    const { getData } = useFetch();
    const [items, setItems] = useState([]);

    const getItems = async() => {
        const _items = await getData('http://localhost:3000/api/items/all');
        console.log(_items);
        if( _items.error ) return;
        if (_items.data.length>0) {
            setItems(_items.data)
        }
    }

    useEffect(() => {
      getItems();
    }, [])
    

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Artículos registrados</Header>

            <ScrollView style={{
                width: "100%"
            }}>
                {
                    items.length>0
                    ? 
                        items.map( (item) => {
                            return (
                                <>
                                <List.Item 
                                    title={ `${item.name} (${item.code})` }
                                    description={item.description}
                                    right={() => (
                                        <View style={styles.botonContainer}>
                                            <IonButton
                                                size={20}
                                                text=''
                                                width={35}
                                                height={35}
                                                name='color-wand'
                                                borderRadius={10}
                                                margin={2}
                                                bgColor='#fc6f03'
                                                onPress={()=>alert(item._id)}
                                            />
                                        </View>
                                    )}
                                />
                                <Divider />
                                </>
                            )
                    })
                    :  
                        <>
                        <List.Item title="No hay artículos registrados" />
                        <Divider />
                        </>
                }
            </ScrollView>

            <Button
                mode="contained"
                style={{ marginTop: 24 }}
                onPress={() => { }}
            >
                Regresar
            </Button>
        </Background>
    )
}

const styles = StyleSheet.create({
    botonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });