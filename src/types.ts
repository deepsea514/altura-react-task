export type NFTResponse = {
    total: number | null,
    page: number,
    page_size: number,
    cursor: string,
    result: NFTDetail[],
    status: string
}

export type NFTDetail = {
    token_address: string,
    token_id: number,
    amount: number,
    owner_of: string,
    token_hash: string,
    block_number_minted: number,
    block_number: number,
    contract_type: string,
    name: string,
    symbol: string,
    token_uri: string,
    metadata: string,
    last_token_uri_sync: Date,
    last_metadata_sync: Date,
    minter_address: string
}

export type NFTDetailParsed = {
    token_address: string,
    token_id: number,
    amount: number,
    owner_of: string,
    token_hash: string,
    block_number_minted: number,
    block_number: number,
    contract_type: string,
    name: string,
    symbol: string,
    token_uri: string,
    metadata: any,
    last_token_uri_sync: Date,
    last_metadata_sync: Date,
    minter_address: string,
    image: string | null
}