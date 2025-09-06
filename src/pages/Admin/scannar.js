window.startScanner = async function () {
  const codeReader = new BrowserMultiFormatReader();
  const videoElement = document.getElementById("reader");
  const resultText = document.getElementById("result");
  const decrypted = document.getElementById("decrypted");

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputDevices = devices.filter(d => d.kind === "videoinput");
    const backCamera = videoInputDevices.find(d => d.label.toLowerCase().includes("back")) || videoInputDevices[0];
    const selectedDeviceId = backCamera.deviceId;

    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      "reader",
      async (result, err, controls) => {
        if (result) {
          const encryptedText = JSON.parse(result.getText());
          
          resultText.textContent = "Scanned QR Code: " encryptedText;

          try {
            const plainText = await decrypt(encryptedText, password);
            decrypted.textContent = "We decrypted the value and it is: " + plainText;
          } catch (decryptionError) {
            decrypted.textContent = "Failed to decrypt: " + decryptionError.message;
          }

          controls.stop();
          videoElement.srcObject = null;
          videoElement.style.display = "none";
        }
      }
    );

    videoElement.style.display = "block";
  } catch (err) {
    alert("Camera error: " + err.message);
  }
};
