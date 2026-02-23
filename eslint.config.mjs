import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
    ...nextConfig,
    {
        ignores: ["node_modules/**", ".next/**", "generated/**", "proto/**", "pnpm-lock.yaml"]
    }
];

export default config;
