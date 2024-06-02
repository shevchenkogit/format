import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "@/routes/routes";
import {AboutScreen} from "@/screns/about/screen";
import {AboutDetails} from "@/screns/about/aboutDetails";

const Stack = createNativeStackNavigator()

const AboutStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={Routes.ABOUT} component={AboutScreen}/>
            <Stack.Screen name={Routes.ABOUTDET} component={AboutDetails}/>
        </Stack.Navigator>
    )
}
export {AboutStack}
