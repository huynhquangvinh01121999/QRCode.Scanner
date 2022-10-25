import React, { useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

function CropIDCardQrCodeImage() {

    const [value, setValue] = useState("")

    const handleScanQrCode = (e) => {
        const html5QrCode = new Html5Qrcode("reader");
        if (e.target.files.length == 0) {
            return;
        }

        const imageFile = e.target.files[0];
        html5QrCode.scanFile(imageFile, true)
            .then(data => {
                setValue(data)

                // var qr = document.getElementById("qr-canvas-visible")
                // qr.style.backgroundColor = "white"
                // qr.style.width = "350px"
                // qr.style.height = "350px"
            })
            .catch(err => {
                console.log(`Error scanning file. Reason: ${err}`)
            });
        html5QrCode.clear()
    }

    const drawimg = (idata) => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 1340, 200, 250, 240, 21, 20, 87, 104);
        };
        img.src = idata;
    }

    const readURL = () => {
        var myimg = document.getElementById("source");
        var input = document.getElementById("myfile");
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log("changed");
                myimg.src = e.target.result;
                drawimg(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    return (
        <>
            <h3 className='title'>Generate QR Code</h3>
            <div className="main">
                <textarea rows={8} value={value}
                    placeholder="Input text to convert QR"
                    onChange={e => setValue(e.target.value)}></textarea>
            </div>
            <hr />

            <canvas id="canvas"
                style={{
                    border: "1px solid white",
                }}></canvas>
            <div style={{ display: "none" }}>
                <img id="source"
                    src="https://mdn.mozillademos.org/files/5397/rhino.jpg"
                    width="300" height="227" />
            </div>
            <input type="file" id="myfile" onChange={readURL}></input>
        </>
    )
}

export default CropIDCardQrCodeImage