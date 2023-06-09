import { Dispatch, FC, SetStateAction } from 'react'

import { EnumProductSort } from '@/services/product/productData.interface'

interface ISortDropdown {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
}

export const SortDropdown: FC<ISortDropdown> = ({ sortType, setSortType }) => {
	return (
		<div className="text-right mb-5">
			<select
				className="appearance-none py-1 px-2 bg-white"
				value={sortType}
				onChange={e => setSortType(e.target.value as any)}
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(key => {
					return (
						<option key={EnumProductSort[key]} value={EnumProductSort[key]}>
							{EnumProductSort[key]}
						</option>
					)
				})}
			</select>
		</div>
	)
}
