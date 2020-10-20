import Vue from 'vue'
import Vuex from 'vuex'
import firebaseApp from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: true,
        filter: 'all',
        IsLoggedIn: false,
        planName: '',
        message: [{
            sendMessage: 'Welcome',
            sendMessageColor: 'blue'
        }],
        todos: [],
    },
    getters: {
        messageGetters(state) {
            return state.message
        },
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0
        },
        todosFiltered(state) {
            if (state.filter == 'all') {
                return state.todos
            } else if (state.filter == 'active') {
                return state.todos.filter(todo => !todo.completed)
            } else if (state.filter == 'completed') {
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.completed).length > 0
        },
        IsLoggedIn: (state) => {
            return state.IsLoggedIn
        },
        planName: (state) => {
            return state.planName
        },

    },
    mutations: {
        MESSAGE(state, payloadMessage) {
            Vue.set(state, 'message', payloadMessage);
        },
        addTodo(state, todo) {
            state.todos.unshift({
                id: todo.id,
                title: todo.title,
                byWho: todo.byWho,
                info: todo.info,
                completed: false,
                timestamp: new Date(),
                editing: false,
            })
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'byWho': todo.byWho,
                'info': todo.info,
                'completed': todo.completed,
                'editing': todo.editing,
            })
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex(item => item.id == id)

            if (index >= 0) {
                state.todos.splice(index, 1)
            }
        },
        checkAll(state, checked) {
            state.todos.forEach(todo => (todo.completed = checked))
        },
        updateFilter(state, filter) {
            state.filter = filter
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        retrieveTodos(state, todos) {
            state.todos = todos
        },
        updateLoading(state, loading) {
            state.loading = loading
        },
        IS_LOGGED_IN(state, payload) {
            state.IsLoggedIn = payload.IsLoggedIn
        },
        PLAN_NAME(state, payload) {
            state.planName = payload
        }
    },
    actions: {
        LoggedIn({ commit }, payload) {
            var planName = payload.plan.toLowerCase()
            var password = payload.password.toLowerCase()

            firebaseApp.auth().signInWithEmailAndPassword(planName + "@gmail.com", password).then(() => {
                firebaseApp.auth().onAuthStateChanged((user) => {
                    if (user) {
                        commit("IS_LOGGED_IN", {
                                IsLoggedIn: true, //obratiti paznju na mala pocetna slova
                            })
                            // commit("PLAN_NAME", planName)
                    }
                })
            }).catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;

                if (errorCode == 'auth/invalid-email') {
                    payload = {
                        boolean: true,
                        sendMessage: "Name of plan is not valid !",
                        sendMessageColor: 'red'
                    };
                    commit('MESSAGE', payload)
                } else if (errorCode == 'auth/user-disabled') {
                    payload = {
                        boolean: true,
                        sendMessage: "Plan you type is blocked !",
                        sendMessageColor: 'red'
                    };
                    commit('MESSAGE', payload)
                } else if (errorCode == 'auth/user-not-found') {
                    payload = {
                        boolean: true,
                        sendMessage: "Plan you enter is not valid !",
                        sendMessageColor: 'red'
                    };
                    commit('MESSAGE', payload)
                } else if (errorCode == 'auth/wrong-password') {
                    payload = {
                        boolean: true,
                        sendMessage: "Password dont match your plan name",
                        sendMessageColor: 'red'
                    };
                    commit('MESSAGE', payload)

                } else {
                    console.log(errorMessage)
                }
            });
        },
        newPlan({ commit }, payload) {
            console.log(payload.plan)
            let plan = payload.plan.toLowerCase() + "@gmail.com"
            let password = payload.password.toLowerCase()
            firebaseApp.auth().createUserWithEmailAndPassword(plan, password).then(() => {
                    //da bi promenio planName koji Logout.vue ocitava
                    commit('PLAN_NAME', payload.plan)
                    commit('MESSAGE', {
                        sendMessage: "You just made a new holiday plan, now you can add what you need !",
                        sendMessageColor: 'red'
                    })

                })
                .then(() => {
                    //da zaustavi v-circular nakon ocitavanja podataka
                    this.state.LoadingDataKorisnickiPanel = false
                })
                .catch(error => {
                    var errorCode = error.code;
                    if (errorCode == 'auth/email-already-in-use') {
                        commit('MESSAGE', {
                            sendMessage: "Name of holiday plan already exist, please use another one !",
                            sendMessageColor: 'red'
                        })
                    } else if (errorCode == 'auth/weak-password') {
                        commit('MESSAGE', {
                            sendMessage: "Password must have at least 6 characters !",
                            sendMessageColor: 'red'
                        })
                    } else if (errorCode == 'auth/operation-not-allowed') {
                        commit('MESSAGE', {
                            sendMessage: "Unfortunately you can not make new plan right now, please try later",
                            sendMessageColor: 'red'
                        })
                    } else {
                        console.log(errorCode)
                    }
                });
        },
        Logout({ commit }) {
            if (this.state.IsLoggedIn) {
                firebaseApp.auth().signOut().then(() => {
                        firebaseApp.auth().onAuthStateChanged(user => {
                            //ako je true...tj. ako je korisnik logovan
                            if (!user) {
                                commit("IS_LOGGED_IN", {
                                    IsLoggedIn: false, //obratiti paznju na mala pocetna slova
                                })
                            }
                        })
                    }).then(() => {
                        // commit('MESSAGE', {
                        //     sendMessage: "You just logged out !",
                        //     sendMessageColor: 'green'
                        // })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        initRealtimeListeners({ getters, commit }) {
            var planName = getters.planName
            firebaseApp.firestore().collection(planName).onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'

                        if (source === 'Server') {
                            commit('addTodo', {
                                id: change.doc.id,
                                title: change.doc.data().title,
                                byWho: change.doc.data().byWho,
                                info: change.doc.data().info,
                                completed: false,
                            })
                        }
                    }
                    if (change.type === 'modified') {
                        commit('updateTodo', {
                            id: change.doc.id,
                            title: change.doc.data().title,
                            byWho: change.doc.data().byWho,
                            info: change.doc.data().info,
                            completed: change.doc.data().completed,
                        })
                    }
                    if (change.type === 'removed') {
                        commit('deleteTodo', change.doc.id)
                    }
                })
            })

        },
        retrieveTodos({ getters, commit }) {
            var planName = getters.planName
            var tempTodosSorted = []
            commit('retrieveTodos', tempTodosSorted)
                //updateLoading je loading circle
            commit('updateLoading', true)
            firebaseApp.firestore().collection(planName).get()
                .then(querySnapshot => {
                    let tempTodos = []
                    querySnapshot.forEach(doc => {
                            const data = {
                                id: doc.id,
                                title: doc.data().title,
                                byWho: doc.data().byWho,
                                info: doc.data().info,
                                completed: doc.data().completed,
                                timestamp: doc.data().timestamp,
                            }
                            tempTodos.push(data)
                                // })

                        })
                        //updateLoading je loading circle
                    commit('updateLoading', false)
                    const tempTodosSorted = tempTodos.sort((a, b) => {
                        return b.timestamp.seconds - a.timestamp.seconds
                    })
                    commit('retrieveTodos', tempTodosSorted)
                })
        },
        addTodo({ getters, commit }, todo) {
            var planName = getters.planName
            return firebaseApp.firestore().collection(planName).add({
                    title: todo.title,
                    byWho: todo.byWho,
                    info: todo.info,
                    completed: false,
                    timestamp: new Date(),
                })
                .then(docRef => {
                    commit('addTodo', {
                            id: docRef.id,
                            title: todo.title,
                            byWho: todo.byWho,
                            info: todo.info,
                        })
                        //ukoliko je pre toga bilo gresaka da obrise "message" koju je ta greska prikazala
                    commit('MESSAGE', {
                        sendMessage: "",
                        sendMessageColor: 'green'
                    })
                })
        },
        updateTodo({ getters, commit }, todo) {
            var planName = getters.planName
            firebaseApp.firestore().collection(planName).doc(todo.id).set({
                    title: todo.title,
                    completed: todo.completed,
                    byWho: todo.byWho,
                    info: todo.info,
                }, { merge: true })
                .then(() => {
                    commit('updateTodo', todo)
                })
        },
        deleteTodo({ getters, commit }, id) {
            var planName = getters.planName
            firebaseApp.firestore().collection(planName).doc(id).delete()
                .then(() => {
                    commit('deleteTodo', id)
                })
        },
        checkAll({ getters, commit }, checked) {
            var planName = getters.planName
            firebaseApp.firestore().collection(planName).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.update({
                                completed: checked
                            })
                            .then(() => {
                                commit('checkAll', checked)
                            })
                    })
                })
        },
        updateFilter(context, filter) {
            context.commit('updateFilter', filter)
        },
        clearCompleted({ getters, commit }) {
            var planName = getters.planName
            firebaseApp.firestore().collection(planName).where('completed', '==', true).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete()
                            .then(() => {
                                commit('clearCompleted')
                            })
                    })
                })
        },
        message(context, payload) {
            context.commit('MESSAGE', payload)
        }
    }
})