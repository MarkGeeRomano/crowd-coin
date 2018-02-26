function campaigns(state = {}, action){
    switch(action.type){
        case 'SET_CAMPAIGNS':
            return [ ...action.load ];
    };
    return state;
};

export default campaigns;