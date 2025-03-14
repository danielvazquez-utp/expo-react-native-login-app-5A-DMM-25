
import { View, Text, StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from '@expo/vector-icons/Ionicons'

export const CustomDropDownList = ({ 
  items=[{title: 'Hola'}, {title: 'Mundo'}], 
  defaultText='Seleccione', 
  error= false,
  setValue = ()=>{}
}) => {
    return (
      <View>
        <SelectDropdown
            data={ items }
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setValue( {value:selectedItem.title, error:''} );
            }}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || defaultText }
                        </Text>

                        <Ionicons
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            size={24}
                            color="black"
                            style={styles.dropdownButtonArrowStyle}
                        />

                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
        {
          error && 
          <Text style={styles.error}>Seleccione una opción de la lista</Text>
        }
      </View>
    )
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 300,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBlockColor: "#AAA",
    borderWidth: 1,
    marginVertical: 10
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 17,
    color: '#777',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  error: {
      fontSize: 13,
      color: "red",
      paddingTop: 8,
    },
})