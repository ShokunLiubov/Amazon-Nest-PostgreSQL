import { GetStaticProps, NextPage } from 'next'

import { TypePaginationProduct } from '@/types/product.interface'

import Home from '../components/screens/home/Home'

import { ProductService } from '@/services/product/product.service'

const HomePage: NextPage<TypePaginationProduct> = ({ length, products }) => {
	return <Home length={length} products={products} />
}

export const getStaticProps: GetStaticProps<
	TypePaginationProduct
> = async () => {
	const { data } = await ProductService.getAll({
		page: 1,
		perPage: 4
	})

	return {
		props: data
	}
}

export default HomePage
