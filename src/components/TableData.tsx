import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { FC, ReactNode } from 'react';

interface TableDataProps {
  rows: any[];
  columns: {
    title: string;
    field?: string;
    attr?: Record<string, string | number>;
    template?: (row: any) => ReactNode;
  }[];
  pagination?: {
    count: number;
    page: number;
    limit: number;
  };
  updatePagination?: (data: Record<string, number>) => void;
}

const TableData: FC<TableDataProps> = ({ rows, columns, pagination, updatePagination }: TableDataProps) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={`th-${index}`} {...(col.attr ? { ...col.attr } : {})}>
                  {col.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                {columns.map((col, index) => (
                  <TableCell key={`td-${index}`} {...(col.attr ? { ...col.attr } : {})}>
                    {col.field ? row[col.field] : col.template ? col.template(row) : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <Box p={2}>
          <TablePagination
            component="div"
            count={pagination.count}
            onPageChange={(_, page) => {
              updatePagination && updatePagination({ page });
            }}
            onRowsPerPageChange={({ target }) => {
              updatePagination && updatePagination({ limit: +target.value });
            }}
            page={pagination.page}
            rowsPerPage={pagination.limit}
            rowsPerPageOptions={[10, 20, 30]}
          />
        </Box>
      )}
    </>
  );
};

export default TableData;
