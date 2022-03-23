import dailyClearOldFiles from './dailyClearOldFiles'

const startBackgroundJob = async (jobName) => {
  if (jobName === 'daily-clear-old-files') await dailyClearOldFiles()
  process.exit()
}
export default startBackgroundJob