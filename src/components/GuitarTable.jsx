import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import styles from './GuitarTable.module.css'

const columns = [
  { header: 'Guitar Model', accessorKey: 'model' },
  { header: 'Body Type', accessorKey: 'bodyType' },
  { header: 'Brand', accessorKey: 'brand' },
  { header: 'Stock', accessorKey: 'stock' },
  { header: 'Role', accessorKey: 'role' },
]

function GuitarTable({ guitars, selectedGuitar, onSelectGuitar }) {
  const table = useReactTable({
    data: guitars,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  })

  if (guitars.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        <h3>No guitars registered yet</h3>
        <p>Open the registration form to add your first guitar.</p>
      </div>
    )
  }

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={
                  selectedGuitar && selectedGuitar.id === row.original.id
                    ? styles.selectedRow
                    : ''
                }
                onClick={() => onSelectGuitar(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default GuitarTable
