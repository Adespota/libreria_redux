import { nanoid, createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';

// Questo file definisce il slice "articolo" utilizzando Redux Toolkit per gestire lo stato di un articolo di blog
// Lo stato include diverse proprietà come la categoria selezionata, i paragrafi, il titolo, la descrizione SEO, immagini, e altro
// Sono definiti anche diversi reducer per aggiornare lo stato, come l'aggiunta di paragrafi, la selezione di categorie, l'impostazione di immagini e altre azioni specifiche
// Il file esporta le azioni, i selettori per accedere a parti specifiche dello stato e il reducer associato allo slice "articolo"


const initialArticoloState = {
    categoria: "",
    indice: [],
    documentId: null,
    titolo: "",
    sottotitolo: "",
    sintesi: "",
    puntiChiave: "",
    immagine: "",
    paragrafi: [
        {
            id: nanoid(),
            titoloParagrafo: "",
            contenuto: "",
            linkRiferimento: "",
            immagine: "",
            fileNameParagraph: "",
            imagePreviewParagraph: null,
        },
    ],
    faq: [
        {
            id: nanoid(),
            domanda: "",
            risposta: ""
        }
    ],
    dataArticolo: null,
    parolaChiave: "",
    titoloSeo: "",
    slug: "",
    slugUnico: true,
    metaDescription: "",
    newCategory: undefined,
    newDescription: undefined,
    fileName: "",
    imagePreview: null,
    normalizedSlug: "",
    article: null,
    loading: false,
    category: [],
    resetKey: 0,
    punteggioSEO: "",
    numeroParolePerParagrafo: {},
    numeroParoleTotali: 0,
    validazione: {
        linkInterniValido: false,
        linkEsterniValido: false,
    },
};


const countWords = (text) => {
    return text.trim().split(/\s+/).length;
};




const articoloSlice = createSlice({
    name: "articolo",
    initialState: initialArticoloState,
    reducers: {
        updateParolaChiaveFromGemini: (state, action) => {
            state.parolaChiave = action.payload;
        },
        updateTitoloSeoFromGemini: (state, action) => {
            state.titoloSeo = action.payload;
        },
        updateSlugFromGemini: (state, action) => {
            //state.slug = action.payload;
            state.slug = action.payload.replace(/-/g, ' ');
        },
        updateMetaDescriptionFromGemini: (state, action) => {
            state.metaDescription = action.payload;
        },
        updateTitleFromGemini: (state, action) => {
            //state.titolo = action.payload;
            const normalized = action.payload.trim().toLowerCase();
            state.titolo = normalized.charAt(0).toUpperCase() + normalized.slice(1);
        },
        updateSubtitleFromGemini: (state, action) => {
            //state.sottotitolo = action.payload;
            const normalized = action.payload.trim().toLowerCase();
            state.sottotitolo = normalized.charAt(0).toUpperCase() + normalized.slice(1);
        },
        updateFaqFromGemini: (state, action) => {
            state.faq = action.payload.map(faqItem => ({
                domanda: faqItem.domanda.trim(),
                risposta: faqItem.risposta.trim(),
            }));
        },
        updateSintesiFromGemini: (state, action) => {
            // 1. Normalizza il testo: trimma gli spazi e metti tutto in minuscolo
            const normalized = action.payload.trim().toLowerCase();

            // 2. Metti in maiuscolo il primo carattere della stringa
            let result = normalized.charAt(0).toUpperCase() + normalized.slice(1);

            // 3. Cerca tutti i punti seguiti da uno spazio e una lettera minuscola
            result = result.replace(/\.\s([a-z])/g, (match, p1) => {
                // Sostituisci la lettera minuscola con la sua versione maiuscola
                return '. ' + p1.toUpperCase();
            });

            state.sintesi = result;
        },
        updatePuntiChiaveFromGemini: (state, action) => {
            //const normalized = action.payload.trim().toLowerCase();
            //state.puntiChiave = normalized.charAt(0).toUpperCase() + normalized.slice(1);
            state.puntiChiave = action.payload;
        },
        updateTitleParagraph: (state, action) => {
            const { index, newTitle } = action.payload;
            if (index >= 0 && index < state.paragrafi.length) {
                const normalized = newTitle.trim().toLowerCase();
                state.paragrafi[index].titoloParagrafo = normalized.charAt(0).toUpperCase() + normalized.slice(1);
                //state.paragrafi[index].titoloParagrafo = newTitle.toLowerCase();
            }
        },
        updateContentParagraph: (state, action) => {
            const { index, newParagraph } = action.payload;
            if (index >= 0 && index < state.paragrafi.length) {
                state.paragrafi[index].contenuto = newParagraph; // Correzione: aggiorna 'contenuto'
            }
        },
        updateLinkRiferimento: (state, action) => {
            const { index, newLink } = action.payload;
            if (index >= 0 && index < state.paragrafi.length) {
                state.paragrafi[index].linkRiferimento = newLink;
            }
        },
        updateIndiceFromGemini: (state) => {
            // Ricostruisce l'indice leggendo i titoli dei paragrafi dallo stato
            state.indice = state.paragrafi.map((p, idx) =>
                `${idx + 1}. ${p.titoloParagrafo}`
            );
        },
        setInput: (state, action) => {
            const { field, value } = action.payload;
            return {
                ...state,
                [field]: value,
            };
        },
        triggerSendToRedux: (state, action) => {
            state.shouldSendToRedux = action.payload;
        },
        setInputPath: (state, action) => {
            const { path, value } = action.payload;
            //console.log('Path:', path);
            //console.log('Value:', value);
            //console.log('setInputPath payload', action.payload);
            set(state, path, value);
            //console.log('Updated state', state);
        },
        setSelectedCategory: (state, action) => {
            state.categoria = action.payload;
        },
        setCategory(state, action) {
            state.category = action.payload;
        },
        // Azione per impostare il nome del file
        setFileName: (state, action) => {
            state.fileName = action.payload;
        },
        // Azione per mostrare l'immagine di anteprima
        setImagePreview: (state, action) => {
            state.imagePreview = action.payload;
        },
        // Funzione per ripulire il campo immagine di copertina
        resetImagePreview: (state) => {
            state.imagePreview = null;
        },
        setFileNameImageParagraph: (state, action) => {
            const {index, value} = action.payload;
            if (index >= 0 && index < state.paragrafi.length) {
                state.paragrafi[index].fileNameParagraph = value;
            }
        },
        setImagePreviewParagraph: (state, action) => {
            const { index, value } = action.payload;
            if (index >= 0 && index < state.paragrafi.length) {
                state.paragrafi[index].imagePreviewParagraph = value;
            }
        },
        resetImagePreviewParagraph: (state, action) => {
            const index = action.payload;
            state.paragrafi[index].imagePreviewParagraph = null;
        },
        resetImageInParagraph: (state, action) => {
            const index = action.payload;
            state.paragrafi[index].immagine = initialArticoloState.immagine;
        },
        // Azione per gestire l'id del documento generato da Firestore
        setDocumentId: (state, action) => {
            state.documentId = action.payload;
        },
        resetAll: (state) => {
            state.indice = [];
            state.parolaChiave = "";
            state.titoloSeo = "";
            state.slug = "";
            state.metaDescription = "";
            state.titolo = "";
            state.sottotitolo = "";
            state.numeroParolePerParagrafo = {};
            state.newCategory = undefined;
            state.newDescription = undefined;
            state.fileName = "";
            state.imagePreview = null;
            state.categoria = "";
            state.sintesi = "";
            state.puntiChiave = "";
        },
        deleteAllParagraphs: (state) => {
            state.paragrafi = [];
        },
        addFaq: (state) => {
            const newFaq = {
                id: nanoid(),
                domanda: "",
                risposta: "",
            };
            state.faq.push(newFaq);
        },
        removeFaq: (state, action) => {
            const index = action.payload;

            // Se l'indice è valido, rimuovi la FAQ corrispondente
            if (index >= 0 && index < state.faq.length) {
                state.faq.splice(index, 1);
            }
        },

        addParagraph: (state) => {
            const newParagraph = {
                id: nanoid(),
                titoloParagrafo: "",
                contenuto: "",
                immagine: "",
                fileNameParagraph: "",
                imagePreviewParagraph: null,
            };
            state.paragrafi.push(newParagraph);
        },
        // Aggiorna l'indice con il titolo del paragrafo
        updateIndice: (state, action) => {
            const { titoloParagrafo, indiceParagrafo } = action.payload;
            // Aggiorna l'indice corrispondente al paragrafo attuale con il nuovo titolo del paragrafo
            state.indice[indiceParagrafo] = `${indiceParagrafo + 1}. ${titoloParagrafo}`;
        },
        deleteParagraph: (state, action) => {
            const index = action.payload;

            // Rimuovi il paragrafo dall'array
            state.paragrafi.splice(index, 1);

            // Rimuovi il titolo dall'indice
            state.indice.splice(index, 1);

            // Aggiorna la numerazione dell'indice dopo l'eliminazione
            state.indice = state.indice.map((titolo, idx) => {
                return `${idx + 1}. ${state.paragrafi[idx]?.titoloParagrafo || ''}`;
            });
        },
        // Azione per creare la nuova categoria nel blog
        setSelectedNewCategory: (state, action) => {
            state.newCategory = action.payload;
        },
        // Azione per resettare il campo newCategory
        resetNewCategory: (state,) => {
            state.newCategory = undefined;
        },
        resetNewDescription: (state,) => {
            state.newDescription = undefined;
        },
        // Azione per impostare la data e l'ora corrente
        setArticleDate: (state, action) => {
            state.dataArticolo = action.payload;
        },
        // Funzione per ripulire il campo immagine di copertina
        resetImage: (state) => {
            state.immagine = initialArticoloState.immagine;
        },
        resetFileName:(state) => {
            state.fileName = "";
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        validaParolaChiave: (state) => {
            // Imposta parolaChiaveValida a true se la parola chiave non è vuota e contiene caratteri significativi
            state.validazione.parolaChiaveValida = !!state.parolaChiave?.trim();
        },
        // Validazione titolo SEO
        validaTitoloSeo: (state) => {
            const parolaChiave = state.parolaChiave?.trim().toLowerCase() || "";
            const titoloSeo = state.titoloSeo?.trim().toLowerCase() || "";
            // Controlla se il titolo inizia esattamente con la parola chiave
            state.validazione.titoloSeoValido = parolaChiave && titoloSeo.startsWith(parolaChiave);
        },
        // Validazione meta description
        validaMetaDescription: (state) => {
            const parolaChiave = state.parolaChiave?.trim().toLowerCase() || "";
            state.validazione.metaDescriptionValida =
                state.metaDescription &&
                state.metaDescription.toLowerCase().includes(parolaChiave) &&
                state.metaDescription.length >= 120 &&
                state.metaDescription.length <= 155;
        },
        verificaUnicitaSlug: (state, action) => {
            state.slugUnico = action.payload;
        },
        validaSlug: (state) => {
            const parolaChiave = state.parolaChiave?.trim().toLowerCase();
            const slug = state.slug?.trim().toLowerCase();
            const slugUnico = state.slugUnico;

            // Verifica che lo slug contenga la parola chiave e che sia breve (max 50 caratteri)
            state.validazione.slugValido = parolaChiave && slug.includes(parolaChiave) && slug.length <= 50 && slugUnico;
        },
        validaTitolo: (state) => {
            const parolaChiave = state.parolaChiave?.trim().toLowerCase();
            const titolo = state.titolo?.trim().toLowerCase();

            // Verifica che il titolo contenga la parola chiave
            state.validazione.titoloValido = parolaChiave && titolo.includes(parolaChiave);
        },
        validaSottotitolo: (state) => {
            const parolaChiave = state.parolaChiave?.trim().toLowerCase();
            const sottotitolo = state.sottotitolo?.trim().toLowerCase();

            // Verifica che il titolo contenga la parola chiave
            state.validazione.sottotitoloValido = parolaChiave && sottotitolo.includes(parolaChiave);
        },
        validaTitoliParagrafi: (state) => {
            const parolaChiave = state.parolaChiave?.trim().toLowerCase();
           // console.log("Parola chiave:", parolaChiave);

            // Filtra i titoli paragrafi per escludere quelli vuoti
            const titoliParagrafi = state.paragrafi
                .map(paragrafo => paragrafo.titoloParagrafo?.trim().toLowerCase())
                .filter(titolo => titolo !== "");
            //console.log("Titoli non vuoti:", titoliParagrafi);

            // Calcola il numero totale di titoli non vuoti
            const totaleTitoli = titoliParagrafi.length;
            //console.log("Totale titoli non vuoti:", totaleTitoli);

            // Se non ci sono titoli non vuoti, la validazione è falsa
            if (totaleTitoli === 0 || !parolaChiave) {
                state.validazione.titoliParagrafiValidi = false;
                //console.log("Validazione fallita: nessun titolo valido o parola chiave mancante.");
                return;
            }

            // Calcola i titoli contenenti la parola chiave
            const titoliConParolaChiave = titoliParagrafi.filter(titolo => titolo.includes(parolaChiave));
            //console.log("Titoli contenenti la parola chiave:", titoliConParolaChiave);

            // Calcola il numero minimo di titoli richiesti
            const minimoTitoliConParolaChiave = Math.ceil(totaleTitoli / 2);
            //console.log("Minimo richiesto per validazione:", minimoTitoliConParolaChiave);

            // Verifica se la condizione è rispettata
            const isValid = titoliConParolaChiave.length >= minimoTitoliConParolaChiave;
            state.validazione.titoliParagrafiValidi = isValid;
        },
        setContaParole: (state, action) => {
            const { index, wordCount } = action.payload;
            state.numeroParolePerParagrafo[index] = wordCount;
        },
        setContaParoleTotale: (state) => {
            let totaleParole = 0;

            // Conta parole nel titolo, solo se non è vuoto
            if (state.titolo && state.titolo.trim() !== "") {
                totaleParole += countWords(state.titolo);
            }
            // Conta parole nel sottotitolo, solo se non è vuoto
            if (state.sottotitolo && state.sottotitolo.trim() !== "") {
                totaleParole += countWords(state.sottotitolo);
            }
            // Itera sui paragrafi per sommare il numero di parole nei titoli
            if (state.paragrafi && Array.isArray(state.paragrafi)) {
                state.paragrafi.forEach((paragrafo, index) => {
                    if (paragrafo.titoloParagrafo && paragrafo.titoloParagrafo.trim() !== "") {
                        totaleParole += countWords(paragrafo.titoloParagrafo);
                    }
                });
            }
            if (state.numeroParolePerParagrafo) {
                totaleParole += Object.values(state.numeroParolePerParagrafo).reduce((acc, val) => acc + val, 0);
            }
            // Aggiorna il totale delle parole nel state
            state.numeroParoleTotali = totaleParole;
            // Validazione dell'articolo
            state.validazione.lunghezzaArticoloValida = totaleParole >= 1000;
        },
        updateParolePerParagrafo: (state, action) => {
            const { index } = action.payload;
            const parolePerParagrafo = { ...state.numeroParolePerParagrafo };

            // Rimuovi il paragrafo specificato
            delete parolePerParagrafo[index];

            // Ricostruisci l'oggetto mantenendo la sequenza degli indici
            const numeroParolePerParagrafo = {};
            let newIndex = 0;

            Object.keys(parolePerParagrafo)
                .sort((a, b) => parseInt(a) - parseInt(b)) // Ordina le chiavi numeriche
                .forEach((key) => {
                    // Assegna i nuovi indici sequenziali
                    numeroParolePerParagrafo[newIndex] = parolePerParagrafo[key];
                    newIndex++;
                });

            // Aggiorna lo stato con l'oggetto riformattato
            return {
                ...state,
                numeroParolePerParagrafo: numeroParolePerParagrafo,
            };
        },
        removeAllNumeroParolePerParagrafo: (state) => {
            state.numeroParolePerParagrafo = {};
        },
        validaLinkInterni(state) {
            const linkInterniRegex = /https:\/\/www\.oscarprata\.com(\/(valutazioniNeuropsicologiche|riabilitazioneCognitiva|periziaClinicoLegale|consulenzaPsicologica|psicodiagnosi|prenota|chisono|blog|contatti|faq)?)?/i;

            state.validazione.linkInterniValido = state.paragrafi.some((paragrafo) => {
                // Estrae i link dal contenuto HTML del paragrafo
                const linkRegex = /<a\s+href="([^"]+)"/g;
                let match;
                let linkTrovato = false;

                while ((match = linkRegex.exec(paragrafo.contenuto)) !== null) {
                    const link = match[1];
                    //console.log("Link estratto:", link);
                    if (linkInterniRegex.test(link)) {
                        //console.log("Link interno valido:", link);
                        linkTrovato = true;
                        break;
                    }
                }
                //console.log("Contenuto paragrafo:", paragrafo.contenuto);
                //console.log("Link interno trovato:", linkTrovato);
                return linkTrovato;
            });
            //console.log("Link interni valido:", state.validazione.linkInterniValido);
        },
        validaLinkEsterni(state) {
            // Regex per identificare link esterni (escludendo domini interni)
            const linkEsterniRegex = /^(https?:\/\/(?!www\.oscarprata\.com|localhost(:\d+)?)([^\s\/$.?#].\S*))$/i;

            state.validazione.linkEsterniValido = state.paragrafi.some((paragrafo) => {
                // Estrae i link dal contenuto HTML del paragrafo
                const linkRegex = /<a\s+href="([^"]+)"/g;
                let match;
                let linkTrovato = false;

                while ((match = linkRegex.exec(paragrafo.contenuto)) !== null) {
                    const link = match[1];
                    //console.log("Link estratto:", link);
                    // Verifica se il link è un link esterno valido
                    if (linkEsterniRegex.test(link)) {
                        linkTrovato = true;
                        break;
                    }
                }

                //console.log("Contenuto paragrafo:", paragrafo.contenuto);
                //console.log("Link esterno trovato:", linkTrovato);
                return linkTrovato;
            });

            //console.log("Link esterni valido:", state.validazione.linkEsterniValido);
        },
        setPunteggioSEO: (state, action) => {
            state.punteggioSEO = action.payload;
        },



        // Validazione completa
        validaTutto: (state) => {
            articoloSlice.caseReducers.validaLinkInterni(state);
            articoloSlice.caseReducers.validaLinkEsterni(state);
        },
    },
});

// Estrai le azioni create
const {
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
    addFaq,
    removeFaq,
} = articoloSlice.actions;

// Seleziona parti dello stato
const selectInitialStateArticolo = (state) => state.articolo; // Esporta l'intero initialArticleState
const selectNewCategory = (state) => state.articolo.newCategory;
const selectNewDescriptionOfCategory = (state) => state.articolo.newDescription;
const selectDocumentId = (state) => state.articolo.documentId;
const selectImagePreview = (state) => state.articolo.imagePreview;
const selectImagePreviewParagraph = (index) => (state) => state.articolo.paragrafi[index]?.imagePreviewParagraph;
const selectLoading = (state) => state.articolo.loading;
const selectCategories = (state) => state.articolo.category;
const selectSelectedCategory = (state) => state.articolo.categoria;
const selectFaq = (state) => state.articolo.faq;
// Esporto tutte le validazioni
const selectValidazione = (state) => state.articolo.validazione;
var articoloSlice$1 = articoloSlice.reducer;

var articoloSlice$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addFaq: addFaq,
    addParagraph: addParagraph,
    articoloSlice: articoloSlice,
    default: articoloSlice$1,
    deleteAllParagraphs: deleteAllParagraphs,
    deleteParagraph: deleteParagraph,
    initialArticoloState: initialArticoloState,
    removeFaq: removeFaq,
    resetAll: resetAll,
    resetFileName: resetFileName,
    resetImage: resetImage,
    resetImageInParagraph: resetImageInParagraph,
    resetImagePreview: resetImagePreview,
    resetImagePreviewParagraph: resetImagePreviewParagraph,
    resetNewCategory: resetNewCategory,
    resetNewDescription: resetNewDescription,
    selectCategories: selectCategories,
    selectDocumentId: selectDocumentId,
    selectFaq: selectFaq,
    selectImagePreview: selectImagePreview,
    selectImagePreviewParagraph: selectImagePreviewParagraph,
    selectInitialStateArticolo: selectInitialStateArticolo,
    selectLoading: selectLoading,
    selectNewCategory: selectNewCategory,
    selectNewDescriptionOfCategory: selectNewDescriptionOfCategory,
    selectSelectedCategory: selectSelectedCategory,
    selectValidazione: selectValidazione,
    setArticleDate: setArticleDate,
    setCategory: setCategory,
    setContaParole: setContaParole,
    setContaParoleTotale: setContaParoleTotale,
    setDocumentId: setDocumentId,
    setFileName: setFileName,
    setFileNameImageParagraph: setFileNameImageParagraph,
    setImagePreview: setImagePreview,
    setImagePreviewParagraph: setImagePreviewParagraph,
    setInput: setInput,
    setInputPath: setInputPath,
    setLoading: setLoading,
    setPunteggioSEO: setPunteggioSEO,
    setSelectedCategory: setSelectedCategory,
    setSelectedNewCategory: setSelectedNewCategory,
    triggerSendToRedux: triggerSendToRedux,
    updateContentParagraph: updateContentParagraph,
    updateFaqFromGemini: updateFaqFromGemini,
    updateIndice: updateIndice,
    updateIndiceFromGemini: updateIndiceFromGemini,
    updateLinkRiferimento: updateLinkRiferimento,
    updateMetaDescriptionFromGemini: updateMetaDescriptionFromGemini,
    updateParolaChiaveFromGemini: updateParolaChiaveFromGemini,
    updateParolePerParagrafo: updateParolePerParagrafo,
    updatePuntiChiaveFromGemini: updatePuntiChiaveFromGemini,
    updateSintesiFromGemini: updateSintesiFromGemini,
    updateSlugFromGemini: updateSlugFromGemini,
    updateSubtitleFromGemini: updateSubtitleFromGemini,
    updateTitleFromGemini: updateTitleFromGemini,
    updateTitleParagraph: updateTitleParagraph,
    updateTitoloSeoFromGemini: updateTitoloSeoFromGemini,
    validaTutto: validaTutto,
    verificaUnicitaSlug: verificaUnicitaSlug
});

// Questo slice mantiene i dati degli articoli che vengono mostrati nel Blog
const articlesBlogSlice = createSlice({
    name: 'articles',
    initialState: {
        //articles: [],
        articlesByCategory: [],
        selectedCategory: null,
        category: [], // Ci sono tutte le categorie

    },
    reducers: {
        // Sovrascrive completamente l'array di articoli
        setArticles(state, action) {
            state.articles = action.payload;
        },
        setArticlesByCategory(state, action) {
            state.articlesByCategory = action.payload;
        },
        //setSelectedCategory(state, action) {
            //state.selectedCategory = action.payload;
        //},
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

const {
    setArticles,
    //setSelectedCategory,
    setArticlesByCategory,
    setCategoryPageBlog,
    resetSelectedCategory,
} = articlesBlogSlice.actions;

const selectArticles = (state) => state.articles.articles;
const selectArticlesByCategory = (state) => state.articles.articlesByCategory;
//export const selectSelectedCategory = (state) => state.articles.selectedCategory;
const selectCategoryPageBlog = (state) => state.articles.category;



var articlesBlogSlice$1 = articlesBlogSlice.reducer;

var articlesBlogSlice$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    articlesBlogSlice: articlesBlogSlice,
    default: articlesBlogSlice$1,
    resetSelectedCategory: resetSelectedCategory,
    selectArticles: selectArticles,
    selectArticlesByCategory: selectArticlesByCategory,
    selectCategoryPageBlog: selectCategoryPageBlog,
    setArticles: setArticles,
    setArticlesByCategory: setArticlesByCategory,
    setCategoryPageBlog: setCategoryPageBlog
});

const initialSnackbarState = {
    open: false,
    message: "",
    type: "success", // success, error, warning, info
};

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: initialSnackbarState,
    reducers: {
        showSnackbar: (state, action) => {
            const { message, type } = action.payload;
            state.open = true;
            state.message = message;
            state.type = type;
        },
        hideSnackbar: (state) => {
            state.open = false;
            state.message = "";
            state.type = "success";
        },
    },
});

// Estrai le azioni e il reducer
const {
    showSnackbar,
    hideSnackbar
}
= snackbarSlice.actions;


var snackbarSlice$1 = snackbarSlice.reducer;

var snackbarSlice$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: snackbarSlice$1,
    hideSnackbar: hideSnackbar,
    showSnackbar: showSnackbar,
    snackbarSlice: snackbarSlice
});

export { addFaq, addParagraph, articlesBlogSlice$2 as articlesBlog, articlesBlogSlice$1 as articlesBlogReducer, articoloSlice$2 as articolo, articoloSlice$1 as articoloReducer, deleteAllParagraphs, deleteParagraph, hideSnackbar, removeFaq, resetAll, resetFileName, resetImage, resetImageInParagraph, resetImagePreview, resetImagePreviewParagraph, resetNewCategory, resetNewDescription, resetSelectedCategory, setArticleDate, setArticles, setArticlesByCategory, setCategory, setCategoryPageBlog, setContaParole, setContaParoleTotale, setDocumentId, setFileName, setFileNameImageParagraph, setImagePreview, setImagePreviewParagraph, setInput, setInputPath, setLoading, setPunteggioSEO, setSelectedCategory, setSelectedNewCategory, showSnackbar, snackbarSlice$2 as snackbar, snackbarSlice$1 as snackbarReducer, triggerSendToRedux, updateContentParagraph, updateFaqFromGemini, updateIndice, updateIndiceFromGemini, updateLinkRiferimento, updateMetaDescriptionFromGemini, updateParolaChiaveFromGemini, updateParolePerParagrafo, updatePuntiChiaveFromGemini, updateSintesiFromGemini, updateSlugFromGemini, updateSubtitleFromGemini, updateTitleFromGemini, updateTitleParagraph, updateTitoloSeoFromGemini, validaTutto, verificaUnicitaSlug };
//# sourceMappingURL=index.esm.js.map
