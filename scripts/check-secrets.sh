#!/usr/bin/env bash
set -euo pipefail

pattern='(BEGIN (RSA |OPENSSH |EC |DSA |PRIVATE )?PRIVATE KEY|AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35}|ghp_[0-9A-Za-z]{36}|github_pat_[0-9A-Za-z_]{82}|sk-[A-Za-z0-9_-]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}|(api[_-]?key|secret|token|password|passwd|private[_-]?key|client_secret)[[:space:]]*[:=][[:space:]]*["'\'']?[^"'\''][[:space:]]{]{8,})'

if git grep -n -I -E "$pattern" -- \
  ':!package-lock.json' \
  ':!.gitignore' \
  ':!scripts/check-secrets.sh'
then
  echo
  echo "Potential secret detected. Remove it, rotate the value if it was real, and keep it out of git."
  exit 1
fi

echo "Secret scan passed."
