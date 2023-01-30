import { useEffect } from 'react'
import { AddressCard } from './AddressCard';
// import { useShoppingCart } from '../../context/ShoppingCartContext'

// useEffect(()=>{}) will fetch user address

const tmpAddress = [
    { address1: 'Arbel 23', address2: '', city: 'Reut', state: 'Israel', zip: '7179908', country: 'IL' },
    { address1: 'Afik 33', address2: '', city: 'NesZiona', state: 'Rotem', zip: '555', country: 'USA' },
    { address1: 'Rotem 55', address2: '', city: 'Jerusalem', state: 'Fiki', zip: '101010', country: 'IL' },
]

export const AddressCardList = () => {
    return tmpAddress?.map((address) => (
        <AddressCard
            key={address?.zip}
            address1={address?.address1}
            address2={address?.address2}
            city={address?.city}
            state={address?.state}
            zip={address?.zip}
            country={address?.country}
        ></AddressCard>
    ))
};
