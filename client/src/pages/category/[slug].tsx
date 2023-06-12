import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'

import { CategoryService } from '@/services/category/category.service'
import { ProductService } from '@/services/product/product.service'
import { Meta } from '@/ui/Meta'
import { Catalog } from '@/ui/catalog/Catalog'
import { Layout } from '@/ui/layout/Layout'

const CategoryPage: NextPage<{
	products: IProduct[]
	category: ICategory
}> = ({ products, category }) => {
	console.log(category)

	return (
		<Meta title={category?.name}>
			<Layout>
				<Catalog products={products || []} title={category?.name} />
			</Layout>
		</Meta>
	)
}

export default CategoryPage

export const getStaticPath: GetStaticPaths = async () => {
	const categories = await CategoryService.getAll()

	const paths = categories.data.map(category => {
		return {
			params: { slug: category.slug }
		}
	})

	return { paths, fallback: 'blocking' }
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { slug: '/category/' } }],
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { data: products } = await ProductService.byCategory(
		params?.slug as string
	)

	const { data: category } = await CategoryService.getBySlug(
		params?.slug as string
	)
	return {
		props: {
			products,
			category
		}
	}
}
