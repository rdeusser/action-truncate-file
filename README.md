<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# action-truncate-file

Github action for truncating a file based on size and/or characters. I guess the
body for Github releases can only be 125,000 characters and if you're generating
a changelog between two tags it can be higher than that. So this action will
truncate it for you.

## Usage

```yaml
      - name: Truncate changelog
        uses: rdeusser/action-truncate-file@v1
        with:
          file: CHANGELOG.md
          character_limit: 1234
          remove_last_line: true
```
