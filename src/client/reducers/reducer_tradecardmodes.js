export default function(state = 'VIEW_TRADE', action)
{
    switch(action.type) {
        case 'VIEW_TRADE':
        return action.payload.mode;

        case 'EDIT_TRADE':
        return action.payload.mode;

        case 'CREATE_TRADE':
        return action.payload.mode;

        case 'CANCEL_EDITED_TRADE':
        return action.payload;

        case 'SAVE_EDITED_TRADE':
        return action.payload.mode;

        case 'CANCEL_CREATE_TRADE':
        return action.payload;

        case 'SAVE_CREATED_TRADE':
        return action.payload.mode;
    }
    return state ;
}
