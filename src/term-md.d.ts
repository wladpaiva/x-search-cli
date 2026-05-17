declare module "term-md" {
  export type TermMdOptions = {
    reflowText?: boolean;
    showSectionPrefix?: boolean;
    width?: number;
  };

  export default function termMd(markdown: string, options?: TermMdOptions): string;
}
