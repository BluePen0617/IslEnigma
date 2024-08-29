import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export const updateMember = async (memberData) => {
  try {
    const res = await axios.put(`${SERVER_URL}/member/memberInfo`, memberData, {
      withCredentials: true,
    })

    return res.data
  } catch (err) {
    throw err
  }
}

export const useUpdateMember = () => {
  const { setMember } = useAuthContext()

  const navigate = useNavigate()

  return useMutation({
    mutationFn: updateMember,
    onSuccess: (data) => {
      console.log(data)
      toast(data.message)
    },
    onError: (error) => {
      const errMsg = error || "發生錯誤!"
      console.log(errMsg)
      toast.error(errMsg)
    },
  })
}
