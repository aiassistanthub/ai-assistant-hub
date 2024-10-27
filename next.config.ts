import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TypeScriptファイルをページとして認識するための設定
  pageExtensions: ['ts', 'tsx'],

  // 必要に応じて他の設定を追加
  // basePath: '/app', // ベースパスを設定する場合
  // rewrites: async () => [
  //   { source: '/old-path/:path*', destination: '/new-path/:path*' },
  // ],
  // redirects: async () => [
  //   { source: '/old-path', destination: '/new-path', permanent: true },
  // ],
  // env: {
  //   CUSTOM_VAR: 'value', // 環境変数を設定する場合
  // },
  // i18n: {
  //   locales: ['en', 'ja'], // 多言語対応を設定する場合
  //   defaultLocale: 'en',
  // },
};

export default nextConfig;