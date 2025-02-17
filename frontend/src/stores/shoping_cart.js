import { defineStore } from 'pinia'
import { URI } from '../service/conection'

// Función auxiliar para generar la firma única de un producto.
// Se incluyen: el id del producto, los sabores, los adicionales y la gaseosa (si existe).
function generateProductSignature(product, flavors = [], additionalItems = [], gaseosa = null) {
  // Ordenamos los sabores y adicionales para que el orden no afecte la firma.
  const sortedFlavors = [...flavors].sort((a, b) => a.id - b.id);
  const sortedAdditionals = [...additionalItems].sort((a, b) => a.id - b.id);
  
  const flavorsSignature = JSON.stringify(sortedFlavors);
  const additionalsSignature = JSON.stringify(sortedAdditionals);
  const gaseosaSignature = gaseosa ? JSON.stringify(gaseosa) : '';
  
  return `${product.id}-${flavorsSignature}-${additionalsSignature}-${gaseosaSignature}`;
}

export const usecartStore = defineStore('tezoqs-csart22', {
  persist: {
    key: 'tezos-carqts22',
    storage: localStorage,
    paths: ['cart', 'last_order'],
  },
  state: () => ({
    currentProduct: {},
    visibles: {
      currentProduct: false,
      addAdditionToCart: false,
      last_order: '',
    },
    cart: {
      products: [],
      total_cost: 0,
      additions: [], // Adiciones a nivel de carrito (no asociadas a un producto específico)
    },
    last_order: '',
    sending_order: false,
  }),

  getters: {
    totalItems: state => {
      return state.cart.products.reduce(
        (total, product) => total + product.quantity,
        0,
      )
    },
    totalAdditions: state => {
      return state.cart.additions.reduce(
        (total, addition) => total + addition.price * addition.quantity,
        0,
      )
    },
    // Verifica si un producto (con sus sabores, adicionales y gaseosa) ya está en el carrito.
    isProductInCart: state => (product, flavors = [], additionalItems = [], gaseosa = null) => {
      const signature = generateProductSignature(product, flavors, additionalItems, gaseosa)
      return state.cart.products.some(p => p.signature === signature)
    },
  },

  actions: {
    // Incrementa la cantidad de una adición a nivel de carrito.
    incrementAdditionQuantity(additionId) {
      const addition = this.cart.additions.find(a => a.id === additionId)
      if (addition) {
        addition.quantity += 1
        this.calculateCartTotal()
      }
    },
    // Elimina completamente una adición del carrito.
    removeAdditionCompletelyFromCart(additionId) {
      const additionIndex = this.cart.additions.findIndex(a => a.id === additionId)
      if (additionIndex > -1) {
        this.cart.additions.splice(additionIndex, 1)
        this.calculateCartTotal()
      }
    },
    // Decrementa la cantidad de una adición (si es mayor que 1).
    decrementAdditionQuantity(additionId) {
      const addition = this.cart.additions.find(a => a.id === additionId)
      if (addition && addition.quantity > 1) {
        addition.quantity -= 1
        this.calculateCartTotal()
      }
    },
    setCurrentProduct(product) {
      this.currentProduct = product
    },
    setVisible(item, status) {
      this.visibles[item] = status
    },

    // Agrega un producto al carrito utilizando la firma para identificarlo.
    // Se almacenan los adicionales directamente en el producto.
    addProductToCart(product, quantity = 1, additionalItems = [], flavors = [], gaseosa = null) {
      // Incluimos los adicionales en la firma para que la comparación sea completa.
      const signature = generateProductSignature(product, flavors, additionalItems, gaseosa);
      
      // Busca el producto en el carrito comparando la signature.
      const cartProduct = this.cart.products.find(p => p.signature === signature);
    
      if (cartProduct) {
        // Si ya existe, incrementa la cantidad y actualiza el total (incluyendo los adicionales)
        cartProduct.quantity += quantity;
        cartProduct.total_cost += this.calculateProductTotal(
          product,
          quantity,
          additionalItems,
          flavors
        );
        // También podrías actualizar los adicionales si es necesario.
        cartProduct.additionalItems = [
          ...cartProduct.additionalItems,
          ...additionalItems,
        ];
      } else {
        // Si no existe, crea una nueva entrada en el carrito incluyendo los adicionales.
        this.cart.products.push({
          product,
          quantity,
          flavors: this.groupFlavors(flavors),
          gaseosa, // Almacena la gaseosa seleccionada
          signature, // Firma única para identificar el producto
          additionalItems: [...additionalItems],
          total_cost: this.calculateProductTotal(
            product,
            quantity,
            additionalItems,
            flavors
          ),
        });
      }
    
      // Ya no es necesario agregarlos a nivel global.
      this.calculateCartTotal();
    },
    
    

    // Incrementa la cantidad de un producto en el carrito usando la signature.
    incrementProductBySignature(signature) {
      const cartProduct = this.cart.products.find(p => p.signature === signature);
      if (cartProduct) {
        cartProduct.quantity += 1;
        cartProduct.total_cost += this.calculateProductTotal(
          cartProduct.product,
          1,
          cartProduct.additionalItems,
          cartProduct.flavors || []
        );
        this.calculateCartTotal();
      }
    },

    // Decrementa la cantidad de un producto en el carrito usando la signature.
    // Si es la última instancia, elimina el producto.
    decrementProductBySignature(signature) {
      const cartProduct = this.cart.products.find(p => p.signature === signature);
      if (cartProduct) {
        if (cartProduct.quantity > 1) {
          cartProduct.quantity -= 1;
          cartProduct.total_cost -= this.calculateProductTotal(
            cartProduct.product,
            1,
            cartProduct.additionalItems,
            cartProduct.flavors || []
          );
        } else {
          // Si es la única instancia, remueve el producto completo.
          this.cart.products = this.cart.products.filter(p => p.signature !== signature);
        }
        this.calculateCartTotal();
      }
    },

    // Remueve un producto del carrito usando únicamente la signature.
    removeProductFromCartBySignature(signature) {
      this.cart.products = this.cart.products.filter(p => p.signature !== signature);
      this.calculateCartTotal();
    },

    // Agrega un adicional a un producto específico en el carrito (identificado por la firma).
    // Se agrega el adicional al arreglo del producto.
    addAdditionalItem(product, additionalItem, flavors = [], additionalItems = [], gaseosa = null) {
      const signature = generateProductSignature(product, flavors, additionalItems, gaseosa);
      const cartProduct = this.cart.products.find(p => p.signature === signature);
      if (cartProduct) {
        cartProduct.additionalItems.push(additionalItem);
        cartProduct.total_cost += additionalItem.price * additionalItem.quantity;
        this.calculateCartTotal();
      }
    },

    // Remueve un adicional de un producto específico en el carrito.
    removeAdditionalItem(product, additionalItemId, flavors = [], additionalItems = [], gaseosa = null) {
      const signature = generateProductSignature(product, flavors, additionalItems, gaseosa);
      const cartProduct = this.cart.products.find(p => p.signature === signature);
      if (cartProduct) {
        const index = cartProduct.additionalItems.findIndex(item => item.id === additionalItemId);
        if (index > -1) {
          const item = cartProduct.additionalItems[index];
          cartProduct.total_cost -= item.price * item.quantity;
          cartProduct.additionalItems.splice(index, 1);
          this.calculateCartTotal();
        }
      }
    },

    // Agrupa los sabores sumando las cantidades de sabores repetidos.
    groupFlavors(flavors) {
      return flavors.reduce((acc, flavor) => {
        const existingFlavor = acc.find(f => f.id === flavor.id)
        if (existingFlavor) {
          existingFlavor.quantity += 1
        } else {
          acc.push({ ...flavor, quantity: 1 })
        }
        return acc
      }, [])
    },

    // Calcula el costo total de un producto (incluyendo adicionales y sabores).
    calculateProductTotal(product, quantity, additionalItems, flavors = []) {
      // Costo de adicionales.
      const additionalCost = additionalItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    
      // Filtra sabores que no sean gaseosa.
      const validFlavors = flavors.filter(flavor => !flavor.is_gaseosa);
      
      // Calcula costo de sabores.
      const flavorCost = validFlavors.reduce((total, flavor) => {
        return total + (validFlavors.length > 1 ? flavor.price / 2 : flavor.price);
      }, 0);
      
      return (product.price + additionalCost + flavorCost) * quantity;
    },

    // Recalcula el costo total del carrito (productos y adiciones)
    calculateCartTotal() {
      const productsTotal = this.cart.products.reduce((total, cartProduct) => {
        const productTotal = this.calculateProductTotal(
          cartProduct.product,
          cartProduct.quantity,
          cartProduct.additionalItems,
          cartProduct.flavors || []
        );
        return total + productTotal;
      }, 0);

      const additionsTotal = this.cart.additions.reduce(
        (total, addition) => total + addition.price * addition.quantity,
        0
      );

      this.cart.total_cost = productsTotal + additionsTotal;
    },

    // Agrega una adición a nivel de carrito (no asociada a un producto específico).
    addAdditionToCart(addition) {
      const existingAddition = this.cart.additions.find(a => a.id === addition.id);
      if (existingAddition) {
        existingAddition.quantity += addition.quantity;
      } else {
        this.cart.additions.push({ ...addition });
      }
      this.calculateCartTotal();
    },

    // Remueve una adición a nivel de carrito.
    removeAdditionFromCart(additionId) {
      const additionIndex = this.cart.additions.findIndex(a => a.id === additionId);
      if (additionIndex > -1) {
        if (this.cart.additions[additionIndex].quantity > 1) {
          this.cart.additions[additionIndex].quantity -= 1;
        } else {
          this.cart.additions.splice(additionIndex, 1);
        }
        this.calculateCartTotal();
      }
    },
  },
});
