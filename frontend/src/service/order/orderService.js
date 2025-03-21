import { usecartStore } from '@/stores/shoping_cart'
import { useSitesStore } from '@/stores/site'
import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { URI } from '../conection'
import { useReportesStore } from '@/stores/ventas'
import { useRoute } from 'vue-router'
// import pixel from '@/router/pixel'
import router from '@/router/index'

const report = useReportesStore()
const cart = usecartStore()
const site = useSitesStore()
const user = useUserStore()

const preparar_orden = () => {
  cart.sending_order = true

  const order_products = cart.cart.products.map(p => ({
    product_instance_id: p.product.id,
    quantity: p.quantity,
    flavors: p.flavors
  }));

  const order_aditionals = cart.cart.additions.map(a => {
    return {
      aditional_item_instance_id: a.id,
      quantity: a.quantity,
    }
  })

  const site_id = 31
  const payment_method_id = user.user.payment_method_option?.id
  const delivery_price =
    payment_method_id === 7 ? 0 : site.location.neigborhood.delivery_price

  const order_notes = cart.cart.order_notes || 'SIN NOTAS'
  const user_data = {
    user_name: user.user.name,
    user_phone: user.user.phone_number?.split(' ').join(''),
    user_address:
      ` ${user.user.address} ${site.location?.neigborhood?.name}` || '',
    site_id: site_id,
  }

  const order = {
    order_products,
    order_aditionals,
    site_id,
    delivery_person_id: 4,
    payment_method_id,
    delivery_price,
    order_notes,
    user_data,
    user_id: user.user.id,
    inserted_by: user.user.id,
    order_status: {
      status: 'Pendiente',
      timestamp: new Date().toISOString().slice(0, 10), // Fecha actual
    },
    status_history: [
      {
        status: 'Pendiente',
        timestamp: new Date().toISOString().slice(0, 10), // Fecha actual
      },
    ],
  }

  return order
}

export const orderService = {
  async sendOrder() {
    const order = preparar_orden()
    const cart = usecartStore()

    if (!validateOrder(order)) {
      cart.sending_order = false
      return null
    }

    try {
      report.setLoading(true, `enviando tu pedido ${user.user.name}`)
      const response = await axios.post(`${URI}/order`, order)
      if (response.status === 200) {
        cart.sending_order = false
        cart.last_order = response.data
        report.setLoading(false, 'enviando tu pedido')

        // pixel.sendTrackingEvent('Purchase', {
        //   total: cart.cart.total_cost, // Este es el total en COP o convertido a otra moneda
        //   currency: 'COP', // O la moneda a la que hayas convertido
        //   items: cart.cart.products.map(p => {
        //     return {
        //       id: p.product.id,
        //       name: p.product.product_name,
        //       quantity: p.quantity,
        //       price: p.product.price,
        //     }
        //   }),
        //   value: cart.cart.total_cost,
        // })

        // if (order.payment_method_id !== 6) {
        //   report.visible.show_validate = true
        // }else{
        router.push('/gracias')
        // }
      } else {
        console.error(
          'An error occurred while sending the order:',
          response.status,
        )
        alert('An error occurred while sending the order. Please try again.')
        report.setLoading(false, 'enviando tu pedido')
        cart.sending_order = false

        return null
      }
    } catch (error) {
      console.error('An error occurred while sending the order:', error)
      report.setLoading(false, 'enviando tu pedido')
      cart.sending_order = false

      alert(
        'An error occurred while sending the order. Please check your internet connection and try again.',
      )
      cart.sending_order = false
      return null
    }
  },
}

function validateOrder(order) {
  const cart = usecartStore()
  if (!order.order_products.every(p => p.product_instance_id && p.quantity)) {
    alert('Some products in your cart are missing details.')
    cart.sending_order = false

    return false
  }

  if (
    !order.user_data.user_name ||
    order.user_data.user_name.trim() == '' ||
    !order.user_data.user_phone ||
    order.user_data.user_phone.trim() == '' ||
    !order.user_data.user_address ||
    order.user_data.user_address.trim() == ''
  ) {
    alert('Sus datos estan incompletos por favor reviselos')
    cart.sending_order = false

    return false
  }

  if (!order.site_id || order.delivery_price == null) {
    alert('Site information is missing. Please select a valid site.')
    cart.sending_order = false

    return false
  }

  return true
}
