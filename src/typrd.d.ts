interface TableProps {
    id?: string;
    style?: {};
    className?: string; 
    title?: TableTitle;
    columns: TableColumn[];
    rows: object[];
    search?: TableInput;
    striped?: boolean;
    bordered?: boolean
  }
  
  interface TableColumnTitle {
    id?: string;
    style?: {};
    className?: string;
    title?: string;
    onSortAsc?: OnSortButton;
    onSortDes?: OnSortButton;
  }
  
  type TableTitle = {
    id?: string;
    style?: {}
    className?: string;
    value?: string;
  }
  
  type TableColumn = {
    id?: string;
    style?: {};
    className?: string;
    title?: string;
    columnKey: string; // unique
    onSortAsc?: OnSortButton;
    onSortDes?: OnSortButton;
    value: ColumnValue;
  }
  
  type TableInput = {
    id?: string;
    style?: {};
    className?: string;
    placeholder?: string;
    name?: string;
    type?: string;
    value?: any;
    searchFields?: string[];
    onChangeSearch?: OnChangeInput;
  }
  
  type SortData = (
    column: TableColumn,
    rows: object[],
    sortDirection: number
  ) => void
  
  type FilterData = (
    searchFields: string[],
    rows: object[],
    searchTerm: string
  ) => void
  
  type OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => any
  
  type OnSortButton = () => any
  
  type ColumnValue = (row: object) => string