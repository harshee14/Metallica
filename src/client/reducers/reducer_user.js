export default function(state = { isAuthenticated: false, user: null, token: ''}, action) {
console.log('reducer_user',action)
  switch(action.type) {
      case 'LOGIN':
      {
        console.log("reducer_user" , action);
        return action.payload;
      }

      case 'LOGOUT':
      {
        console.log("reducer_user logout" , action);
        return action.payload;
      }

    }
    return state ;
}
