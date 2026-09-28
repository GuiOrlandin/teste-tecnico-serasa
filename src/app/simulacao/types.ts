export type SimulacaoPageProps = {
  searchParams: Promise<{
    oferta?: string | string[];
    forma?: string | string[];
  }>;
};
