import {Button, Text, View} from "react-native";
import React from "react";
import {Routes} from "@/routes/routes";

// @ts-ignore
const AboutScreen = ({navigation}) => {

    // const ProfileScreen = ({navigation, route}) => {
    //     return <Text>This is {route.params.name}'s profile</Text>;
    // };

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>About screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate(Routes.ABOUTDET)}
            />
        </View>
    );
};

export {AboutScreen}
