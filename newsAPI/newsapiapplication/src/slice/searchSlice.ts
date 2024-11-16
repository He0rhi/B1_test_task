import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchTextSlice: '',
        showTopicNewsSlice: true,
        showDomainsNewsSlice: true,

        searchDomainSlice:'',
        periodFromSlice:'',
        periodToSlice:'',
        sortSlice:'',
        errorCodeSlice:''
    },
    reducers: {
        setSearchTextSlice: (state, action) => {
            state.searchTextSlice = action.payload;
        },
        setShowTopicNewsSlice: (state, action) => {
            state.showTopicNewsSlice = action.payload;
        },
        setsearchDomainSlice: (state, action) => {
            state.searchDomainSlice = action.payload;
        },
        setPeriodFromSlice: (state, action) => {
            state.periodFromSlice = action.payload;
        },
        setPeriodToSlice: (state, action) => {
            state.periodToSlice = action.payload;
        },
        setSortSlice: (state, action) => {
            state.sortSlice = action.payload;
        },
        setErrorCodeSlice: (state, action) => {
            state.errorCodeSlice = action.payload;
        },
        setShowDomainsNewsSlice: (state, action) => {
            state.showDomainsNewsSlice = action.payload;
        },
        
    },
});

export const {setShowDomainsNewsSlice,setsearchDomainSlice, setSearchTextSlice, setShowTopicNewsSlice, setPeriodFromSlice,setPeriodToSlice,setSortSlice,setErrorCodeSlice } = searchSlice.actions;
export default searchSlice.reducer;
