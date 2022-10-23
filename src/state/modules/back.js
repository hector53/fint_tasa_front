import router from '../../router/index'
import axios from 'axios'
import Cookies from 'js-cookie'

export const state = {
   // urlBack : "http://127.0.0.1:5000/api", 
    urlBack : "https://apitasa.fintelligentia.com/api",
    status: {}, 
    user: null, 
    currenUser : resolveCookie()
}
export const getters = {
    // Whether the user is currently logged in.
    loggedIn(state) {
        if(state.currenUser){
            return true
        }else{
            return false
        }
    },
}
export const actions = {
   



    // Logs in the user.
    // eslint-disable-next-line no-unused-vars
    login({ dispatch, commit, state }, { email, password }) {
        commit('loginRequest', { email });
        axios.post(state.urlBack+'/login', {
            email:email, 
            password: password
        }).then((response) => {
            console.log(response)
            commit('loginSuccess', response.data);
            router.push('/');
          })
          .catch((error) => {
            console.log(error)
            commit('loginFailure', error);
            dispatch('notification/error', error, { root: true });
          })

    },
    // Logout the user
    logout({ commit }) {
        Cookies.remove('fintCurrenUser')
        commit('logout');
    },
    // register the user
    registeruser({ dispatch, commit, state}, user) {
        commit('registerRequest', user);
        axios.post(state.urlBack+'/register', user).then((response) => {
            console.log(response)
            dispatch('notification/success', 'Registration successful', { root: true });
            commit('loginSuccess', response.data);
            router.push('/');
          })
          .catch((error) => {
            console.log(error)
            commit('registerFailure', error);
                    dispatch('notification/error', error, { root: true });
          })
    }
};

export const mutations = {
 
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggeduser: true };
        state.user = user;
        state.currenUser = user
        saveState('fintCurrenUser', user)
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    }
};

function resolveCookie(){
   var currentUser =  Cookies.get('fintCurrenUser')
   if(currentUser){
    currentUser = JSON.parse(currentUser)
   }
   return currentUser
}

function saveState(key, state) {
    Cookies.set(key, JSON.stringify(state), { expires: 7 })
}
