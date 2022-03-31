import createDataContext from './createDataContext';

const reducer = (state, action) => {
    switch(action.type) {
        case 'addNote': 
            return ([...state, {id: Math.floor(Math.random() * 9999), title: `Note #${state.length + 1}`}])
        case 'deleteNote' :
            return state.filter((Note) => Note.id !== action.payload )
        default:
            return (state)
    }
};
const addNotes = dispatch => {
    return () => {
        dispatch({type: 'addNote'})
    }    
};

const deleteNotes = dispatch => {
    return (id) => {
        dispatch({type: 'deleteNote', payload: id})
    }
}

export const { Context, Provider, } = createDataContext( reducer, { addNotes, deleteNotes }, []);