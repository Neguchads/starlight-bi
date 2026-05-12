declare module "papaparse" {
  export interface ParseConfig {
    header?: boolean;
    complete?: (results: any) => void;
    error?: (error: any) => void;
    [key: string]: any;
  }

  export function parse(file: File | string, config: ParseConfig): void;

  export default {
    parse,
  };
}
