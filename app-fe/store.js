// store.js
export const menuStore = {
    state: {
        items: [],
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },
    },
    actions: {
        async fetchMenu() {
            // Qui dovresti implementare la logica per recuperare i dati
            // Ad esempio, potresti fare una chiamata API qui
            // Per semplicità, utilizzeremo un mock di dati
            const mockData = [
                { id: 1, name: 'Pizza Margherita', price: '€10,00' },
                { id: 2, name: 'Pizza Capricciosa', price: '€12,00' },
            ];
            this.setItems(mockData);
        },
    },
};
