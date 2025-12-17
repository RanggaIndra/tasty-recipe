import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from '@/firebase.js'
import { ref as dbRef, set } from "firebase/database"

export const useUserStore = defineStore('user', () => {

    const userData = ref(null)
    const isLoggedIn = ref(false)

    // Action
    const login = (payload) => {
        userData.value = payload
        isLoggedIn.value = true
        console.log('User logged in:', userData.value)
    }

    const logout = () => {
        userData.value = null
        isLoggedIn.value = false
    }

    const registerUser = async (newUser) => {
        try {
            const userId = newUser.username;
            await set(dbRef(db, 'users/' + userId), {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
                imageLink: newUser.imageLink
            });
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }

    // Getter
    const userName = computed(() => {
        return userData.value ? `${userData.value.firstname} ${userData.value.lastname}` : 'Guest'
    })

    return {
        userData,
        isLoggedIn,
        login,
        logout,
        registerUser,
        userName
    }
})