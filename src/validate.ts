// Backend functions only
import { Message, getSSLHubRpcClient } from '@farcaster/hub-nodejs'

export async function validateMessage(messageBytes: string | undefined) {
  if (!messageBytes) return false

  const client = getSSLHubRpcClient('nemes.farcaster.xyz:2283')
  const hubMessage = Message.decode(Buffer.from(messageBytes, 'hex'))
  const res = await client.validateMessage(hubMessage)

  if (res.isOk() && res.value.valid) {
    return true
  } else {
    return false
  }
}
