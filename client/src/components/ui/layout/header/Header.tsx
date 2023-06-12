import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'

import { HeaderProfile } from './HeaderProfile'
import { Search } from './Search'
import { HeaderCart } from './cart/HeaderCart'

export const Header: FC = () => {
	return (
		<header
			className="bg-secondary w-full py-6 px-6 grid"
			style={{
				gridTemplateColumns: '1fr 1.5fr 3fr'
			}}
		>
			<Link href="/" className="flex items-center">
				<Image
					src={'/images/logo.png'}
					alt="Amazon"
					priority
					width={180}
					height={37}
				/>
			</Link>
			<Search />
			<div className="flex items-center justify-end gap-10">
				<Link href="/favorites" className="text-white">
					<AiOutlineHeart size={28} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}
