import React from 'react'
import SidebarView from '@layouts/sidebar/view/SidebarView'
import DrawerView from '@ui/drawer/DrawerView'


const SidebarMobileView = ({
							   open,
							   onClose,
						   }: {
	open: boolean
	onClose: () => void
}) => {
	return (
		<DrawerView
			open={open}
			onClose={onClose}
		>
			<SidebarView onClickNavigate={onClose} />
		</DrawerView>
	)
}

export default SidebarMobileView