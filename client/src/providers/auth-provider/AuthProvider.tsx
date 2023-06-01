import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import { CheckRole } from './CheckRole'
import { TypeComponentAuthFields } from './auth-page.types'
import { getAccessToken } from '@/services/auth/auth.helper'
import { EnumTokens } from '@/services/auth/tokens.enum'

const DynamicCheckRole = dynamic(() => Promise.resolve(CheckRole), {
	ssr: false
})

export const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyUser },
	children
}) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()
	const pathname = useRouter()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) {
			checkAuth()
		}
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)
		if (!refreshToken && user) {
			logout()
		}
	}, [pathname])

	return isOnlyUser ? (
		<DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
	) : (
		<>{children}</>
	)
}
