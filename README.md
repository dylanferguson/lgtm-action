# LGTM Action

An action that automatically reviews, approves and merges pull requests, whilst leaving a reassuring 'LGTM!', all within seconds of opening a PR. Unleash your velocity and ship faster with an automated pull request approval workflow, unencumbered by tedious code reviews.

## Usage

```yaml
name: PR LGTM
on:
  pull_request:
    types: [opened]
jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - uses: dylanferguson/lgtm-action@v1
```
