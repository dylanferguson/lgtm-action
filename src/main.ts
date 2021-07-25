import core from '@actions/core'
import {getOctokit, context} from '@actions/github'
import type {PullRequestOpenedEvent} from '@octokit/webhooks-types'

import {getInputParams} from './utils'

async function run(): Promise<void> {
  const eventName = context.eventName
  const {owner, repo} = context.repo
  const event = context.payload.pull_request as PullRequestOpenedEvent
  const {token} = getInputParams()
  const octokit = getOctokit(token)

  if (eventName !== 'pull_request' && event.action !== 'opened') {
    core.warning(`Event not supported: ${eventName}, ${event.action}`)
    return
  }

  await octokit.rest.pulls.createReview({
    owner,
    repo,
    pull_number: event.number,
    event: 'APPROVE',
    body: 'LGTM!'
  })

  const {data: pullRequest} = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: event.number
  })

  if (!pullRequest.mergeable) {
    core.warning('Pull request cannot be merged')
    return
  }

  await octokit.rest.pulls.merge({
    owner,
    repo,
    pull_number: event.number
  })
}

run().catch(err => {
  core.setFailed(err.message)
})
