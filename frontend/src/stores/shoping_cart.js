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
    paths: ['cart', 'last_order','currentCategorie','categories','versionMenu'],
  },
  state: () => ({
    currentProduct: {},
    currentCategorie:{},
    categories:[],
    versionMenu:0,
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
    addProductToCart(product, quantity = 1,flavorLists = [], additionalItems = [],  gaseosa = null) {
      // Crea la firma que identifica este producto con su arreglo de sub-listas de sabores
      const signature = generateProductSignature(product, flavorLists, additionalItems, gaseosa);
    
      // Verifica si este producto (misma signature) ya existe en el carrito
      const cartProduct = this.cart.products.find(p => p.signature === signature);
    
      if (cartProduct) {
        // Ya existe, solo incrementa la cantidad
        cartProduct.quantity += quantity;
        cartProduct.total_cost += this.calculateProductTotal(product, quantity, additionalItems, flavorLists);
    
        console.log(flavorLists)
        // Fusionar los adicionales (si quieres) o simplemente manejarlo como lo has hecho:
        cartProduct.additionalItems.push(...additionalItems);
    
      } else {
        // Agrega un nuevo elemento al arreglo 'products'
        this.cart.products.push({
          product,
          quantity,
          signature,
          flavors: flavorLists,        // <-- Aquí guardamos la lista de listas
          gaseosa,
          additionalItems: [...additionalItems],
          total_cost: this.calculateProductTotal(product, quantity, additionalItems, flavorLists),
        });
      }
    
      console.log(flavorLists)

      // Recalcula el total general del carrito
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
    calculateCartTotal() {
      const productsTotal = this.cart.products.reduce((total, cartProduct) => {
        return total + this.calculateProductTotal(
          cartProduct.product,
          cartProduct.quantity,
          cartProduct.additionalItems,
          cartProduct.flavors || []
        );
      }, 0);
    
      const additionsTotal = this.cart.additions.reduce(
        (total, addition) => total + addition.price * addition.quantity,
        0
      );
    
      this.cart.total_cost = productsTotal + additionsTotal;
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
      return flavors
    },

    
    calculateProductTotal(product, quantity, additionalItems, flavorLists = []) {
      // Costo de adicionales
      const additionalCost = additionalItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    
      let flavorCost = 0;
    
      // Recorremos cada "sublista" de sabores
      for (const subList of flavorLists) {
        if (subList.flavors.length > 1) {
          // Sumar todos sus precios y tomar la mitad
          const sumSubList = subList.flavors.reduce((acc, f) => acc + (f.price || 0), 0);
          flavorCost += sumSubList / 2;
        } else if (subList.flavors.length === 1) {
          // Solo un sabor, precio completo
          flavorCost += (subList.flavors[0].price || 0);
        }
        // Si subList está vacío (casi seguro no pasa), añadir 0.
      }

      // console.log(flavorLists)
      return (product.price + additionalCost + flavorCost) * quantity;
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
