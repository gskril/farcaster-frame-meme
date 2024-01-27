import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs'

const client = getSSLHubRpcClient('nemes.farcaster.xyz:2283')

export async function validateMessage(messageBytes: string) {
  const hubMessage = Message.decode(Buffer.from(messageBytes, 'hex'))
  const res = await client.validateMessage(hubMessage)

  if (res.isOk() && res.value.valid) {
    return res.value.valid
  }
}
