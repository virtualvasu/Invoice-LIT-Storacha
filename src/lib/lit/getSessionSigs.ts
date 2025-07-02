import {
    LitAccessControlConditionResource,
    LitAbility,
    generateAuthSig,
    createSiweMessageWithRecaps
  } from '@lit-protocol/auth-helpers';
  
  export async function getSessionSigsFromSigner({
    signer,
    address,
    litNodeClient,
    accessControlConditions,
    dataToEncryptHash
  }: {
    signer: any;
    address: string;
    litNodeClient: any;
    accessControlConditions: any[];
    dataToEncryptHash: string;
  }) {
    const accsResourceString = await LitAccessControlConditionResource.generateResourceString(
      accessControlConditions,
      dataToEncryptHash
    );
  
    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: 'sepolia',
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
      resourceAbilityRequests: [
        {
          resource: new LitAccessControlConditionResource(accsResourceString),
          ability: LitAbility.AccessControlConditionDecryption,
        },
      ],
      authNeededCallback: async ({ resourceAbilityRequests, expiration, uri }: any) => {
        const toSign = await createSiweMessageWithRecaps({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress: address,
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });
  
        return await generateAuthSig({
          signer,
          toSign,
        });
      },
    });
  
    return sessionSigs;
  }
  