import { TextField } from '@material-ui/core';
import { SelectComponent } from 'components/MuiComponents'
import { accessOptions } from '../helpers/accessLevels';

export default [
  {
    component: TextField,
    name: 'name',
    className: 'col-sm-4',
    label: 'Имя',
    variant: 'outlined'
  },
  {
    name: 'login',
    component: TextField,
    className: 'col-sm-4',
    label: 'Логин',
    variant: 'outlined'
  },
  {
    name: 'password',
    component: TextField,
    className: 'col-sm-4',
    label: 'Пароль',
    variant: 'outlined',
    required: true,
  },
  {
    name: 'accessLevel',
    component: SelectComponent,
    className: 'col-sm-8',
    label: 'Уровень доступа',
    variant: 'outlined',
    select: 'true',
    items: accessOptions.map(item => ({ value: item.value, name: item.label })),
  },
];
