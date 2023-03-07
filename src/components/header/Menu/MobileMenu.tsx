import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CombinedState } from '../../../redux/store';

type MobileMenuProps = {
  connectWallet: () => void
}
const MobileMenu: FC<MobileMenuProps> = ({ connectWallet }) => {
  const { account, errorMsg } = useSelector((state: CombinedState) => state.blockchain);
  return (
    <div>
      <div className="header__mobile__menu space-y-40">
        <div className="space-y-20">
          <button className="btn btn-grad btn-sm" onClick={connectWallet}>
            {account ? (account.slice(0, 8) + "...") : "Connect wallet"}
          </button>
          {errorMsg && <p className='text-danger'>{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
