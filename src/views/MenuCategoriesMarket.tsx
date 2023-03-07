import React from 'react';
import CardMarketplace from '../components/cards/CardMarketplace';

function MenuCategoriesMarket() {
  return (
    <div className="w-100">
      <div className="container">
        <div className="section mt-100">
          <div>
            <h2 className="section__title mb-20"> NFTs</h2>
            <div>
              <div>
                <div className="d-flex align-items-center">
                  <CardMarketplace />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCategoriesMarket;
