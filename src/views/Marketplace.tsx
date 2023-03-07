import Header from '../components/header/Header';
import HeroMarketplace from '../components/HeroMarketplace';
import MenuCategoriesMarket from './MenuCategoriesMarket';

const Marketplace = () => {
  return (
    <div>
      <Header />
      <HeroMarketplace />
      <div className="d-flex justify-content-center">
        <MenuCategoriesMarket />
      </div>
      <div className="section my-100"></div>
    </div>
  );
};

export default Marketplace;
