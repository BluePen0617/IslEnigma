import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SERVER_URL } from "../utils/helpers"

export const fetchCartItem = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/cart`, {
      withCredentials: true,
    })
    return res.data
  } catch (err) {
    return
  }
}
export const useCartItemsData = () => {
  return useQuery({
    queryKey: ["cartItem"],
    queryFn: fetchCartItem,
    onError: (error) => {
      console.error("Failed to fetch cart items:", error)
    },
  })
}
