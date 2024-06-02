import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "@/routes/routes";
import {HomeScreen} from "@/screns/home/screen";
import {HomeDetails} from "@/screns/home/homeDetails";
import {SafeAreaView} from "react-native";

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
          <Stack.Navigator>
              <Stack.Screen name={Routes.HOME} component={HomeScreen}/>
              <Stack.Screen name={Routes.HOMEDET} component={HomeDetails}/>
          </Stack.Navigator>
  )
}

export {HomeStack}