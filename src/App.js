import React, { useState } from 'react'
import QRCode from 'qrcode'
import { Html5Qrcode } from 'html5-qrcode'
import { createCanvas, loadImage } from 'canvas'
import Button from './Components/Button'

function App() {
  const [urlQrCode, setUrlQrCode] = useState("")
  const [value, setValue] = useState("test")
  const options = {
    // phiên bản của QR code
    //version: 1,

    // Mức độ sửa lỗi: cho phép quét mã QR Code thành công ngay cả khi biểu tượng bị bẩn hoặc bị hỏng
    // có 4 mức độ: L(~7%), M(~15%), Q(~25%), H(~30%)
    // mức càng cao, khả năng chống lỗi càng cao
    errorCorrectionLevel: 'H',

    // Định dạng kiểu dữ liệu URI
    type: 'image/webp',

    // Chất lượng hình ảnh: quy định từ 0 -> 1
    quality: 0.3,

    // canh 4 cạnh của QR code
    margin: 0.5,

    // custom màu cho QRCode. Thuộc tính dark - là màu của QRCode, light - là màu background
    color: {
      dark: "#FF0000",
      light: "#FFFFFF",
    },
    width: 200 // chiều rộng của QRCode,
  };

  // toDataURL
  const generateQrCode = async () => {
    // C1: Viết theo kiểu truyền thẳng callback vào function toDataURL
    // QRCode.toDataURL(value, options, function (err, url) {
    //   setUrlQrCode(url)
    // })

    // C2: Viết theo kiểu Promise then catch
    // QRCode.toDataURL(value, options)
    //   .then(url => {
    //     setUrlQrCode(url)
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })

    // C3: viết theo kiểu Promise async await
    try {
      var url = await QRCode.toDataURL(value, options)
      setUrlQrCode(url)
      console.log(url)
    } catch (err) { }
  }

  // toString
  const generateQrCodeToString = async () => {
    QRCode.toString(value, options, function (err, url) {
      var element = document.getElementById("load_svg")
      console.log(url)
      element.innerHTML = url
    })
  }

  // toCanvas
  const generateQrCodeToCanvas = async () => {
    // dùng div append child 
    // QRCode.toCanvas(value, options, function (err, canvas) {
    //   if (err) throw err
    //   console.log(canvas)
    //   var element = document.getElementById('load_canvas')
    //   element.appendChild(canvas)
    // })

    // dùng thẻ canvas
    var element = document.getElementById('canvas')
    QRCode.toCanvas(element,
      value, options, function (error) {
        if (error) console.error(error)
        console.log('success!')
      })
  }

  // enter (keyCode = 13)
  const generateQrCodeKeydown = async (e) => {
    if (e.keyCode == 13) {
      try {
        var url = await QRCode.toDataURL(value)
        setUrlQrCode(url)
        console.log(url)
      } catch (err) { }
    }
  }

  // generate QR Code from API
  const generateQrCodeFromJson = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    var url = await QRCode.toDataURL(JSON.stringify(data[0]), options)
    setUrlQrCode(url)
    setValue(JSON.stringify(data[0]))
    console.log(url)
  }

  //#region Method toBuffer & toFile
  // toBuffer là một method. Chỉ được sử dụng trong class 
  const generateQrCodeToBuffer = async () => {
    try {
      var result = await QRCode.toBuffer(value)
      console.log(result)
    } catch (err) { console.log(err) }
  }

  // toFile is method. Chỉ được sử dụng trong class 
  const generateQrCodeToFile = () => {
    QRCode.toFile('/src/test.png', value, function (err) {
      if (err) throw err
      console.log('done')
    })
  }

  // toFileStream is method. Chỉ được sử dụng trong class 
  const generateQrCodeToFileStream = () => {
    QRCode.toFileStream('/src/test.png', value, function (err) {
      if (err) throw err
      console.log('done')
    })
  }

  // create is method. Chỉ được sử dụng trong class 
  const generateQrCodeWithCreate = () => {
    QRCode.create(value, options).then(res => console.log(res)).catch(err => console.log(err))
  }
  //#endregion

  // scan QRCode
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
    html5QrCode.clear()
  }

  const createQRCode = async (data, logo, width, cwidth) => {
    const canvas = createCanvas(width, width)
    QRCode.toCanvas(
      canvas,
      data,
      {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 0.5,
        color: {
          dark: "#FF0000",
          light: "#FFFFCC",
        },
        width: 256
      }
    )

    const ctx = canvas.getContext("2d")
    const img = await loadImage(logo)
    const center = (width - cwidth) / 2
    ctx.drawImage(img, center, center, 50, 50);
    return canvas.toDataURL("image/png")
  }

  const handleCreate = async () => {
    const qrCode = await createQRCode(
      value,
      "data:image/png;base64,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",
      256,
      50
    )

    setUrlQrCode(qrCode)
  }

  return (
    <>
      <h3 className='title'>Generate QR Code</h3>
      <div className="main">
        <textarea rows={8} value={value}
          placeholder="Input text to convert QR"
          onChange={e => setValue(e.target.value)}
          onKeyDown={generateQrCodeKeydown}></textarea>

        <div>
          <Button OnClick={handleCreate} Value="Test" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeFromJson} Value="Generator QRCode From JSON API" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCode} Value="Generator QRCode to DataURL" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeToString} Value="Generator QRCode to String" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeToCanvas} Value="Generator QRCode to Canvas" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeWithCreate} Value="Create QR Code" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeToBuffer} Value="Generator QRCode to Buffer" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeToFile} Value="Generator QR Code to File" Style={{ marginTop: "10px" }} />
          <Button OnClick={generateQrCodeToFileStream} Value="Generator to FileStream" Style={{ marginTop: "10px" }} />
          <Button OnClick={() => window.location.reload()} Value="Reload page" Style={{ marginTop: "10px" }} />
        </div>

        <div style={{ marginTop: "20px" }}>
          <img src={urlQrCode} alt="null" /><br />
          <a
            href={urlQrCode}
            download={value ? true : false}>Download QR Code
          </a>
        </div>
        <div id="load_svg"></div>
        <div id="load_canvas"></div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: "" }}>
          <canvas id="canvas" style={{ broder: "1px solid #ccc" }}></canvas>
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

// https://www.cssscript.com/qr-code-generator-logo-title/
// https://www.jqueryscript.net/other/qr-code-logo-label.html
// https://github.com/jeromeetienne/jquery-qrcode
// https://www.qrcode-monkey.com/qr-code-api-with-logo/
// https://rapidapi.com/qrcode-monkey/api/custom-qr-code-with-logo

// https://codesandbox.io/s/qr-code-styling-react-example-l8rwl?file=/src/App.js
// https://github.com/ushelp/EasyQRCodeJS#react-support
// https://packagist.org/packages/simplesoftwareio/simple-qrcode
// https://www.simplesoftware.io/#/docs/simple-qrcode