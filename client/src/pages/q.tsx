import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { ProductService } from '@/services/product/product.service'
import { Meta } from '@/ui/Meta'
import { Catalog } from '@/ui/catalog/Catalog'
import { Layout } from '@/ui/layout/Layout'

const SearchPage: FC = () => {
	const { query } = useRouter()

	const { data } = useQuery(['search products', query.term], () =>
		ProductService.getAll({
			searchItems: query.term as string
		})
	)

	return (
		<Meta title="Search">
			<Layout>
				<Catalog
					products={data?.products || []}
					title={`Search by request ${query.term || ''}`}
				/>
			</Layout>
		</Meta>
	)
}
