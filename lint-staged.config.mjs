import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  '{apps,modules}/**/*.{js,ts,jsx,tsx}': (files) => {
    const relFiles = files.map((f) => path.relative(__dirname, f)).join(',')
    return [
      `pnpm nx affected -t lint --files=${relFiles}`,
      `pnpm nx format:write --files=${relFiles}`,
    ]
  },
}
