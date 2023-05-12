import {createStore} from 'vuex';

const store = createStore(
    {
        state: {
            user: {
                data: {name: 'Jhobert'},
                token : null
            }
        },
        getters: {},
        setters: {},
        actions: {},
        modules: {},
        mutations: {}
    }
);

export default store;