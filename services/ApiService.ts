import axios from "axios";
import {basicURL, urls} from "../constants/urls"

const ApiService = {
    delete: () => axios.delete(basicURL + urls.file),
    download: () => axios.get(basicURL + urls.download, {responseType: 'blob',}),
    changeFormat: (format: string) => axios.get(basicURL + urls.file + `?f=${format}`),
    uploadFile: (file: any) => axios.post(basicURL + urls.file, file,
        {
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",}
        })
}

export {ApiService}