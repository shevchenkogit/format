import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AboutStack} from "@/screns/about/stack";
import {HomeStack} from "@/screns/home/stack";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Provider} from "react-redux";
import {setUpStore} from "@/redux/storege";

const Tab = createBottomTabNavigator();
const storage = setUpStore()
export default function App() {

    return (
        <Provider store={storage}>
              <NavigationContainer independent={true}>

                    <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen options={{tabBarIcon: () => (<AntDesign name="home" size={24} color="black" />)}}
                                    name="Home" component={HomeStack} />

                        <Tab.Screen options={{tabBarIcon: () => (<Entypo name="documents" size={24} color="black" />)}}
                            name="About" component={AboutStack} />
                    </Tab.Navigator>

              </NavigationContainer>
        </Provider>
    );
}