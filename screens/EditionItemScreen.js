import { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useFetch } from '../hooks/useFetch';
import { Background, BackButton, Button, Logo, Header, IonButton, TextInput, CustomDropDownList } from "../components"
import { useRoute } from '@react-navigation/native';

export const EditionItemScreen = ({ navigation }) => {

    const [name, setName] = useState({ value: '', error: '' })
    const [description, setDescription] = useState({ value: '', error: '' })
    const [itemType, setItemType] = useState({ value: '', error: '' })
    const [itemStatus, setItemStatus] = useState({ value: '', error: '' })
    const [itemLocation, setItemLocation] = useState({ value: '', error: '' })


    const [locations, setLocations] = useState([
        { title: 'Almacen' },
        { title: 'Recepción' },
    ]);

    const itemTypes = [
        { title: 'Mobiliario de oficina' },
        { title: 'Equipo de cómputo' },
        { title: 'Otros' },
    ];

    const itemState = [
        { title: 'Malo' },
        { title: 'Regular' },
        { title: 'Bueno' },
        { title: 'Excelente' },
    ]

    const { getData, setData } = useFetch();
    const route = useRoute();
    const { id } = route.params;

    // Función para recuperar las ubicaciones
    const getLocations = async () => {
        const locations = await getData('http://localhost:3000/api/locations/all');
        if (locations.error) return;
        const { data } = locations;
        if (data.length > 0) {
            const ubicaciones = [];
            data.map((location) => {
                ubicaciones.push({
                    title: `${location.building} - ${location.department}`
                })
            });
            setLocations(ubicaciones);
        }
    }

    const getItemData = async(id) => {
        const item = await getData('http://localhost:3000/api/items/byId/' + id);
        console.log(item);
        if (item.error) return;
        const {data} = item;
        setName({value: data[0].name, error:''});
        setDescription({value: data[0].description, error:''})
        setItemType({value: data[0].type, error:''})
        setItemStatus({value: data[0].state, error:''})
        setItemLocation({value: data[0].location, error:''})
    }

    const onRegisterPressed = async () => {

        // --------- Validación del formulario ----------

        const nameError = textValidator(name.value);
        const descriptionError = textValidator(description.value)
        const itemTypeError = listValidator(itemType.value)
        const itemStatusError = listValidator(itemStatus.value)
        const itemLocationError = listValidator(itemLocation.value)

        if (nameError || descriptionError || itemTypeError || itemStatusError || itemLocationError) {
            setName({ ...name, error: nameError })
            setDescription({ ...description, error: descriptionError })
            setItemType({ ...itemType, error: itemTypeError })
            setItemStatus({ ...itemStatus, error: itemStatusError })
            setItemLocation({ ...itemLocation, error: itemLocationError })
            return
        }

        // ----------- registro del articulo -------------

        const now = new Date();
        const month = now.getMonth() + 1;
        let codigo = `${now.getFullYear()}${month.toString().padStart(2, '0')}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
        switch (itemType.value) {
            case 'Mobiliario de oficina':
                codigo = 'MO-' + codigo;
                break;
            case 'Equipo de cómputo':
                codigo = 'EC-' + codigo;
                break;
            default:
                codigo = 'OT-' + codigo;
                break;
        }

        const newItem = {
            code: codigo,
            name: name.value,
            type: itemType.value,
            description: description.value,
            state: itemStatus.value,
            location: itemLocation.value
        }
        console.log(newItem);
        const item = await setData('http://localhost:3000/api/items/add', newItem);
        console.log(item);
        if (item.error) return;
        alert("Artículo agregado")
    }

    useEffect(() => {
        getLocations();
        getItemData(id);
    }, [])

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Editar artículo</Header>

            <TextInput
                label="Nombre"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />

            <CustomDropDownList
                items={itemTypes}
                defaultText={ itemType.value }
                errorText={itemType.error}
                setValue={setItemType}
            />

            <CustomDropDownList
                items={ itemState }
                defaultText={ itemStatus.value }
                errorText={itemStatus.error}
                setValue={setItemStatus}
            />

            <CustomDropDownList
                items={locations}
                defaultText={ itemLocation.value }
                errorText={itemLocation.error}
                setValue={setItemLocation}
            />

            <TextInput
                label="Descripción"
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
                onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: 'RegisteredItems' }],
                  }) }
            >
                Regresar
            </Button>
        </Background>
    )
}

export default EditionItemScreen