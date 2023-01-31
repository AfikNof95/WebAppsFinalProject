import { Box, Container } from '@mui/system'
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation'
import DashboardUsers from '../../components/DashboardUsers/DashboardUsers'
import { useCallback, useEffect, useState } from 'react'
import backendAPI from '../../api'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import DashboardProducts from '../../components/DashboardProducts/DashboardProducts'
import DashboardAnalyticsOverview from '../../components/DashboardAnalyticsOverview/DashboardAnalyticsOverview'
import DashboardOrders from '../../components/DashboardOrders/DashboardOrders'

const DashboardPage = (props) => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [categories, setCategories] = useState([])
    const [usersAnalytics, setUsersAnalytics] = useState(null)
    const [productAnalytics, setProductAnalytics] = useState(null)
    const [ordersAnalytics, setOrdersAnalytics] = useState(null)

    const [currentPage, setCurrentPage] = useState({ name: 'users' })

    useEffect(() => {
        if (!currentUser) {
            navigate({ pathname: '/login' })
        }
        const fetchIsAdmin = async () => {
            try {
                await backendAPI.admin.user.isAdmin(currentUser.idToken)
                setIsAdmin(true)
                setCurrentPage('users')
                setIsLoading(false)
            } catch (ex) {}
        }

        fetchIsAdmin()
    }, [currentUser, navigate])

    const fetchOrdersAnalytics = () => {
        backendAPI.admin.order.analytics().then((response) => {
            setOrdersAnalytics(response.data)
        })
    }
    const fetchProductsAnalytics = () => {
        backendAPI.admin.product.analytics().then((response) => {
            setProductAnalytics(response.data)
        })
    }
    const fetchUsersAnalytics = () => {
        backendAPI.admin.user.analytics().then((response) => {
            setUsersAnalytics(response.data)
        })
    }

    useEffect(() => {
        const fetchUsers = () => {
            backendAPI.admin.user.getAll().then((response) => {
                let { users } = response.data
                setUsers(users)
            })
        }
        const fetchProducts = () => {
            backendAPI.admin.product.getAll().then((responseProducts) => {
                let { products: prods } = responseProducts.data
                setProducts(prods)
            })
            backendAPI.admin.category.getAll().then((responseCategories) => {
                const { categories } = responseCategories.data
                setCategories(categories)
            })
        }
        const fetchOrders = () => {
            backendAPI.admin.order.getAll().then((responseOrders) => {
                const { orders } = responseOrders.data
                setOrders(orders)
            })
        }

        if (isAdmin) {
            fetchProducts()
            fetchOrders()
            fetchUsers()
            fetchUsersAnalytics()
            fetchProductsAnalytics()
            fetchOrdersAnalytics()
        }
    }, [isAdmin])

    const handlePageClick = (pageName) => {
        setCurrentPage(pageName.toLowerCase())
    }

    const handleUsersUpdate = async () => {
        setTimeout(() => {
            fetchUsersAnalytics()
        }, 1000)
    }

    return (
        !isLoading && (
            <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'flex-start'}
            >
                <DashboardNavigation
                    selectedPage={currentPage}
                    handlePageClick={handlePageClick}
                ></DashboardNavigation>
                {(() => {
                    switch (currentPage.toLowerCase()) {
                        case 'users':
                            return (
                                <DashboardUsers
                                    token={currentUser.idToken}
                                    usersArray={users}
                                    updateUserAnalytics={handleUsersUpdate}
                                ></DashboardUsers>
                            )

                        case 'overview':
                            return (
                                <DashboardAnalyticsOverview
                                    token={currentUser.idToken}
                                    users={usersAnalytics}
                                    products={productAnalytics}
                                    orders={ordersAnalytics}
                                ></DashboardAnalyticsOverview>
                            )
                        case 'products':
                            return (
                                <DashboardProducts
                                    token={currentUser.idToken}
                                    productsArray={products}
                                    categoriesArray={categories}
                                ></DashboardProducts>
                            )
                        case 'orders':
                            return (
                                <DashboardOrders
                                    token={currentUser.idToken}
                                    ordersArray={orders}
                                    users={users}
                                ></DashboardOrders>
                            )
                        default:
                            return (
                                <DashboardUsers
                                    token={currentUser.idToken}
                                    usersArray={users}
                                ></DashboardUsers>
                            )
                    }
                })()}
            </Box>
        )
    )
}

export default DashboardPage
