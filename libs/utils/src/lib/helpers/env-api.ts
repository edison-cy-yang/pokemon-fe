import { Environment } from "@env/interface"

export function getEnvAPI(ENV: Environment): string {
  return ENV.API
}