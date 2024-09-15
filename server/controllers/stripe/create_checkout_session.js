const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const create_checkout_session = async (req, res) => {
  const { data, orderInfo } = req.body
  const order_id = String(data.order_id)

  console.log(order_id)
  const order_info_json = JSON.stringify(orderInfo)

  try {
    const session = await stripe.checkout.sessions.create({
      //metadata只接受string
      metadata: {
        order_id: order_id,
        order_info: order_info_json,
      },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: data.order_item.map((item) => {
        return {
          price_data: {
            currency: "TWD",
            product_data: {
              name: item.room?.room_type || item.ticket?.type,
            },
            unit_amount: item.room?.price || item.ticket?.price,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `https://localhost:5173/cart/shoppingSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://localhost:5173/cart/checkout`,
    })

    res.json({ url: session.url })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

module.exports = create_checkout_session
