import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableComponent } from 'components/MuiComponents';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'components';
import { useRouter } from 'next/router';
import { GET_ORDERS, DELETE_ORDERS } from '../../apollo/queries';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column'
  }
})

const columns = [
  {
    field: 'carModel',
    headerName: 'Марка/Модель',
    sortable: false,
    width: 260,
    valueGetter: ({ row }) => `${row.make || ''} ${row.model || ''}`
  },
  {
    field: 'year',
    headerName: 'Год',
    sortable: false,
    width: 100
  },
  {
    field: 'user',
    headerName: 'Мастер',
    sortable: false,
    width: 160,
    valueFormatter: (params) => params?.value?.map(item => item.name).join(', ')
  },
  {
    field: 'customerName',
    headerName: 'Имя заказчика',
    sortable: false,
    width: 160
  },
  {
    field: 'customerPhone',
    headerName: 'Телефон заказчика',
    sortable: false,
    width: 200
  },
  {
    field: 'createdAt',
    headerName: 'Дата',
    sortable: false,
    width: 160,
    valueFormatter: (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
  },
  {
    field: 'comments',
    headerName: 'Комментарий',
    sortable: false,
    align: 'center',
    headerAlign: 'center',
    width: 400
  },
];

export const Dashboard = () => {
  const classes = useStyles()
  const router = useRouter()

  const onRowClick = ({ row }) => router.replace({ pathname: `/order/${row.id}` })

  return (
    <div className={classes.root}>
      <TableComponent
        withSearch
        toolbar={{
          queryRemove: DELETE_ORDERS,
          additionalItems: [
            <IconButton component={Link} href="/order/create" size="small" key={1}>
              <AddIcon />
            </IconButton>
          ]
        }}
        columns={columns}
        query={GET_ORDERS}
        dataPath="allOrders"
        totalPath="_allOrdersMeta"
        onRowClick={onRowClick}
      />
    </div>
  );
};
