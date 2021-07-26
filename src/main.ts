import * as core from '@actions/core'
import {getOctokit, context} from '@actions/github'
import type {PullRequestOpenedEvent} from '@octokit/webhooks-types'

import {getInputParams, isSupportedEvent, wait} from './utils'

async function run(): Promise<void> {
  const {eventName, action} = context
  const {owner, repo} = context.repo
  const {token} = getInputParams()
  const octokit = getOctokit(token, {userAgent: 'dylanferguson/lgtm-action@v1'})

  if (!isSupportedEvent(eventName, action)) {
    core.warning(`Event not supported: ${eventName}, action: ${action}`)
    return
  }

  const event = context.payload.pull_request as PullRequestOpenedEvent

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

  // introduce a slight delay to guarantee approval occurs before merge
  await wait(2000)

  await octokit.rest.pulls.merge({
    owner,
    repo,
    pull_number: event.number
  })
}

run().catch(err => {
  console.error(err);
  core.setFailed(err.message)
})
