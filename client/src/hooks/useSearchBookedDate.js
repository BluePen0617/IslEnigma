import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"

const queryRoomsDate = async (roomId) => {
  console.log(roomId)
  const res = await axios.post(`${SERVER_URL}/rooms/${roomId + 1}`)
  return res.data
}

export const useQueryRoomsDate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: queryRoomsDate,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error("Failed to add item:", error)
    },
  })
}
