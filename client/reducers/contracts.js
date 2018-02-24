function contracts(state = {}, action){
    switch(action.type){
        case 'SET_CONTRACTS':
            return [ ...action.load ];
    };
    return state;
};

export default contracts;