import { createSlice } from '@reduxjs/toolkit';


// Questo slice mantiene i dati degli articoli che vengono mostrati nel Blog
export const articlesBlogSlice = createSlice({
    name: 'articles',
    initialState: {
        articlesByCategory: [],
        selectedCategory: null,
        category: [], // Ci sono tutte le categorie
    },
    reducers: {
        // Popola la pagina Blog con tutte le categorie
        setCategoryPageBlog(state, action) {
            state.category = action.payload;
        },
        setArticlesByCategory(state, action) {
            state.articlesByCategory = action.payload;
        },
        selectedCategoria(state, action) {
            state.selectedCategory = action.payload;
        },
        // Resetta la categoria selezionata
        resetSelectedCategory(state) {
            state.selectedCategory = null;
        },
    },
});

export const {
    setCategoryPageBlog,
    setArticlesByCategory,
    selectedCategoria,
    resetSelectedCategory,
} = articlesBlogSlice.actions;


export default articlesBlogSlice.reducer;


