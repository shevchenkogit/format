import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Button, View, Platform, Text, TouchableOpacity} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import {basicURL, urls} from "@/constants/urls";
import {useDispatch} from "react-redux";
import {fileActions} from "@/redux/slices/fileSlice";
import React from "react";

const Downloader = () => {
    const dispatch = useDispatch()
    const downloadFromAPI = async () => {
        const filename = "index.pdf";
        const result = await FileSystem.downloadAsync(
            basicURL + urls.download,
            FileSystem.documentDirectory + filename,
            {
                headers: {
                    "MyHeader": "MyValue"
                }
            }
        );
        console.log(result);
        await save(result.uri, filename, result.headers["Content-Type"]);
        console.log('all done')
        dispatch(fileActions.done('done'))
        //@ts-ignore
        dispatch(fileActions.deleteFile())
        dispatch(fileActions.choiceFormat(null))
        dispatch(fileActions.formResp(null))
    };
// @ts-ignore
    const save = async (uri, filename, mimetype) => {
        if (Platform.OS === "android") {
            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                    })
                    .catch(e => console.log(e));
            } else {
                shareAsync(uri);
            }
        } else {
            shareAsync(uri);
        }
    };
    // style={styles.container}
    return (
        <View style={styles.viewForText}>
            {/*<Button title="Download From URL" onPress={downloadFromUrl} />*/}
            {/*<StatusBar style="auto" />*/}
            <TouchableOpacity style={styles.change} onPress={downloadFromAPI}>
                <Text style={styles.textBn}>Download file!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
});
export {Downloader}