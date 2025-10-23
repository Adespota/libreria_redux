import { createSlice } from '@reduxjs/toolkit';


// Questo slice mantiene i dati degli articoli che vengono mostrati nel Blog
export const articlesBlogSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: ['elemento 1'],
        articlesByCategory: [],
        selectedCategory: null,
        category: [],
        loading: false,
    },
    reducers: {
        // Sovrascrive completamente l'array di articoli
        setArticles(state, action) {
            state.articles = action.payload;
        },
        setArticlesByCategory(state, action) {
            state.articlesByCategory = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        },
        // Resetta la categoria selezionata
        resetSelectedCategory(state) {
            state.selectedCategory = null;
        },
        // Popola la pagina Blog con tutte le categorie
        setCategoryPageBlog(state, action) {
            state.category = action.payload;
        },
    },
});

export const {
    setArticles,
    setSelectedCategory,
    setArticlesByCategory,
    setCategoryPageBlog,
    resetSelectedCategory,
    setLoading,
} = articlesBlogSlice.actions;

export const selectArticles = (state) => state.articles.articles;
export const selectArticlesByCategory = (state) => state.articles.articlesByCategory;
export const selectSelectedCategory = (state) => state.articles.selectedCategory;
export const selectCategoryPageBlog = (state) => state.articles.category;
export const selectLoading = (state) => state.articles.loading;


export default articlesBlogSlice.reducer;


