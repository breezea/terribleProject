import { defineStore } from 'pinia'
import { getUser } from '@/api/user'
import { removeToken } from '@/utils/token'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      // return this.userInfo?.name
      return  '路路鹿'
    },
    avatar() {
      // return this.userInfo?.avatar
      return 'https://www.neautotime.com/uploads/2d39dab4b48ce8d2a136dcddb28faec7.jpg'
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await getUser()
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data
          this.userInfo = { id, name, avatar, role }
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res.message)
        }
      } catch (error) {
        console.error(error)
        return Promise.reject(error.message)
      }
    },
    logout() {
      removeToken()
      this.userInfo = {}
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
