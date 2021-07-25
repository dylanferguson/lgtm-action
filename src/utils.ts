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
