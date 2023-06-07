import { FC } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { TypePaginationProduct } from '@/types/product.interface'

import { Meta } from '@/ui/Meta'
import { Catalog } from '@/ui/catalog/Catalog'
import { Layout } from '@/ui/layout/Layout'

const Home: FC<TypePaginationProduct> = ({ products, length }) => {
	const { user } = useAuth()
	const { logout } = useActions()
	return (
		<Meta title="Home">
			<Layout>
				{!!user && <button onClick={() => logout()}>Logout</button>}
				<Catalog products={products || []} title="Freshed products" />
			</Layout>
		</Meta>
	)
}

export default Home
