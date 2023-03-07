import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MoralisAPI from '../../helper/moralis_api';
import { NFTDetailParsed, NFTResponse } from '../../types';
import axios from 'axios';

const convertIPFSURL = (ipfsUrl: string): string => {
  if (ipfsUrl.search('ipfs://') === -1) return ipfsUrl;

  ipfsUrl = ipfsUrl.replace('ipfs://', '');
  return 'https://ipfs.io/ipfs/' + ipfsUrl
}

function CardMarketplace() {
  const [selected, setSelected] = useState<NFTDetailParsed | null>(null);
  const [nfts, setNFTs] = useState<NFTDetailParsed[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setNFTs([])
    MoralisAPI.get<NFTResponse>(`/0xd8da6bf26964af9d7eed9e03e53415d37aa96045/nft`, {
      params: {
        chain: "eth",
        format: "decimal"
      }
    }).then(async ({ data }) => {
      const parsedNFT = await Promise.all(data.result
        .map(async nft => {
          let obj: NFTDetailParsed = { ...nft, image: null }
          if (nft.metadata) {
            obj.metadata = JSON.parse(nft.metadata)
            if (obj.metadata.image) obj.image = obj.metadata.image
          }
          if (obj.image == null && obj.token_uri) {
            try {
              const { data } = await axios.get(obj.token_uri);
              obj.image = data.image;
            } catch (error) { }
          }
          return obj;
        }))
      setNFTs(parsedNFT);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
    })

  }, [])

  const getImage = (nft: NFTDetailParsed) => {
    if (!nft.image) return (<img src="/item_unknown.png" alt="nftimage" />);
    return (<img src={convertIPFSURL(nft.image)} alt="nftimage" />);
  }

  return (
    <>
      <div className="row mb-30_reset">
        {loading && <h4>Loading ...</h4>}
        {nfts.map((nft, i) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 cursor-pointer"
            key={i} onClick={() => setSelected(nft)}>
            <div className="card__item four">
              <div className="card_body space-y-10">
                <div className="card_head">
                  {getImage(nft)}
                </div>
                <h6 className="card_title">{nft.name} #{nft.token_id}</h6>
                <div className="card_footer d-block space-y-10">
                  <div className="card_footer justify-content-between">
                    <div className="creators">
                      <p className="txt_sm"> {nft.amount} in stock</p>
                    </div>
                  </div>
                  <div className="card_footer justify-content-between">
                    <div className="creators">
                      <p className="txt_sm"> Contract Type: {nft.contract_type}</p>
                    </div>
                  </div>
                  <div className="hr" />
                  <div
                    className="d-flex
          align-items-center
          space-x-10
          justify-content-between">
                    <button className="btn btn-sm btn-primary">
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Popup
        className="custom"
        open={selected != null}
        onClose={() => setSelected(null)}
        position="bottom center">
        <div>
          <div
            className="popup"
            id="popup_bid"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true">
            <div>
              <button
                type="button"
                className="button close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelected(null)}>
                <span aria-hidden="true">×</span>
              </button>
              {selected != null && <div className=" space-y-20">
                <h3>NFT Detail</h3>
                <div className="hr" />
                <div className="d-flex justify-content-between">
                  <p> NFT Name:</p>
                  <p className="text-right color_black txt _bold">
                    {selected.name} #{selected.token_id}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p> Symbol:</p>
                  <p className="text-right color_black txt _bold">
                    {selected.symbol}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p> Amount:</p>
                  <p className="text-right color_black txt _bold">
                    {selected.amount}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p> Contract Type:</p>
                  <p className="text-right color_black txt _bold">
                    {selected.contract_type}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p> Minter:</p>
                  <p className="text-right color_black txt _bold">
                    {selected.minter_address.slice(0, 10) + '...'}
                  </p>
                </div>
                <a target='_blank'
                  href={`https://opensea.io/assets/ethereum/${selected.token_address}/${selected.token_id}`}
                  className="btn btn-lg btn-primary" rel="noreferrer">
                  Purchase
                </a>
              </div>}
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default CardMarketplace;
