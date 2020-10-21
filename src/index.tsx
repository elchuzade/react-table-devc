import React, { useState } from 'react'
import TableColumnTitle from './TableColumnTitle'
import styles from './styles.module.css'

const DeveloperCirclesTable = ({
  id,
  style,
  className,
  title,
  columns,
  rows,
  search,
  striped,
  bordered
}: TableProps) => {
  const [tableRows, setTableRows] = useState(rows)

  const sortData: SortData = (column, rows, sortDirection) => {
    setTableRows([...rows.sort((a, b) =>
      column.value(a) > column.value(b) ? sortDirection : -sortDirection)])
  }

  const filterData: FilterData = (searchFields, rows, searchTerm) => {
    var filteredData: object[] = []
    searchFields.forEach(field => {
      var column = columns.find(col => col.columnKey === field)
      var filteredDataField = rows.filter(row => column && column.value(row).toLowerCase().includes(searchTerm.toLowerCase()))

      filteredData = filteredData.concat(filteredDataField.filter(item => filteredData.indexOf(item) < 0))
      setTableRows(filteredData)
    })
  }

  return (
    <div
      id={id}
      className={`${styles.table} ${className || ''}`}
      style={style}
    >
      <div className={styles['table-header']}>
        <div className={styles['table-header-left']}>
          {title && <p className={`${styles['table-header-title']} ${title.className || ''}`} style={title.style}>{title.value}</p>}
        </div>
        <div className={styles['table-header-right']}>
          {search && (
            <input
              id={search.id}
              className={`${styles['table-header-input']} ${search.className || ''}`}
              style={search.style}
              type={search.type || 'text'}
              placeholder={search.placeholder || 'search'}
              name={search.name}
              value={search.value}
              onChange={e => {
                search.searchFields && filterData(search.searchFields, rows, e.target.value)
                search.onChangeSearch && search.onChangeSearch(e)
                return
              }}
            />
          )}
        </div>
      </div>
      <div className={styles['table-body']}>
        <table>
          <thead>
            <tr>
              {columns.map(column => (
                <TableColumnTitle
                  id={column.id}
                  key={column.columnKey}
                  style={column.style}
                  className={column.className}
                  title={column.title}
                  onSortAsc={column.onSortAsc ? () => {
                    sortData(column, rows, 1)
                    return column.onSortAsc
                  } : undefined}
                  onSortDes={column.onSortDes ? () => {
                     sortData(column, rows, -1)
                    return column.onSortDes
                  } : undefined}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                {columns.map((column, i) => (
                  <td
                    key={i}
                    className={styles['table-item']}
                    style={{
                      background: striped ? 'none' : 'white',
                      border: bordered ? '1px solid lightgrey' : 'none',
                      ...column.style
                    }}
                  >
                    {typeof column.value(row) === 'string' ? column.value(row) : `Unsupported format, please check "value" field of ${column.columnKey} column`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeveloperCirclesTable