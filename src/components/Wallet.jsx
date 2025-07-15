import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletAddress } from '../redux/action';
import toast from 'react-hot-toast';

export default function Wallet() {
  const address = useSelector((state) => state.wallet.walletAddress);
  const [network, setNetwork] = useState(null);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    // Check if ethereum exists
    if (!window.ethereum) {
      toast.error('MetaMask not found');
      return;
    }

    try {
      // Fetch all accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Default consider 1st account
      dispatch(setWalletAddress(accounts[0]));

      toast.success('Wallet Connected!');

      // Get ethereum chainid
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setNetwork(chainId);

      // Detect account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        dispatch(setWalletAddress(accounts[0] || null));
        if (accounts[0]) {
          toast.success('Account switched!');
        } else {
          toast.error('Wallet Disconnected!');
        }
      });

      // Detect chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        setNetwork(chainId);
        window.location.reload(); // Refresh app on network change
      });
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    dispatch(setWalletAddress(null));
    setNetwork(null);
    toast.error('Wallet Disconnected!');
  };

  return (
    <div>
      {address ? (
        <div>
          <p>Connected: {address}</p>
          <p>Network ID: {network}</p>
          <button
            className='btn btn-outline-dark m-2'
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button className='btn btn-outline-dark m-2' onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
