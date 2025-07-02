import { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import { encryptWithLit } from '../lib/lit/encryptWithLit';
import { getSessionSigsFromSigner } from '../lib/lit/getSessionSigs';
import { accessControlConditions } from '../lib/lit/accessControl';

interface LitEncryptorProps {
  message: string;
  onEncrypted: (ciphertext: string) => void;
  onHash: (hash: string) => void;
  onSigs: (sessionSigs: any) => void;
  onClient: (litNodeClient: any) => void;
}

export default function LitEncryptor({
  message,
  onEncrypted,
  onHash,
  onSigs,
  onClient,
}: LitEncryptorProps) {
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);

  const getEthersSigner = async (): Promise<ethers.JsonRpcSigner | undefined> => {
    if (!walletClient) return undefined;
    const provider = new ethers.BrowserProvider(walletClient.transport as any);
    return await provider.getSigner();
  };

  const handleEncrypt = async () => {
    if (!message) return;

    setLoading(true);
    try {
      const { ciphertext, dataToEncryptHash, litNodeClient } = await encryptWithLit({
        message,
        accessControlConditions,
      });

      const signer = await getEthersSigner();
      if (!signer) {
        console.error('No signer found');
        return;
      }

      const address = await signer.getAddress();

      const sessionSigs = await getSessionSigsFromSigner({
        signer,
        address,
        litNodeClient,
        accessControlConditions,
        dataToEncryptHash,
      });

      // ✅ Pass values back to parent
      onEncrypted(ciphertext);
      onHash(dataToEncryptHash);
      onSigs(sessionSigs);
      onClient(litNodeClient);

      console.log('Encryption successful');
    } catch (error) {
      console.error('Encryption error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl w-fit mx-auto mt-4">
      <button
        onClick={handleEncrypt}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {loading ? 'Encrypting...' : 'Encrypt Message'}
      </button>
    </div>
  );
}
