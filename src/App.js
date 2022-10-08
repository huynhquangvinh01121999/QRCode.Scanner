import React, { useState } from 'react'
import QRCode from 'qrcode'
import { Html5Qrcode } from 'html5-qrcode'

function App() {
  const [urlQrCode, setUrlQrCode] = useState("")
  const [value, setValue] = useState("")

  const generateQrCode = async () => {
    try {
      var url = await QRCode.toDataURL(value)
      setUrlQrCode(url)
      console.log(url);
    } catch (err) { }
  }

  const generateQrCodeKeydown = async (e) => {
    if (e.keyCode == 13) {
      try {
        var url = await QRCode.toDataURL(value)
        setUrlQrCode(url)
        console.log(url);
      } catch (err) { }
    }
  }

  const generateQrCodeFromJson = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    var url = await QRCode.toDataURL(JSON.stringify(data[0]))
    setUrlQrCode(url)
    setValue(JSON.stringify(data[0]))
    console.log(url);
  }

  const handleScanQrCode = (e) => {
    const html5QrCode = new Html5Qrcode("reader");
    if (e.target.files.length == 0) {
      return;
    }

    const imageFile = e.target.files[0];
    html5QrCode.scanFile(imageFile, true)
      .then(data => {
        setValue(data);
        setUrlQrCode("")
      })
      .catch(err => {
        console.log(`Error scanning file. Reason: ${err}`)
      });
    html5QrCode.clear();
  }

  return (
    <>
      <h3 className='title'>Generate QR Code</h3>
      <div className="main">
        <textarea rows={8} value={value}
          placeholder="Input text to convert QR"
          onChange={e => setValue(e.target.value)}
          onKeyDown={generateQrCodeKeydown}></textarea>

        <button
          onClick={generateQrCode}
          style={{ marginLeft: "5px" }}>Generator QR Code
        </button>

        <button
          onClick={generateQrCodeFromJson}
          style={{ marginTop: "10px" }}>Generator QR Code From JSON API
        </button>

        <button
          onClick={() => window.location.reload()}
          style={{ marginLeft: "150px", marginTop: "10px" }}>Reload page
        </button>

        <div style={{ marginTop: "20px" }}>
          <img src={urlQrCode} alt="null" /><br />
          <a
            href={urlQrCode}
            download={value ? true : false}>Download QR Code
          </a>
        </div>
      </div>
      <hr />

      {/* Read QR Code from Image file */}
      <div id="reader"></div>
      <input type="file"
        accept="image/*"
        onChange={handleScanQrCode} />
    </>
  )
}

export default App

//Link tham khảo
//[x] https://viblo.asia/p/nodejs-tao-qr-code-trong-nodejs-voi-qrcode-L4x5x61mZBM
//[x] https://www.npmjs.com/package/qrcode
//[x] https://www.npmjs.com/package/qrcode-generator
//[x] https://blog.minhazav.dev/HTML5-QR-Code-scanning-support-for-local-file-and-default-camera/
//[x] https://www.npmjs.com/package/html5-qrcode
//[x] https://blog.minhazav.dev/research/html5-qrcode#scan-using-file
//[x] https://dev.to/sbodi10/download-images-using-javascript-51a9