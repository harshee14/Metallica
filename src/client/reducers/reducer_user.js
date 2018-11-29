export default function(state = { isAuthenticated: false, user: null, token: ''}, action) {

  switch(action.type) {

      case 'LOGIN':
        return action.payload;
    
      case 'LOGOUT':
        return action.payload;

    }

    return state ;
}
