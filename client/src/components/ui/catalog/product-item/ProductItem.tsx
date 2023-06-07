import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { AddToCart } from './AddToCart'
import { ProductRating } from './ProductRating'
import { convertPrice } from '@/utils/conver-price'

const DynamicFavoriteButton = dynamic(
	() => import('./FavoriteButton').then(mod => mod.FavoriteButton),
	{
		ssr: false
	}
)

export const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<div>
			<div className="bg-white rounded-xl relative overflow-hidden">
				<div className="absolute top-2 right-3 z-10">
					<DynamicFavoriteButton productId={product.id} />
					<AddToCart product={product} />
				</div>

				<Link href={`/product/${product.slug}`}>
					<Image
						width={250}
						height={250}
						src={product.images[0]}
						alt={product.name}
					/>
				</Link>
			</div>
			<Link href={`/product/${product.slug}`}>
				<h3 className="mt-2 font-semibold">{product.name}</h3>
			</Link>
			<Link href={`/category/${product.category.slug}`}>
				<div className="text-aqua text-xs mb-2">{product.category.name}</div>
			</Link>
			<ProductRating product={product} />
			<div className="text-xl font-semibold">{convertPrice(product.price)}</div>
		</div>
	)
}
