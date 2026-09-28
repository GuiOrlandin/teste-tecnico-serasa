export type RevisaoPageProps = {
  searchParams: Promise<{
    oferta?: string | string[];
    forma?: string | string[];
    checkout?: string | string[];
  }>;
};
