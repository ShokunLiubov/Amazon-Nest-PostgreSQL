import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { TypePaginationProduct } from '@/types/product.interface'

import { Heading } from '../Heading'
import { Loader } from '../Loader'
import { Button } from '../button/Button'

import { SortDropdown } from './SortDropdown'
import { ProductItem } from './product-item/ProductItem'
import { ProductService } from '@/services/product/product.service'
import { EnumProductSort } from '@/services/product/productData.interface'

interface ICatalog {
	data: TypePaginationProduct
	title?: string
}

export const CatalogPagination: FC<ICatalog> = ({ data, title }) => {
	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.NEWEST
	)

	const [page, setPage] = useState(1)

	const { data: response, isLoading } = useQuery(
		['products', sortType, page],
		() =>
			ProductService.getAll({
				page: page,
				perPage: 4,
				sort: sortType
			}),
		{
			initialData: data
		}
	)

	const { products, length } = response

	if (isLoading) {
		return <Loader />
	}

	return (
		<section>
			{title ? <Heading className="mb-5">{title}</Heading> : ''}
			<SortDropdown sortType={sortType} setSortType={setSortType} />
			{length ? (
				<>
					<div className="grid grid-cols-4 gap-10">
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
					<div className="text-center mt-16">
						{Array.from({ length: Math.ceil(length / 4) }).map((_, index) => {
							const pageNumber = index + 1
							return (
								<Button
									key={pageNumber}
									size="sm"
									variant={page === pageNumber ? 'orange' : 'white'}
									onClick={() => setPage(pageNumber)}
									className="mx-3"
								>
									{pageNumber}
								</Button>
							)
						})}
					</div>
				</>
			) : (
				<div>There are no products!</div>
			)}
		</section>
	)
}
