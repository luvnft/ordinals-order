const environment = process.env.NODE_ENV;

const developmentUrls = {
  base: 'http://localhost:3000',
  ordinalsApi: 'https://api.ordinalsbot.com',
  mempoolApi: 'https://mempool.space/api/v1',
} as const;

const productionUrls = {
  base: '',
  ordinalsApi: 'https://api.ordinalsbot.com',
  mempoolApi: 'https://mempool.space/api/v1',
} as const;

const getUrls = () => {
  switch (environment) {
    case 'test':
    case 'development':
      return developmentUrls;
    case 'production':
      return productionUrls;
    default:
      throw new Error('Unexpected NODE_ENV');
  }
};

export const urls = getUrls();
