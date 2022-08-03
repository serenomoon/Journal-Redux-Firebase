import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote:( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setACtiveNote: ( state, action ) => {
            state.active = action.payload;
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload; 
        },
        setSaving: ( state ) => {

        },
        updateNote: ( state, action ) => {
            
        },
        deleteNoteById: ( state, action ) => {
            
        },
    }
});


export const { 
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setACtiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;