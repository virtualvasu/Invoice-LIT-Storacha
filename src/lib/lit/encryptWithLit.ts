import * as LitJsSdk from '@lit-protocol/lit-node-client';

export async function encryptWithLit({
  message,
  accessControlConditions,
  chain = 'sepolia'
}: {
  message: string;
  accessControlConditions: any[];
  chain?: string;
}) {
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: 'datil-dev' });
  await litNodeClient.connect();

  const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
    { accessControlConditions, dataToEncrypt: message },
    litNodeClient
  );

  return {
    ciphertext,
    dataToEncryptHash,
    litNodeClient
  };
}
