import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export const login = async (memberData) => {
  const localCartData = JSON.parse(localStorage.getItem("cart"))
  console.log(localCartData)
  try {
    const res = await axios.post(
      `${SERVER_URL}/member/login`,
      {
        memberData,
        localCartData,
      },
      {
        withCredentials: true,
      }
    )
    return res.data
  } catch (err) {
    throw err
  }
}

export const useLogin = () => {
  const { setMember } = useAuthContext()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { message, member } = data
      toast(message)
      localStorage.setItem("member", JSON.stringify(member))
      localStorage.removeItem("cart")
      setMember(member)
      navigate("/homepage")
    },
    onError: (error) => {
      const errMsg = error || "發生錯誤!"
      console.log(errMsg)
      toast.error(errMsg.response.data.message)
    },
  })
}
