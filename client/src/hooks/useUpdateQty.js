import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"

const updateQty = async (data) => {
  const { id, quantity } = data
  const res = await axios.put(
    `${SERVER_URL}/cart/${id}`,
    {
      quantity,
    },
    {
      withCredentials: true,
    }
  )
  return res.data
}

export const useUpdateQty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateQty,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItem"])
    },
    onError: (error) => {
      console.error("Failed to add item:", error)
    },
  })
}
