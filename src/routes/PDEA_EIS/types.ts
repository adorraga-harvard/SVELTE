    export interface TableData {
      columns: string[];
      rows: { [key: string]: string | number | null; }[];
    }