# Deployment Status Action

[![Build status][build-image]][build-url]
[![Build coverage][coverage-image]][coverage-url]

> GitHub Action for updating deployment statuses.

## Example

Update a deployment using GitHub Actions:

```yaml
name: Deploy
on: deployment
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Start deployment
        uses: timely-deploy/status-action@v1
        with:
          token: ${{ github.token }}
          state: "in_progress"
          deployment_id: ${{ github.event.deployment.id }}
      - name: Deploy
        ...
      - name: Mark deployment as success
        if: success()
        uses: timely-deploy/status-action@v1
        with:
          token: ${{ github.token }}
          state: "success"
          deployment_id: ${{ github.event.deployment.id }}
      - name: Mark deployment as failure
        if: failure()
        uses: timely-deploy/status-action@v1
        with:
          token: ${{ github.token }}
          state: "failure"
          deployment_id: ${{ github.event.deployment.id }}

```

See [deploy.yml](.github/workflows/deploy.yml) for example deployment statuses using GitHub Actions.

## License

MIT

[build-image]: https://img.shields.io/github/workflow/status/timely-deploy/action/CI/main
[build-url]: https://github.com/timely-deploy/action/actions/workflows/ci.yml?query=branch%3Amain
[coverage-image]: https://img.shields.io/codecov/c/gh/timely-deploy/action
[coverage-url]: https://codecov.io/gh/timely-deploy/action
