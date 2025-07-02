import * as LitJsSdk from '@lit-protocol/lit-node-client';

export async function decryptWithLit({
  ciphertext,
  dataToEncryptHash,
  sessionSigs,
  accessControlConditions,
  litNodeClient,
  chain = 'sepolia',
}: {
  ciphertext: string;
  dataToEncryptHash: string;
  sessionSigs: any;
  accessControlConditions: any[];
  litNodeClient: any;
  chain?: string;
}) {
  const result = await LitJsSdk.decryptToString(
    {
      accessControlConditions,
      ciphertext,
      dataToEncryptHash,
      sessionSigs,
      chain,
    },
    litNodeClient
  );

  return result;
}
