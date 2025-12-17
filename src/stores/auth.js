import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase.js";
import { ref as dbRef, set, get, child, update } from "firebase/database";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", () => {
    const router = useRouter();
    const user = ref(null);

    const isAuthenticated = computed(() => !!user.value);

    const registerUser = async (payload) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );

            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${payload.firstname} ${payload.lastname}`,
                photoURL: payload.imageLink,
            });

            await set(dbRef(db, `users/${user.uid}`), {
                firstname: payload.firstname,
                lastname: payload.lastname,
                username: payload.username,
                email: payload.email,
                imageLink: payload.imageLink,
                password: payload.password,
            })

            await loginUser({ email: payload.email, password: payload.password });

            console.log("User registered successfully:", user);
            router.push("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    };

    const loginUser = async (payload) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                payload.email,
                payload.password
            );
            const userParam = userCredential.user;

            const dbRefParam = dbRef(db);
            const snapshot = await get(child(dbRefParam, `users/${userParam.uid}`));

            let userData = {};
            if (snapshot.exists()) {
                userData = snapshot.val();
            }

            user.value = {
                uid: userParam.uid,
                email: userParam.email,
                displayName: userParam.displayName,
                photoURL: userParam.photoURL,
                firstname: userData.firstname,
                lastname: userData.lastname,
                username: userData.username,
                imageLink: userData.imageLink,
            }

            const token = await userParam.getIdToken();
            Cookies.set("accessToken", token, { expires: 7 });
            Cookies.set("user", JSON.stringify(user.value), { expires: 7 });

            console.log("User logged in successfully:", user.value);
            router.push("/");
        } catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        }
    }

    const updateUser = async (updatedData) => {
        try {
            const userId = user.value.uid;

            await update(dbRef(db, `users/${userId}`), updatedData);

            if (auth.currentUser && updatedData.imageLink) {
                await updateProfile(auth.currentUser, {
                    photoURL: updatedData.imageLink
                });
            }

            user.value = { ...user.value, ...updatedData, photoURL: updatedData.imageLink || user.value.photoURL };

            Cookies.set("user", JSON.stringify(user.value), { expires: 7 });
        } catch (error) {
            console.error("Error updating user data:", error);
            throw error;
        }
    }

    const logoutUser = async () => {
        try {
            await signOut(auth);
            Cookies.remove("accessToken");
            Cookies.remove("user");
            user.value = null;
            router.push("/login");
        } catch (error) {
            console.error("Error logging out user:", error);
        }
    }

    const restoreSession = () => {
        const userCookie = Cookies.get("user");
        const tokenCookie = Cookies.get("accessToken");
        if (userCookie && tokenCookie) {
            user.value = JSON.parse(userCookie);
        }
    }

    restoreSession();

    return {
        user,
        isAuthenticated,
        registerUser,
        loginUser,
        updateUser,
        logoutUser,
    };
});