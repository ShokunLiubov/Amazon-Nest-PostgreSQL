import Image from 'next/image'
import { FC } from 'react'

import { ICartItem } from '@/types/cart.interface'

import styles from '../Cart.module.scss'

import { CartActions } from './cart-actions/CartActions'
import { convertPrice } from '@/utils/conver-price'

export const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	const { name, images, price } = item.product
	return (
		<div className={styles.item}>
			<Image src={images[0]} width={100} height={100} alt={name} />
			<div>
				<div className={styles.name}>{name}</div>
				<div className={styles.price}>{convertPrice(price)}</div>
			</div>

			<CartActions item={item} />
		</div>
	)
}
