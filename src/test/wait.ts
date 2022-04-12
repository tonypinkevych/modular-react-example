export async function wait(timeoutInSeconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeoutInSeconds * 1000)
  })
}
