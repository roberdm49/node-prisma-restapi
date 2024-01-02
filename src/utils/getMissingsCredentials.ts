export const getMissingCredentials = (expectedCredentials: string[], userInputObject: object): string[] => {
  const userKeysCredentials = Object.keys(userInputObject)
  const missingCredentials = expectedCredentials.filter(credential => !userKeysCredentials.includes(credential))

  return missingCredentials
}
