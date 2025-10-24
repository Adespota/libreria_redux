

export { default as articoloReducer }     from './store/articoloSlice.js';
export { default as articlesBlogReducer } from './store/articlesBlogSlice.js';
export { default as snackbarReducer }     from './store/snackbarSlice.js';

// tutto (azioni + selectors) raggruppato per slice → nessun clash
export * as articolo     from './store/articoloSlice.js';
export * as articlesBlog from './store/articlesBlogSlice.js';
export * as snackbar     from './store/snackbarSlice.js';


// Esporto tutte le azioni di articlesBlogSlice
import {
    setArticles,
    //setSelectedCategory,
    setArticlesByCategory,
    setCategoryPageBlog,
    resetSelectedCategory,
    //setLoading
} from './store/articlesBlogSlice.js';

export {
    setArticles,
    //setSelectedCategory,
    setArticlesByCategory,
    setCategoryPageBlog,
    resetSelectedCategory,
    //setLoading
};







// Esporto tutte le azioni di articolo
import {
    updateIndiceFromGemini,
    updateSintesiFromGemini,
    updatePuntiChiaveFromGemini,
    updateContentParagraph,
    updateTitleParagraph,
    updateMetaDescriptionFromGemini,
    updateParolaChiaveFromGemini,
    updateLinkRiferimento,
    updateSlugFromGemini,
    updateTitoloSeoFromGemini,
    updateTitleFromGemini,
    updateSubtitleFromGemini,
    updateFaqFromGemini,
    deleteAllParagraphs,
    setInput,
    setInputPath,
    setSelectedCategory,
    resetNewDescription,
    setDocumentId,
    resetImage,
    addParagraph,
    updateIndice,
    deleteParagraph,
    setSelectedNewCategory,
    resetNewCategory,
    setArticleDate,
    setFileName,
    setImagePreview,
    resetImagePreview,
    setFileNameImageParagraph,
    setImagePreviewParagraph,
    resetImagePreviewParagraph,
    resetImageInParagraph,
    resetFileName,
    resetAll,
    setLoading,
    setCategory,
    triggerSendToRedux,
    validaTutto,
    setContaParole,
    setContaParoleTotale,
    updateParolePerParagrafo,
    verificaUnicitaSlug,
    setPunteggioSEO,
} from './store/articoloSlice.js';

export {
    updateIndiceFromGemini,
    updateSintesiFromGemini,
    updatePuntiChiaveFromGemini,
    updateContentParagraph,
    updateTitleParagraph,
    updateMetaDescriptionFromGemini,
    updateParolaChiaveFromGemini,
    updateLinkRiferimento,
    updateSlugFromGemini,
    updateTitoloSeoFromGemini,
    updateTitleFromGemini,
    updateSubtitleFromGemini,
    updateFaqFromGemini,
    deleteAllParagraphs,
    setInput,
    setInputPath,
    setSelectedCategory,
    resetNewDescription,
    setDocumentId,
    resetImage,
    addParagraph,
    updateIndice,
    deleteParagraph,
    setSelectedNewCategory,
    resetNewCategory,
    setArticleDate,
    setFileName,
    setImagePreview,
    resetImagePreview,
    setFileNameImageParagraph,
    setImagePreviewParagraph,
    resetImagePreviewParagraph,
    resetImageInParagraph,
    resetFileName,
    resetAll,
    setLoading,
    setCategory,
    triggerSendToRedux,
    validaTutto,
    setContaParole,
    setContaParoleTotale,
    updateParolePerParagrafo,
    verificaUnicitaSlug,
    setPunteggioSEO,
};

