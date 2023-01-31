import { createContext, useContext, useEffect, useState } from 'react'
import { SideCart } from '../components/Sidecart/Sidecart'
import { formatPrice } from '../utils/formatPrice'
import backendAPI from '../api'
import { useAuth } from './AuthContext'

const ShoppingCartContext = createContext({
    openCart() {},
    closeCart() {},
    getCartQuantity() {},
    getCartProducts() {},
    getCartTotalPrice() {},
    getProductQuantity(productId) {},
    addToCart(productObject) {},
    increaseProductQuantity(productId, count) {},
    decreaseProductQuantity(productId, count) {},
    updateProductQuantity(productId, count) {},
    removeFromCart(productId) {},
    userInfo: [],
    paymentInfo: [],
    handleFormChange: () => {},
    handlePaymentChange: () => {},
    deleteCart: () => {},
    removePaymentInfo: () => {},
    removeUserInfo: () => {},
    handleChosenAddress: () => {},
})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }) {
    const { currentUser } = useAuth()
    const [cartProducts, setCartProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [isShoppingCartLoading, setIsShoppingCartLoading] = useState(true)
    const [userInfo, setUserInfo] = useState({
        fName: '',
        lName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    })
    const [paymentInfo, setPaymentInfo] = useState({
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: '',
    })

    const cartQuantity = cartProducts.reduce(
        (quantity, product) => Number(product.quantity) + quantity,
        0
    )

    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                setIsShoppingCartLoading(true)
                const response = await backendAPI.cart.get(currentUser.localId)
                setCartProducts(response.data.products)
                setIsInitialLoad(false)
                setIsShoppingCartLoading(false)
            } catch (ex) {
                console.error(ex.message)
            }
        }

        if (currentUser) {
            fetchUserCart()
        } else {
            setIsInitialLoad(true)
            setCartProducts([])
        }
    }, [currentUser])

    useEffect(() => {
        cartQuantity === 0 && isOpen && closeCart()
    }, [cartQuantity, isOpen])

    useEffect(() => {
        const updateUserCart = async () => {
            setIsShoppingCartLoading(true)
            await backendAPI.cart.update(currentUser.localId, cartProducts)
            setIsShoppingCartLoading(false)
        }
        if (currentUser && !isInitialLoad) {
            updateUserCart()
        }
    }, [cartProducts, currentUser, isInitialLoad])

    function getCartProducts() {
        return cartProducts
    }

    function deleteCart() {
        setCartProducts([])
    }

    function removePaymentInfo() {
        setPaymentInfo({
            cardName: '',
            cardNumber: '',
            expDate: '',
            cvv: '',
        })
    }

    function removeUserInfo() {
        setUserInfo({
            fName: '',
            lName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        })
    }

    function getProductQuantity(productId) {
        return cartProducts.find((product) =>
            product._id === productId ? product.quantity : 0
        )
    }

    function addToCart(productObject) {
        setCartProducts((currentProducts) => {
            if (
                !currentProducts.find(
                    (cartProduct) =>
                        cartProduct.product._id === productObject._id
                )
            ) {
                return [
                    ...currentProducts,
                    { product: productObject, quantity: 1 },
                ]
            }

            return currentProducts.map((cartProduct) => {
                if (
                    cartProduct.product._id === productObject._id &&
                    cartProduct.product.quantity <= productObject.quantity
                ) {
                    return {
                        product: productObject,
                        quantity: cartProduct.quantity + 1,
                    }
                }
                return cartProduct
            })
        })
        // const onAddProduct = (product) => {
        //   setUserShoppingCart((prevState) => {
        //     const foundProduct = prevState.find((item) => item._id === product._id);
        //     return !!foundProduct
        //       ? prevState.map((item) =>
        //           item._id === product._id
        //             ? { ...foundProduct, qty: foundProduct.qty + 1 }
        //             : item
        //         )
        //       : [...prevState, { ...product, qty: 1 }];
        //   });
        // };
    }

    function increaseProductQuantity(productId, count = 1) {
        setCartProducts((currentProducts) => {
            return currentProducts.map((cartProduct) => {
                if (cartProduct.product._id === productId) {
                    const newCount =
                        count === 1 ? cartProduct.quantity + 1 : count
                    if (newCount > cartProduct.product.quantity) {
                        return cartProduct
                    }
                    return { product: cartProduct.product, quantity: newCount }
                }
                return cartProduct
            })
        })
    }

    function decreaseProductQuantity(productId, count = 1) {
        setCartProducts((currentProducts) => {
            const existingProduct = currentProducts.find(
                (cartProduct) => cartProduct.product._id === productId
            )
            const newCount = count === 1 ? existingProduct.quantity - 1 : count

            if (newCount === 0) {
                return currentProducts.filter(
                    (cartProduct) => cartProduct.product._id !== productId
                )
            }
            return currentProducts.map((cartProduct) => {
                if (cartProduct.product._id === productId) {
                    return { product: cartProduct.product, quantity: newCount }
                }
                return cartProduct
            })
        })
        // const onRemoveProduct = (product) => {
        //   setUserShoppingCart((prevState) => {
        //     const foundProduct = prevState.find((item) => item._id === product._id);

        //     return foundProduct.qty > 1
        //       ? prevState.map((item) =>
        //           item._id === product._id
        //             ? { ...foundProduct, qty: foundProduct.qty - 1 }
        //             : item
        //         )
        //       : prevState.filter((item) => item._id !== product._id);
        //   });
        // };
    }

    function updateProductQuantity(productId, count) {
        setCartProducts((currentProducts) => {
            let newCount = count

            if (count < 0) {
                newCount = 1
            }

            if (count === 0) {
                return currentProducts.filter(
                    (cartProduct) => cartProduct.product._id !== productId
                )
            }
            return currentProducts.map((cartProduct) => {
                if (cartProduct.product._id === productId) {
                    return { product: cartProduct.product, quantity: newCount }
                }
                return cartProduct
            })
        })
    }

    function removeFromCart(productId) {
        setCartProducts((currentProducts) => {
            return currentProducts.filter(
                (cartProduct) => cartProduct.product._id !== productId
            )
        })
    }

    function openCart() {
        setIsOpen(true)
    }
    function closeCart() {
        setIsOpen(false)
    }
    function getCartQuantity() {
        return cartQuantity
    }

    function getCartTotalPrice() {
        let sum = 0
        for (let product of cartProducts) {
            sum += product.quantity * product.product.price
        }
        return formatPrice(sum)
        // return cartProducts.reduce((all, current) => all + current.quantity * current.price, 0);
    }

    const handleFormChange = async (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value,
        })
    }

    const handlePaymentChange = async (event) => {
        setPaymentInfo({
            ...paymentInfo,
            [event.target.name]: event.target.value,
        })
    }

  const handleChosenAddress = (address) => {
    console.log(address)
    setUserInfo({
        ...userInfo,
        ...address,
    })
  }

    return (
        <ShoppingCartContext.Provider
            value={{
                openCart,
                closeCart,
                getCartQuantity,
                getCartProducts,
                getProductQuantity,
                getCartTotalPrice,
                addToCart,
                removeFromCart,
                deleteCart,
                increaseProductQuantity,
                decreaseProductQuantity,
                updateProductQuantity,
                userInfo: userInfo,
                paymentInfo: paymentInfo,
                handleFormChange: handleFormChange,
                handlePaymentChange: handlePaymentChange,
                removePaymentInfo,
                removeUserInfo,
                isShoppingCartLoading,
                handleChosenAddress,
            }}
        >
            {children}
            <SideCart isCartOpen={isOpen}></SideCart>
        </ShoppingCartContext.Provider>
    )
}
