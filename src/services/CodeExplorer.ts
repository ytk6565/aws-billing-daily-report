import * as AWS from 'aws-sdk'
import { AWSError } from 'aws-sdk'
import {
  GetCostAndUsageRequest,
  GetCostAndUsageResponse,
} from 'aws-sdk/clients/costexplorer'

export type CodeExplorerResponse = GetCostAndUsageResponse

const A_DAY_TIME = 24 * 60 * 60 * 1000

function formatTimePeriod(time: number) {
  const date = new Date(time)
  return `${date.getFullYear()}-${padStart(date.getMonth() + 1, 2)}-${padStart(
    date.getDate(),
    2
  )}`
}

function padStart(target: string | number, length = 0, padString = '0') {
  return `${[...new Array(length)]
    .map(() => padString)
    .join('')}${target}`.slice(length * -1)
}

const nowTime = (() => {
  const time = new Date().getTime()
  return time - (time % A_DAY_TIME)
})()
const start = formatTimePeriod(nowTime - A_DAY_TIME)
const end = formatTimePeriod(nowTime)
const params: GetCostAndUsageRequest = {
  Metrics: ['UnblendedCost'],
  TimePeriod: {
    Start: start,
    End: end,
  },
  Granularity: 'DAILY',
  GroupBy: [
    {
      Type: 'DIMENSION',
      Key: 'SERVICE',
    },
  ],
}

export default class CodeExplorer {
  _instance: AWS.CostExplorer

  constructor() {
    this._instance = new AWS.CostExplorer({ apiVersion: '2017-10-25' })
  }

  getCostAndUsage(
    callback?: (err: AWSError, data: GetCostAndUsageResponse) => void
  ): void {
    this._instance.getCostAndUsage(params, callback)
  }
}
