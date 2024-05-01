// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit"

let id = 1
const getNextId = () => id++

const quotesSlice = createSlice({
name: 'quotes_state',
initialState : {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
},
reducers: {
  toggleVisibility(state) {
    state.displayAllQuotes = !state.displayAllQuotes
  },
  setHighlightedQuote(state, action) {
   if(state.highlightedQuote === action.payload) {
    state.highlightedQuote = null
   } else {
    state.highlightedQuote = action.payload
   }
  },
  setApocryphalStatus(state, action) {
    const fakeQuote = state.quotes.find(qt => qt.id === action.payload)
    fakeQuote.apocryphal = !fakeQuote.apocryphal
  },
  deleteQuote(state, action) {
    state.quotes = state.quotes.filter(qt =>  qt.id !== action.payload)
  },
  createQuote: {
    prepare({authorName, quoteText}) {
      return {
        payload: {
          id: getNextId(),
          quoteText,
          authorName,
          apocryphal: false
        }
      }
    },
    reducer(state, action) {
      state.quotes.push(action.payload)
    }
  }
 }
}) 

export default quotesSlice.reducer
export const {
  toggleVisibility, 
  setHighlightedQuote,
  setApocryphalStatus,
  deleteQuote,
  createQuote
} = quotesSlice.actions