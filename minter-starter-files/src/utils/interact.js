export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const address = await window.ethereum.enable();
            const obj = {
                connectedStatus: true,
                status: "",
                address: address
            }
            return obj;
        } catch (error) { 
            return {
                connectedStatus: false,
                status: "Connect to Metamask using the button at the top of the page"
            }
        }
    } else {
        return {
            connectedStatus: false,
            status: "You must install the Metamask Wallet Browser Extension!"
        }
    }
};