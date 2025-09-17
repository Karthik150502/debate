
export function assertEnvVariable(name: string) {
    const envVar = process.env[name]
    if (!envVar) throw new Error(`environment variable: ${name} not defined`);
    return envVar;
}