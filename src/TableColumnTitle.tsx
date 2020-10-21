import React from 'react'
import styles from './styles.module.css'

const TableColumnTitle = ({
  id,
  className,
  style,
  title,
  onSortAsc,
  onSortDes
} : TableColumnTitle) => {
  return (
    <th
      id={id}
      className={`${styles['table-column']} ${className}`} style={style}
    >
      <span className={styles['table-column-title-left']}>
        {title}
      </span>
      <span className={styles['table-column-title-right']}>
        {onSortAsc &&
          <button
            className={styles['table-column-title-button']}
            onClick={onSortAsc}
          >
              {'<'}
          </button>
        }
        {onSortDes &&
          <button
            className={styles['table-column-title-button']}
            onClick={onSortDes}
          >
            {'>'}
          </button>
        }
      </span>
    </th>
  )
}

export default TableColumnTitle