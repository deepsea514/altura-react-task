import { actions } from "./reducer";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider;
    }
}

export const connectMetaMaskWallet = async (dispatch: any) => {
    dispatch(actions.connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            }) as string[];
            dispatch(
                actions.connectSuccess({
                    account: accounts[0]!,
                })
            );
            // Add listeners start
            ethereum.on("accountsChanged", (accounts: unknown) => {
                const strAccounts = accounts as string[];
                dispatch(actions.updateAccount({ account: strAccounts[0]! }));
            });
        } catch (error) {
            dispatch(actions.connectFailed({ errorMsg: "Something went wrong." }));
        }
    } else {
        dispatch(actions.connectFailed({ errorMsg: "Install Metamask." }));
    }
};
