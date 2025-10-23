// src/index.js
export { default as articoloReducer }     from './store/articoloSlice.js';
export { default as articlesBlogReducer } from './store/articlesBlogSlice.js';
export { default as snackbarReducer }     from './store/snackbarSlice.js';

// tutto (azioni + selectors) raggruppato per slice → nessun clash
export * as articolo     from './store/articoloSlice.js';
export * as articlesBlog from './store/articlesBlogSlice.js';
export * as snackbar     from './store/snackbarSlice.js';


import {
    setArticles,
    setSelectedCategory,
    setArticlesByCategory,
    setCategoryPageBlog,
    resetSelectedCategory,
    setLoading
} from './store/articlesBlogSlice.js';

// 🔥 RIESPORTA tutte le azioni. Questo le rende accessibili al consumer tramite il nome del pacchetto.
export {
    setArticles,
    setSelectedCategory,
    setArticlesByCategory,
    setCategoryPageBlog,
    resetSelectedCategory,
    setLoading
};
