import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"

const removeCartItem = async (itemId) => {
  const res = await axios.delete(`${SERVER_URL}/cart/${itemId}`, {
    withCredentials: true,
  })

  return res.data
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItem"])
      console.log("成功刪除商品")
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
