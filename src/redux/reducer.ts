// import { put, takeLatest } from "redux-saga/effects";

export type BlockchainState = {
    loading: boolean,
    account: string | null,
    errorMsg: string | null,
}

const initialState: BlockchainState = {
    loading: false,
    account: null,
    errorMsg: null,
};

enum actionTypes {
    connectionRequest = "CONNECTION_REQUEST",
    connectionSuccess = "CONNECTION_SUCCESS",
    connectionFailed = "CONNECTION_FAILED",
    updateAccount = "UPDATE_ACCOUNT",
}

export type ActionType = {
    type: actionTypes,
    payload: Partial<BlockchainState>
}

const blockchainReducer = (state = initialState, action: ActionType): BlockchainState => {
    switch (action.type) {
        case actionTypes.connectionRequest:
            return {
                ...initialState,
                loading: true,
                errorMsg: null,
            };
        case actionTypes.connectionSuccess:
            return {
                ...state,
                loading: false,
                account: action.payload.account!,
                errorMsg: null,
            };
        case actionTypes.connectionFailed:
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload.errorMsg!,
            };
        case actionTypes.updateAccount:
            return {
                ...state,
                account: action.payload.account!,
                errorMsg: null,
            };
        default:
            return state;
    }
};

export const actions = {
    connectRequest: () => ({ type: actionTypes.connectionRequest }),
    connectSuccess: (payload: Partial<BlockchainState>) => ({ type: actionTypes.connectionSuccess, payload: payload }),
    connectFailed: (payload: Partial<BlockchainState>) => ({ type: actionTypes.connectionFailed, payload: payload }),
    updateAccount: (payload: Partial<BlockchainState>) => ({ type: actionTypes.updateAccount, payload: payload }),
}

export default blockchainReducer;
