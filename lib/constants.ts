import { ChainsType, CHAINS } from "types";

export const CHAINS_CONFIG: ChainsType = {
		[CHAINS.ARWEAVE]: {
            id: CHAINS.ARWEAVE,
            label: "Arweave",
            active: true,
            logoUrl: "https://cryptologos.cc/logos/arweave-ar-logo.svg?v=013",
            steps: [
                {
                    id: "connect",
                    title: "Connect to Arweave",
                    url: ""
                },
                {
                    id: "wallet",
                    title: "Create an Wallet",
                    url: ""
                },
                {
                    id: "fund",
                    title: "Fund the account with AR",
                    url: ""
                },
                {
                    id: "balance",
                    title: "Get the balance of the wallet",
                    url: ""
                },
                {
                    id: "transfert",
                    title: "Transfert some AR",
                    url: ""
                },
                {
                    id: "submit",
                    title: "Submitting a data transaction",
                    url: ""
                },
                {
                    id: "deploy",
                    title: "Deploy SmartWeave Contract",
                    url: ""
                },
                {
                    id: "interact",
                    title: "Interacting with SmartWeave",
                    url: ""
                },
                {
                    id: "retrieve",
                    title: "Retrieve All post from Adress",
                    url: ""
                },
            ]
        },
}
