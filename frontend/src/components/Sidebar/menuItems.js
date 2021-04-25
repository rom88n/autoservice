import { logoutUser } from 'redux/modules'
import ViewListIcon from '@material-ui/icons/ViewList'
import PersonIcon from '@material-ui/icons/Person'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import CalendarIcon from '@material-ui/icons/Event'
import { accessLevels } from '../../helpers/accessLevels';

export default [
  {
    label: 'Заказы',
    href: '/dashboard',
    icon: ViewListIcon,
  },
  {
    label: 'Работники',
    href: '/employees',
    icon: PersonIcon,
    condition: (user) => accessLevels.slice(0, 2).includes(user.accessLevel),
  },
  {
    label: 'Календарь',
    href: '/calendar',
    icon: CalendarIcon
  },
  {
    label: 'Выход',
    onClick: ({ dispatch }) => dispatch(logoutUser()),
    icon: LogoutIcon,
  }
]
