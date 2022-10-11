import React, { useEffect, useState } from 'react'
import QRCode from 'easyqrcodejs'
import Button from './Components/Button'

function Test() {
    const [value, setValue] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()
            setValue(data[0])
            console.log(data)
        }

        fetchData()
    }, [])

    const generateQrCode = () => {
        var options = {
            text: "https://qrtiger.stoplight.io/docs/qrtiger-api/ZG9jOjMxNjE1OTI5-guide-to-track-data-api",
            width: 256,
            height: 256,
            colorDark: "#012570",
            colorLight: "#fabfff",
            correctLevel: QRCode.CorrectLevel.H,

            // // ====== Quiet Zone
            quietZone: 5,
            // quietZoneColor: "rgba(50,96,162,1)",

            // // === Posotion Pattern(Eye) Color
            // PO: '#e1622f',
            // PI: '#aa5b71',

            // // ====== Title
            // title: 'QR Title',
            // titleFont: "normal normal bold 18px Arial",
            // titleColor: "#004284",
            // titleBackgroundColor: "#fff",
            // titleHeight: 70,
            // titleTop: 25,


            // // ====== SubTitle
            // subTitle: 'QR subTitle',
            // subTitleFont: "normal normal normal 14px Arial",
            // subTitleColor: "#004284",
            // subTitleTop: 40,
        }

        new QRCode(document.getElementById("qrcode"), options)
    }

    return (
        <>
            <Button OnClick={generateQrCode} Value="Generate QR Code" />
            <div id='qrcode' style={{ width: "256px", margin: "50px auto" }}></div>
        </>
    )
}

export default Test