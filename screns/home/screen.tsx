import {StyleSheet, Button, FlatList, Text, TextInput, TextInputBase, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {PickerF} from "@/Components/documentPicker";
import {useDispatch, useSelector} from "react-redux";
import {fileActions} from "@/redux/slices/fileSlice";
import {Downloader} from "@/Components/downloader";
import axios from "axios";
import {string} from "prop-types";
import {C} from '@/interfaces/interfaces'
import {ChoiceFormat} from "@/Components/ChoiceFormat";

// @ts-ignore
const HomeScreen = ({navigation}) => {

   const some = useSelector((state:any) => state.file)
    const file: C = some.fileA
    const formResponse: string = some.formatResponse
    const done: string = some.done
    const format: string = some.format
    const dispatch = useDispatch()



    const changeFormat = async () => {
        await axios.get('http://192.168.1.80:8000/file')
    }

    const useredax = () => {
       dispatch(fileActions.requestFile({h:'go go go'}))
    }
    if (file.file != undefined){
        console.log(file)
    }
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {done == null && <View>
            <View style={styles.viewForText}>
                {file.file != undefined && <Text style={styles.text}>your file {file.file.split('/')[1]} was upload </Text>}
            </View>
            {file.file === undefined &&
                <View style={styles.viewForText}>
                <Text style={styles.text}>Please upload file for change format</Text>
                </View>}
            <View style={styles.viewForText}>
                <PickerF/>
            </View>
            {file.file != undefined &&
            <View style={styles.viewForText}>
                <ChoiceFormat/>
            </View>}
            {formResponse != null && file.file != undefined && <View>
                {/*<Text style={styles.text}>you can download the file</Text>*/}
                <Downloader/>
            </View> }
            {/*<Button title="change" onPress={changeFormat}/>*/}
            {/**/}
            </View>}
            {done == 'done'&& <View style={styles.viewForText}><View style={styles.viewForText}>

                <Text style={styles.text}>File was downloaded!</Text>
            </View>

                <PickerF/>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 23,

    },
    viewForText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    }
})

export {HomeScreen}
