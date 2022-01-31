import axios from "axios";
export default {

    state: {
        citation: [],
        formation: [],
        evenement: [],
        exhortation: [],
        livre: []
    },
    getters: {
        getCitation(state) {
            return state.citation;
        },
        getFormation(state) {
            return state.formation;
        },
        getEvenement(state) {
            return state.evenement;
        },
        getExhortation(state) {
            return state.exhortation;
        },
        getLivre(state) {
            return state.livre;
        }
    },
    actions: {
        allCitation(context) {
            axios.get('https://enhakkore.rtgroup-rdc.com/citation/citationAffichage')
                .then((res) => {
                    context.commit('citations', res.data.citations);
                })
        },
        allFormation(context) {
            axios.get('https://enhakkore.rtgroup-rdc.com/formation/formationAffichage')
                .then((res) => {
                    context.commit('formations', res.data.Formations);
                })
        },
        allEvenement(context) {
            axios.get('https://enhakkore.rtgroup-rdc.com/evenement/evenementAffichage')
                .then((res) => {
                    context.commit('evenements', res.data.Evenements);
                })
        },
        allExhortation(context) {
            axios.get('https://enhakkore.rtgroup-rdc.com/exhortation/exhortationAffichage')
                .then((res) => {
                    context.commit('exhortations', res.data.Exhortations);
                })
        },
        allLivre(context) {
            axios.get('https://enhakkore.rtgroup-rdc.com/livre/livreAffichage')
                .then((res) => {
                    context.commit('livres', res.data.Livres);
                })
        }
    },
    mutations: {
        citations(state, data) {
            return state.citation = data;
        },
        formations(state, data) {
            return state.formation = data;
        },
        evenements(state, data) {
            return state.evenement = data;
        },
        exhortations(state, data) {
            return state.exhortation = data;
        },
        livres(state, data) {
            return state.livre = data;
        }
    }

}