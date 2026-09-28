export type PagamentoPageProps = {
  searchParams: Promise<{
    oferta?: string | string[];
    forma?: string | string[];
  }>;
};
