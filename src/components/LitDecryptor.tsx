import { useState } from 'react';
import { decryptWithLit } from '../lib/lit/decryptWithLit';
import { accessControlConditions } from '../lib/lit/accessControl';

interface LitDecryptorProps {
  ciphertext: string;
  dataToEncryptHash: string;
  sessionSigs: any;
  litNodeClient: any;
  onDecrypted: (decryptedText: string) => void;
}

export default function LitDecryptor({
  ciphertext,
  dataToEncryptHash,
  sessionSigs,
  litNodeClient,
  onDecrypted,
}: LitDecryptorProps) {
  const [loading, setLoading] = useState(false);

  const handleDecrypt = async () => {
    if (!ciphertext || !dataToEncryptHash || !sessionSigs || !litNodeClient) return;

    setLoading(true);
    try {
      const decrypted = await decryptWithLit({
        ciphertext,
        dataToEncryptHash,
        sessionSigs,
        accessControlConditions,
        litNodeClient,
      });

      console.log('Decrypted:', decrypted);
      onDecrypted(decrypted);

      await litNodeClient.disconnect();
    } catch (error) {
      console.error('Decryption error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl w-fit mx-auto mt-4">
      <button
        onClick={handleDecrypt}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {loading ? 'Decrypting...' : 'Decrypt Message'}
      </button>
    </div>
  );
}
