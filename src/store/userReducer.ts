type InitialStateProps = {
  userEmail: String;
  userLogged: Boolean;
};

const INITIAL_STATE:InitialStateProps = {
  userEmail: '',
  userLogged: false
};

function userReducer(state = INITIAL_STATE, action: any) {
  switch(action.type) {
    case 'LOG_IN':
      return { ...state, userLogged: true, userEmail: action.userEmail };
    case 'LOG_OUT':
      return { ...state, userLogged: false, userEmail: null };
    default:
      return state;
  };
};

export default userReducer;