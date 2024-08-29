import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export const logout = async (memberData) => {
  try {
    const res = await axios.post(
      `${SERVER_URL}/member/logout`,
      {},
      {
        withCredentials: true,
      }
    )

    return res.data
  } catch (err) {
    throw err
  }
}

export const useLogout = () => {
  const navigate = useNavigate()
  const { setMember } = useAuthContext()

  return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      const { message } = data
      toast(message)
      localStorage.removeItem("member")
      setMember(null)
      navigate("/login")
    },
    onError: (error) => {
      const errMsg = error.response?.data?.error || "發生錯誤!"
      console.log(errMsg)
      toast.error(errMsg)
    },
  })
}
