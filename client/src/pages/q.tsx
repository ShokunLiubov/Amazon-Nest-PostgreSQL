import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { ProductService } from '@/services/product/product.service'
import { Meta } from '@/ui/Meta'
import { Catalog } from '@/ui/catalog/Catalog'
import { Layout } from '@/ui/layout/Layout'

const SearchPage: NextPage = () => {
	const { query } = useRouter()
	console.log(query.term)

	const { data } = useQuery(
		['search products', query.term],
		() =>
			ProductService.getAll({
				searchItems: query.term as string
			}),
		{
			enabled: !!query.term
		}
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

export default SearchPage
