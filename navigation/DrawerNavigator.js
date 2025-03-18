import { createDrawerNavigator } from '@react-navigation/drawer';
import { 
    Dashboard, 
    ArticleScreen, 
    PersonScreen, 
    LocationScreen,
    AssignmentScreen,
    InventaryScreen,
    ScanScreen,
    RegisteredItemsScreen
 } from '../screens'

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='regItems'>
        <Drawer.Screen
            name='Menu'
            component={ Dashboard }
            options={{
                title: 'Menú principal'
            }}
        />
        <Drawer.Screen
            name='Items'
            component={ ArticleScreen }
            options={{
                title: 'Agregar artículo'
            }}
        />
        <Drawer.Screen
            name='regItems'
            component={ RegisteredItemsScreen }
            options={{
                title: 'Artículos registrados'
            }}
        />
        <Drawer.Screen
            name='Persons'
            component={ PersonScreen }
            options={{
                title: 'Personas'
            }}
        />
        <Drawer.Screen
            name='Locations'
            component={ LocationScreen }
            options={{
                title: 'Ubicaciones'
            }}
        />
        <Drawer.Screen
            name='Assignments'
            component={ AssignmentScreen }
            options={{
                title: 'Asignaciones'
            }}
        />
        <Drawer.Screen
            name='Inventaries'
            component={ InventaryScreen }
            options={{
                title: 'Inventario'
            }}
        />
        <Drawer.Screen
            name='Scan'
            component={ ScanScreen }
            options={{
                title: 'Escanear'
            }}
        />
    </Drawer.Navigator>
  )
}