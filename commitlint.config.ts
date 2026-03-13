import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'body-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    'body-max-line-length': [RuleConfigSeverity.Error, 'always', 100],
    'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    'footer-max-line-length': [RuleConfigSeverity.Error, 'always', 100],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 100],
    'header-trim': [RuleConfigSeverity.Error, 'always'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'scope-empty': [RuleConfigSeverity.Error, 'never'],
    'scope-enum': [RuleConfigSeverity.Disabled],
  },
  plugins: [
    {
      rules: {
        'scope-nx-projects': (parsed, when, value) => {
          const scope = parsed.scope
          if (!scope) return [true, '']

          if (scope === '*') return [true, '']

          const scopes = scope.split(',').map((s) => s.trim())
          const invalid = scopes.filter((s) => !value?.includes(s))

          return [
            invalid.length === 0,
            `scope must be one or more of [${value?.join(', ')}], got invalid: ${invalid.join(', ')}`,
          ]
        },
      },
    },
  ],
  prompt: {},
}

export default (async () => {
  const nxScopes = await import('@commitlint/config-nx-scopes')
  const projects = nxScopes.default.utils.getProjects({})

  return {
    ...Configuration,
    rules: {
      ...Configuration.rules,
      'scope-nx-projects': [RuleConfigSeverity.Error, 'always', projects],
    },
  }
})()
