import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'
import FieldInput from '../../Components/FieldInput'
import Button from '../../Components/Button'
import { GetLastName, GetFirstName, SplitDate } from '../../Helpers'

function CreateandReadIdCardQRCode() {
    const [urlQrCode, setUrlQrCode] = useState("")
    const [value, setValue] = useState("")
    const [infomation, setInfomation] = useState({
        newIdCard: "",
        oldIdCard: "",
        fullName: "",
        doB: "",
        sex: "",
        address: "",
        created: ""
    })

    const generateQrCode = async (e) => {
        try {
            var url = await QRCode.toDataURL(value)
            setUrlQrCode(url)
        } catch (err) { }
    }

    const generateQrCodeKeydown = async (e) => {
        if (e.keyCode == 13) {
            try {
                var url = await QRCode.toDataURL(value)
                setUrlQrCode(url)
            } catch (err) { }
        }
    }

    const handleScanQrCode = (e) => {
        const html5QrCode = new Html5Qrcode("reader");
        if (e.target.files.length == 0) {
            return;
        }

        const imageFile = e.target.files[0]
        html5QrCode.scanFile(imageFile, true)
            .then(res => {
                var data = res.split("|")
                setInfomation({
                    newIdCard: data[0], oldIdCard: data[1],
                    fullName: data[2], doB: data[3], sex: data[4],
                    address: data[5], created: data[6]
                })
                setValue(res);
                setUrlQrCode("")
            })
            .catch(err => {
                console.log(`Error scanning file. Reason: ${err}`)
            });
        html5QrCode.clear()
    }

    const onScanSuccess = (decodedText, decodedResult) => {
        // Handle on success condition with the decoded text or result.
        console.log(`Scan result: ${decodedText}`, decodedResult);
        alert(decodedText)
        //setValue(decodedText)
        // var data = decodedText.split("|")
        // if (data.length != 0)
        //     setInfomation({
        //         newIdCard: data[0], oldIdCard: data[1],
        //         fullName: data[2], doB: data[3], sex: data[4],
        //         address: data[5], created: data[6]
        //     })
    }

    const onScanError = (errorMessage) => {
        console.log(`Scan error: ${errorMessage}`);
    }

    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 60, aspectRatio: 1.0, formatsToSupport: 0 });
        html5QrcodeScanner.render(onScanSuccess, onScanError);
    }, [])

    return (
        <div className='container'>
            <div className='form_input'>
                <div className="main">
                    <textarea rows={8} value={value}
                        placeholder="Input text to convert QR"
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={generateQrCodeKeydown}></textarea>
                </div>
                <Button Style={{
                    marginLeft: "90px", padding: "5px", outline: "none",
                    borderRadius: "5px", border: "1px solid white",
                    backgroundColor: "black", cursor: "pointer",
                    color: "white", marginTop: "5px"
                }}
                    OnClick={generateQrCode}
                    Value="Click to generate QR Code" />
                <div style={{ marginTop: "20px" }}>
                    <img src={urlQrCode} alt="null" /><br />
                    <a
                        href={urlQrCode}
                        download={value ? true : false}>Download QR Code
                    </a>
                </div>
                <div>
                    <div id="reader"></div>
                    <input type="file"
                        accept="image/*"
                        onChange={handleScanQrCode} />
                </div>
            </div>

            <div className='form_output'>
                <form>
                    <FieldInput type={`text`} title={`New IDCard`} value={infomation.newIdCard} />
                    <FieldInput type={`text`} title={`Old IDCard`} value={infomation.oldIdCard} />
                    <FieldInput type={`text`} title={`First name`} value={GetFirstName(infomation.fullName)} />
                    <FieldInput type={`text`} title={`Last name`} value={GetLastName(infomation.fullName)} />
                    <FieldInput type={`date`} title={`Date of birth`} value={SplitDate(infomation.doB)} />
                    <FieldInput type={`text`} title={`Sex`} value={infomation.sex} />
                    <FieldInput type={`text`} title={`Address`}
                        value={infomation.address && `${infomation.address.split(',')[0]}, ${infomation.address.split(',')[1]}`} />
                    <FieldInput title={`Hamlet`} value={infomation.address.split(',')[2]} />
                    <FieldInput type={`text`} title={`Ward`} value={infomation.address.split(',')[3]} />
                    <FieldInput type={`text`} title={`City`} value={infomation.address.split(',')[4]} />
                    <FieldInput type={`text`} title={`Country`} value={infomation.address.split(',')[5]} />
                    <FieldInput type={`date`} title={`Created`} value={SplitDate(infomation.created)} />
                </form>
            </div>
        </div>
    )
}

export default CreateandReadIdCardQRCode