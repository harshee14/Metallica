export default function(state = null, action)
{

  switch(action.type)
    {
      case 'VIEW_TRADE':
      return action.payload.trade;

      case 'EDIT_TRADE':
      return action.payload.trade;

      case 'SAVE_EDITED_TRADE':
      return action.payload.trade;

      case 'SAVE_CREATED_TRADE':
      return action.payload.trade;

    }
    return null ;
}
