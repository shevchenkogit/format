import * as DocumentPicker from 'expo-document-picker';
import React, {useState} from "react";
import {StyleSheet, Button, View, TouchableOpacity, Text} from "react-native";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {fileActions} from "@/redux/slices/fileSlice";
import {C} from "@/interfaces/interfaces";
import {basicURL, urls} from "../constants/urls"

const PickerF = () => {
    const some = useSelector((state:any) => state.file)
    const file: C = some.fileA
    const dispatch= useDispatch()
    const pickSomething = async () => {

        dispatch(fileActions.done(null))

        const apiUrl = basicURL + urls.file
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "*/*",
            });


            const assets = docRes.assets;
            if (!assets) return;

            const file = assets[0];

            const fileArr = {
                name: file.name,
                uri: file.uri,
                type: file.mimeType,
                size: file.size,
            };
            const formData = new FormData();
            formData.append("file", fileArr as any);

            const { data } = await axios.post(apiUrl, formData, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(data);
            dispatch(fileActions.requestFile(data))
        } catch (error) {
            console.log("Error while selecting file: ", error);
        }
    };

  return (
      <View>
          <TouchableOpacity style={file.file != undefined ? styles.newUpload : styles.uploap} onPress={pickSomething}>
              <Text style={styles.text}>{file.file != undefined ? "Upload new" : "Upload"}</Text>
          </TouchableOpacity>
          {/*<View >*/}
          {/*    <Button title={file.file.length ? "Upload new" : "Upload"} onPress={pickSomething} />*/}
          {/*    /!*<Button title="Send" onPress={sender} />*!/*/}
          {/*</View>*/}
      </View>
      // <View>
      //     <TouchableOpacity>
      //         <Button
      //             title="upload your file"
      //             color="black"
      //             onPress={onPress}
      //         />
      //     </TouchableOpacity>
      // </View>
  )
}

const styles = StyleSheet.create({
    text: {color: "#fff",
        fontSize: 20
    },

    newUpload: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#AFB3AF",
        height: 35,
        width: 120,
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
    }
})

export {PickerF}