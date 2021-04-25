import { TextField } from '@material-ui/core';
import { SelectComponent } from 'components/MuiComponents'

export default [
  {
    component: TextField,
    name: 'governmentNumber',
    className: 'col-sm-4',
    label: 'Государственный номер',
    variant: 'outlined'
  },
  {
    name: 'engineSize',
    component: TextField,
    className: 'col-sm-4',
    type: 'number',
    label: 'Объем двигателя',
    variant: 'outlined'
  },
  {
    name: 'mileage',
    component: TextField,
    className: 'col-sm-4',
    formatting: (value) => parseInt(value, 10),
    type: 'number',
    label: 'Пробег',
    variant: 'outlined'
  },
  {
    name: 'engineNumber',
    component: TextField,
    className: 'col-sm-4',
    label: 'Номер двигателя',
    variant: 'outlined'
  },
  // {
  //   name: 'transmission',
  //   component: SelectComponent,
  //   className: 'col-sm-4',
  //   componentProps: {
  //     items: [
  //       { value: 'automatic', name: labels.automatic },
  //       { value: 'manual', name: labels.manual }
  //     ],
  //     label: labels.transmission,
  //     variant: 'outlined'
  //   }
  // },
  {
    name: 'transmission',
    component: SelectComponent,
    className: 'col-sm-4',
    label: 'Коробка передач',
    variant: 'outlined',
    select: 'true',
    items: [
      { value: 'automatic', name: 'Автоматическая' },
      { value: 'manual', name: 'Ручная' }
    ],
  },
  {
    name: 'cost',
    component: TextField,
    className: 'col-sm-4',
    formatting: (value) => parseInt(value, 10),
    type: 'number',
    label: 'Цена за работу',
    variant: 'outlined',
    required: true,
  },
  {
    name: 'make',
    component: TextField,
    className: 'col-sm-4',
    label: 'Марка',
    variant: 'outlined',
    required: true,
  },
  {
    name: 'model',
    component: TextField,
    className: 'col-sm-4',
    label: 'Модель',
    variant: 'outlined',
    required: true,
  },
  {
    name: 'year',
    component: TextField,
    className: 'col-sm-4',
    formatting: (value) => parseInt(value, 10),
    type: 'number',
    label: 'Год',
    variant: 'outlined'
  },
  {
    name: 'customerName',
    component: TextField,
    className: 'col-sm-4',
    label: 'Имя клиента',
    variant: 'outlined',
    required: true,
  },
  {
    name: 'customerPhone',
    component: TextField,
    className: 'col-sm-4',
    label: 'Номер телефона клиента',
    variant: 'outlined'
  },
  // {
  //   name: 'employee',
  //   component: Autocomplete,
  //   className: 'col-sm-8',
  //   componentProps: {
  //     multiple: true,
  //     filterSelectedOptions: true,
  //     label: labels.employees,
  //     variant: 'outlined',
  //     noOptionsText: labels.noOptionsText,
  //     options: (state: RootState) => state.employee.map(i => ({ label: i.name, value: i.id })),
  //     getOptionSelected: (option: any, value: any) => option.value === value.value,
  //     getOptionLabel: (option: { label: string, value: string }) => option.label,
  //   }
  // },
  {
    name: 'comments',
    component: TextField,
    className: 'col-sm-12',
    multiline: true,
    required: true,
    rows: 4,
    label: 'Комментарии',
    variant: 'outlined'
  }
];
