
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      getApplicantProfile: async () => {
        try {
          const token = get().token; // Ambil token dari store
          const response = await axios.get('http://localhost:5000/api/applicant/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching applicant profile:', error);
          throw error;
        }
      },

      updateApplicantProfile: async (profileData) => {
        try {
          const token = get().token; // Ambil token dari store
          const response = await axios.put('http://localhost:5000/api/applicant/profile', profileData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const updatedUser = { ...get().user, applicantProfile: response.data };
          set({ user: updatedUser });
          return response.data;
        } catch (error) {
          console.error('Error updating applicant profile:', error);
          throw error;
        }
      },

      getRecruiterProfile: async () => {
        try {
          // Get current token from store
          const token = get().token;
          const response = await axios.get('http://localhost:5000/api/recruiter/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
      },

      updateRecruiterProfile: async (profileData) => {
        try {
          // Get current token from store
          const token = get().token;
          const response = await axios.put('http://localhost:5000/api/recruiter/profile', profileData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const updatedUser = { ...get().user, ...response.data };
          set({ user: updatedUser });
          return response.data;
        } catch (error) {
          console.error('Error updating profile:', error);
          throw error;
        }
      },

      login: async (credentials) => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', credentials)

          if (response.status === 401) {
            throw new Error('Invalid email or password');
          }

          const { token, user } = response.data
          console.log(response.data)
          // Set auth token for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({
            user,
            token,
            isAuthenticated: true
          })
          
          return response.data
        } catch (error) {
          console.error('Login error:', error)
          throw error
        }
      },

      registerApplicant: async (userData) => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register/applicant', userData)
          console.log(response.data)
          return response.data
        } catch (error) {
          console.error('Registration error:', error)
          throw error
        }
      },

      registerRecruiter: async (formData) => {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register/recruiter', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return response.data
        } catch (error) {
          console.error('Registration error:', error)
          throw error
        }
      },

      logout: () => {
        // Remove auth token
        delete axios.defaults.headers.common['Authorization']
        
        set({
          user: null,
          token: null,
          isAuthenticated: false
        })
      },

      // Utility function to check if user has specific role
      hasRole: (role) => {
        const state = useAuthStore.getState()
        return state.user?.role === role
      }
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)

export default useAuthStore