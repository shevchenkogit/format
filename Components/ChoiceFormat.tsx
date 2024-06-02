import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import { SelectList } from 'react-native-dropdown-select-list'
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fileActions} from "@/redux/slices/fileSlice";
import {Formats} from "@/constants/formats";


const ChoiceFormat = () => {
    const some = useSelector((state:any) => state.file)
    const format: string = some.format
    const formResponse: string = some.formatResponse
    const dispatch = useDispatch()

    const [selected, setSelected] = useState("");

    const onPress = () => {
        dispatch(fileActions.choiceFormat(null))
        //@ts-ignore
        dispatch(fileActions.changeFormat(format))

        console.log("change")

    }

    return(<View>
            <View style={styles.viewForText}>
                <Text style={styles.text}>Choice format for changing</Text>
            </View>
            <View style={styles.viewForText}>
                <SelectList
                    setSelected={(val:any) => {
                        setSelected(val)
                        dispatch(fileActions.choiceFormat(val))
                    }}
                    data={Formats}
                    save="value"
                />
            </View>

            {format && <View style={styles.viewForText}>
                {/*<Button title='change format' onPress={onPress}/>*/}
                <TouchableOpacity style={styles.change} onPress={onPress}>
                    <Text style={styles.textBn}>Convert file</Text>
                </TouchableOpacity>
            </View>}
    </View>
    )
}

const styles = StyleSheet.create({

    change: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#9acd32",
        height: 38,
        width: 150,
        borderRadius: 10
    },
    uploap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#9acd32",

        height: 35,
        width: 120,
        textShadowColor: '#4f6ff1',
        borderRadius: 10

        // height: "30 px"       // borderStyle: ""
    },
    text: {
        fontSize: 20,

    },
    textBn: {
        fontSize: 20,
        color: 'white'

    },
    viewForText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    }
})

export {ChoiceFormat}