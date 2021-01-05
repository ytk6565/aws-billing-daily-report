import * as https from 'https'

interface Message {
  username: string
  channel: string
  text: string
  attachments: Attachment[]
}

export interface Attachment {
  fields: Field[]
}
interface Field {
  title: string
  value: string
  short: boolean
}

export default class Slack {
  _url: string
  _message: Message

  constructor(url: string, message: Message) {
    this._url = url
    this._message = message
  }

  sendMessage(): void {
    const data = JSON.stringify(this._message)
    const options = {
      port: 443,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    }
    const req = https.request(this._url, options, (res) => {
      console.log('status code : ' + res.statusCode)
      res.setEncoding('utf8')
      res.on('data', (d) => {
        console.log(d)
      })
    })

    req.on('error', (e) => {
      console.error(e)
    })

    req.write(data)
    req.end()
  }
}
