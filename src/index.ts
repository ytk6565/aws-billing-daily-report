import CodeExplorer from './services/CodeExplorer'
import Slack, { Attachment } from './services/Slack'

export const create = (): void => {
  const costexplorer = new CodeExplorer()

  costexplorer.getCostAndUsage(function (err, data) {
    if (err || data.ResultsByTime === undefined) {
      console.log(err, err.stack)
      return
    }

    const attachments = [
      {
        fields: (() => {
          const result: Attachment['fields'] = []

          data.ResultsByTime.forEach((item) => {
            if (item.Groups == undefined) {
              return
            }

            item.Groups.forEach((group) => {
              if (
                group.Keys === undefined ||
                group.Metrics?.UnblendedCost?.Amount === undefined ||
                group.Metrics.UnblendedCost.Amount === '0'
              ) {
                return
              }

              result.push({
                title: group.Keys[0],
                value: `$${group.Metrics.UnblendedCost.Amount}`,
                short: true,
              })
            })
          })

          return result
        })(),
      },
    ]

    const message = {
      username: 'AWS billing daily report',
      channel: '#aws-billing',
      text: `Daily report :money_with_wings:`,
      attachments,
    }

    const slack = new Slack(process.env.SLACK_WEBHOOK_URL as string, message)

    slack.sendMessage()
  })
}
