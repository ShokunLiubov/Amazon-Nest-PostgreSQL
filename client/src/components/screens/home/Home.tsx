import { FC } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { TypePaginationProduct } from '@/types/product.interface'

import { Meta } from '@/ui/Meta'
import { Catalog } from '@/ui/catalog/Catalog'

const Home: FC<TypePaginationProduct> = ({ products, length }) => {
	const { user } = useAuth()
	const { logout } = useActions()
	return (
		<Meta title="Home">
			{!!user && <button onClick={() => logout()}>Logout</button>}
			<Catalog products={products || []} title="Freshed products" />
		</Meta>
	)
}

export default Home
