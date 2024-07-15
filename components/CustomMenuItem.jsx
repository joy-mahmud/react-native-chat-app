import { View, Text } from 'react-native'
import React from 'react'
import { MenuOption } from 'react-native-popup-menu'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const MenuItem = ({ action, value, text, icon }) => {
    return (
        <MenuOption onSelect={()=>action(value)}
        customStyles={{
           
              optionWrapper: {
                borderRadius:8
              },
             
        }}
        >
            <View className='px-3 py-1 flex-row items-center justify-between'>
                <Text style={{fontSize:hp(1.7)}} className="text-neutral-600 font-semibold ">{text}</Text>
                {icon}
            </View>
        </MenuOption>
    )
}

export default MenuItem