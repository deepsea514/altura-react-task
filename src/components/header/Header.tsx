import { useCallback, useEffect, useState } from 'react';
import MobileMenu from './Menu/MobileMenu';
import { connectMetaMaskWallet } from '../../redux/services';
import { useDispatch, useSelector } from 'react-redux';
import { CombinedState } from '../../redux/store';

const Header = () => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const { account, errorMsg } = useSelector((state: CombinedState) => state.blockchain);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const connectWallet = useCallback(() => {
    if (account) return;
    connectMetaMaskWallet(dispatch);
  }, [account, dispatch])

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <div>
      <header className="header__1">
        <div className="container">
          <div className="wrapper js-header-wrapper">
            <div className="header__logo">
              <img
                className="header__logo"
                id="logo_js"
                src="/logo192.png"
                alt="logo"
              />
            </div>

            <div className="header__btns">
              <button className="btn btn-grad btn-sm" onClick={connectWallet}>
                <i className="ri-wallet-3-line" />
                {account ? (account.slice(0, 8) + "...") : "Connect wallet"}
              </button>
              {errorMsg && <p className='text-danger'>{errorMsg}</p>}
            </div>
            <div className="header__burger js-header-burger" onClick={toggleClass} />
            <div className={` header__mobile js-header-mobile  ${isActive ? 'visible' : null} `}>
              <MobileMenu connectWallet={connectWallet} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
