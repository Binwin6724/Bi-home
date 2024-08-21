import React, { useState } from "react";
import CryptoJS from "crypto-js";

const EncryptDecrypt = () => {
  const [textToEncrypt, setTextToEncrypt] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [key, setKey] = useState("");
  const [method, setMethod] = useState("AES"); // Default encryption method
  const [textToDecrypt, setTextToDecrypt] = useState("");

  const encryptionMethods = {
    AES: CryptoJS.AES,
    DES: CryptoJS.DES,
    TripleDES: CryptoJS.TripleDES,
    RC4: CryptoJS.RC4,
  };

  const handleEncrypt = () => {
    if (!textToEncrypt || !key) {
      alert("Please enter text and a key to encrypt.");
      return;
    }
    const encryptionMethod = encryptionMethods[method];
    const ciphertext = encryptionMethod.encrypt(textToEncrypt, key).toString();
    setEncryptedText(ciphertext);
  };

  const handleDecrypt = () => {
    if (!textToDecrypt || !key) {
      alert("Please enter encrypted text and the correct key to decrypt.");
      return;
    }
    try {
      const decryptionMethod = encryptionMethods[method];
      const bytes = decryptionMethod.decrypt(textToDecrypt, key);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedText(originalText);
    } catch (error) {
      alert("Decryption failed. Please check your key and encryption method.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Encryption Section */}
      <div style={{ width: "48%" }}>
        <h2>Encrypt Text</h2>
        <div>
          <label>
            Encryption Method:
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              style={{ marginLeft: "10px", width: "200px" }}
            >
              <option value="AES">AES</option>
              <option value="DES">DES</option>
              <option value="TripleDES">TripleDES</option>
              <option value="RC4">RC4</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>
            Key:
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter encryption key"
              style={{ marginLeft: "10px", width: "300px" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <textarea
            rows="4"
            cols="50"
            value={textToEncrypt}
            onChange={(e) => setTextToEncrypt(e.target.value)}
            placeholder="Enter text to encrypt"
          />
        </div>
        <button onClick={handleEncrypt} style={{ marginTop: "10px", width:"120px" }}>
          Encrypt
        </button>
        <div style={{ marginTop: "10px" }}>
          <textarea
            rows="4"
            cols="50"
            value={encryptedText}
            readOnly
            placeholder="Encrypted text will appear here"
          />
        </div>
      </div>

      {/* Decryption Section */}
      <div style={{ width: "48%" }}>
        <h2>Decrypt Text</h2>
        <div style={{ marginTop: "10px" }}>
          <textarea
            rows="4"
            cols="50"
            value={textToDecrypt}
            onChange={(e) => setTextToDecrypt(e.target.value)}
            placeholder="Enter text to decrypt"
          />
        </div>
        <button onClick={handleDecrypt} style={{ marginTop: "10px", width:"120px" }}>
          Decrypt
        </button>
        <div style={{ marginTop: "10px" }}>
          <textarea
            rows="4"
            cols="50"
            value={decryptedText}
            readOnly
            placeholder="Decrypted text will appear here"
          />
        </div>
      </div>
    </div>
  );
};

export default EncryptDecrypt;
