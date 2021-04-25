import React, { useEffect, memo } from 'react';
import classNames from 'classnames'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, lighten } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getData, setSelected, removeRows, setSearch, setPagination, clearConfig } from 'redux/modules/tableConfig';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '.5rem 0'
  },
  table: {
    minHeight: '50vh',
    '& .MuiDataGrid-row': {
      cursor: 'pointer',
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      },
      '&:hover': {
        backgroundColor: lighten(theme.palette.primary.main, 0.9)
      }
    }
  },
  textField: {
    margin: '1rem 0',
    width: '100%'
  }
}));

export const TableComponent = memo((props) => {
  const {
    columns, className, query, dataPath, totalPath, toolbar, withSearch, ...rest
  } = props
  const classes = useStyles();
  const dispatch = useDispatch()
  const router = useRouter()
  const tableConfig = useSelector(store => store.tableConfig)

  const { selected, data, page, search, total, limit } = tableConfig

  const fetchData = async () => {
    // eslint-disable-next-line no-return-await
    return await dispatch(await getData({
      variables: {
        search,
        skip: (page - 1) * limit,
      },
      query,
      dataPath,
      totalPath
    }))
  }

  useEffect(() => {
    fetchData()
  }, [search, page, limit])

  useEffect(() => {
    return () => {
      dispatch(clearConfig())
    }
  }, [router.pathname])

  const onRowSelected = ({ selectionModel }) => dispatch(setSelected(selectionModel))

  const handleRemove = async () => {
    await dispatch(await removeRows({ query: toolbar.queryRemove, ids: selected }))
    await fetchData()
  }

  const onPageChange = ({ page, pageSize }) => dispatch(setPagination({ page: page + 1, limit: pageSize }))

  const debounced = useDebouncedCallback((value) => {
    dispatch(setSearch(value))
  }, 300);

  const onChange = (e) => debounced(e.target.value)

  return (
    <>
      {withSearch && (
        <>
          <TextField
            className={classes.textField}
            placeholder="Поиск..."
            variant="outlined"
            size="small"
            onChange={onChange}
          />
          <Divider/>
        </>
      )}
      <div className={classes.toolbar}>
        {toolbar.queryRemove && (
          <>
            {get(toolbar, 'additionalItems', [])}
            <IconButton disabled={isEmpty(selected)} onClick={handleRemove} size="small">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
      <DataGrid
        disableSelectionOnClick
        rowCount={total}
        rows={data}
        columns={columns}
        pageSize={limit}
        checkboxSelection
        disableColumnMenu
        showColumnRightBorder={false}
        className={classNames(classes.table, className)}
        onPageChange={onPageChange}
        onPageSizeChange={onPageChange}
        onSelectionModelChange={onRowSelected}
        paginationMode="server"
        localeText={{
          footerRowSelected: (count) => `Выбрано строк: ${count.toLocaleString()}`,
        }}
        {...rest}
      />
    </>
  );
});

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  className: PropTypes.string,

  toolbar: PropTypes.shape({
    queryRemove: PropTypes.object,
    additionalItems: PropTypes.array,
  }),

  query: PropTypes.any.isRequired,
  dataPath: PropTypes.string.isRequired,
  totalPath: PropTypes.string.isRequired,
  withSearch: PropTypes.bool,
}

TableComponent.defaultProps = {
  toolbar: {}
}
