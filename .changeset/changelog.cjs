// Resolved from this repo. pnpm dlx would not put @changesets/changelog-github on that path.
const repoOf = (options) =>
  options && typeof options.repo === 'string' ? options.repo : 'metaory/pcall.js'

const thanks = async (repo, commit) => {
  const token = process.env.GITHUB_TOKEN
  if (!commit || !token) return ''
  const response = await fetch(`https://api.github.com/repos/${repo}/commits/${commit}`, {
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) return ''
  const body = await response.json()
  const login = body.author && body.author.login
  return login ? `Thanks [@${login}](https://github.com/${login})! ` : ''
}

const getReleaseLine = async (changeset, _type, options) => {
  const repo = repoOf(options)
  const [first, ...rest] = changeset.summary
    .trim()
    .split('\n')
    .map((line) => line.trimEnd())
  const commit = changeset.commit
  const link = commit
    ? `[\`${commit.slice(0, 7)}\`](https://github.com/${repo}/commit/${commit}) `
    : ''
  const more = rest.map((line) => `  ${line}`).join('\n')
  return `\n\n- ${link}${await thanks(repo, commit)}${first}${more ? `\n${more}` : ''}\n`
}

const getDependencyReleaseLine = async () => ''

module.exports = { getReleaseLine, getDependencyReleaseLine }
