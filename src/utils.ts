import {getInput} from '@actions/core'

type InputParameters = {
  /** GH token */
  token: string
}

export function getInputParams(): InputParameters {
  return {
    token: getInput('token')
  }
}

export function isSupportedEvent(event: string, action: string): boolean {
  return event === 'pull_request' && action === 'opened'
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
