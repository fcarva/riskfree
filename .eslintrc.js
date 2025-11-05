module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off"
  }
};
