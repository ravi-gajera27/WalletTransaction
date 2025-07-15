const initialState = {
  walletAddress: '',
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SETADDRESS':
      return { ...state, walletAddress: action.payload };
    default:
      return state;
  }
};

export default walletReducer;
