import backgroundJob from './background-job'
import dotenv from 'dotenv'
//here You can config your SQS consumer
const consumer = async () => {
  dotenv.config()
  await backgroundJob('daily-clear-old-files')
}
consumer()