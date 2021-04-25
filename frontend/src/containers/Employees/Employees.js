import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { GET_USERS, DELETE_USERS } from '../../apollo/queries';
import { TableComponent } from '../../components/MuiComponents';
import { Link } from '../../components';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column'
  }
})

const accessOptions = {
  superAdmin: 'Супер Администратор',
  admin: 'Администратор',
  user: 'Сотрудник',
}

const columns = [
  {
    field: 'name',
    headerName: 'Имя',
    sortable: false,
    width: 250
  },
  {
    field: 'login',
    headerName: 'Логин',
    sortable: false,
    width: 260
  },
  {
    field: 'accessLevel',
    headerName: 'Уровень доступа',
    sortable: false,
    valueGetter: ({ row }) => accessOptions[row.accessLevel],
    width: 360
  }
];

export const Employees = () => {
  const classes = useStyles()
  const router = useRouter()

  const onRowClick = ({ row }) => router.replace({ pathname: `/employees/${row.id}` })

  return (
    <div className={classes.root}>
      <TableComponent
        toolbar={{
          queryRemove: DELETE_USERS,
          additionalItems: [
            <IconButton component={Link} href="/employees/create" size="small" key={1}>
              <AddIcon />
            </IconButton>
          ]
        }}
        columns={columns}
        query={GET_USERS}
        dataPath="allUsers"
        totalPath="_allUsersMeta"
        onRowClick={onRowClick}
      />
    </div>
  );
};
