import cn from 'clsx'
import { forwardRef } from 'react'

// import stylesfro
import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, className, Icon, error, type = 'text', style, ...rest },
		ref
	) => {
		return (
			<div className={cn('mb-4', className)} style={style}>
				<label>
					<span className="mb-1 block">
						{Icon && <Icon className="mr-3" />}
						{placeholder}
					</span>
					<input
						ref={ref}
						type={type}
						{...rest}
						className={cn(
							'px-4 py-2 w-full outline-non focus:border-primary border border-grey border-solid transition-all placeholder:text-gray rounded-lg',
							{
								'border-red': !!error
							}
						)}
						placeholder={placeholder}
					/>
				</label>
				{error && <div className={'text-red mt-1 text-sm'}>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
