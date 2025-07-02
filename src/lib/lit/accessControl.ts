export const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "sepolia",
      method: "eth_getBalance",
      parameters: [":userAddress", "latest"],
      returnValueTest: {
        comparator: ">=",
        value: "1000000000000",
      },
    },
  ];
  