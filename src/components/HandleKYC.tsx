import { useState } from 'react';
import HandleFileUpload from './HandleFileUpload';
import LitEncryptor from './LitEncryptor';
import LitDecryptor from './LitDecryptor';

export default function HandleKYC() {
  const [file, setFile] = useState<File | null>(null);

  // State for Lit encryption/decryption
  const [ciphertext, setCiphertext] = useState('');
  const [dataToEncryptHash, setDataToEncryptHash] = useState('');
  const [sessionSigs, setSessionSigs] = useState<any>(null);
  const [litNodeClient, setLitNodeClient] = useState<any>(null);
  const [decryptedText, setDecryptedText] = useState('');

  return (
    <div className="p-4 border rounded-xl w-fit mx-auto mt-10 space-y-4">
      <HandleFileUpload onFileSelect={setFile} />

      {file && (
        <div className="text-sm text-gray-700">
          <p><strong>Filename:</strong> {file.name}</p>
          <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
          <p><strong>Type:</strong> {file.type}</p>
        </div>
      )}

      {/* 👇 Lit Encryptor Component */}
      <LitEncryptor
        message="there goes the test string" // This is the string to encrypt
        onEncrypted={setCiphertext}
        onHash={setDataToEncryptHash}
        onSigs={setSessionSigs}
        onClient={setLitNodeClient}
      />

      {/* 👇 Lit Decryptor Component */}
      <LitDecryptor
        ciphertext={ciphertext}
        dataToEncryptHash={dataToEncryptHash}
        sessionSigs={sessionSigs}
        litNodeClient={litNodeClient}
        onDecrypted={(text) => setDecryptedText(text)}
      />

      {/* 👇 Show decrypted output */}
      {decryptedText && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
          <strong>Decrypted Text:</strong> {decryptedText}
        </div>
      )}
    </div>
  );
}
