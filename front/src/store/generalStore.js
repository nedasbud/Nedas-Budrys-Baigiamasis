import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: 'generalStore',
  initialState: {
    usersData: [],
    loggedIn: false,
    currentUser: '',
    userData: null,
    userCard: null,
    userPics: 1,
    matches: []
  },
  reducers: {
    updateUsersData: (state, action) => {
      state.usersData = action.payload
    },
    updateLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    updateUserData: (state, action) => {
      state.userData = action.payload
    },
    updateUserCard: (state, action) => {
      state.userCard = action.payload
    },
    updateUserPics: (state, action) => {
      state.userPics = action.payload
    },
    updateMatches: (state, action) => {
      state.matches = action.payload
    }
  }
})

export const { updateUsersData, updateLoggedIn, updateCurrentUser, updateUserData, updateUserCard, updateUserPics, updateMatches } = generalSlice.actions

export default generalSlice.reducer