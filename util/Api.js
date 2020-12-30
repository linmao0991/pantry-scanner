import axios from 'axios'

const API = {
    barcodeSearch: barcode => {
        console.log("[Search Barcode]")
        console.log(`-Barcode: ${barcode.code}`)
        return axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode.code}`)
    }
}

export default API