#!/bin/bash
# Claude Code PreToolUse hook: intercepts git commit/push and scans staged
# diff for secrets before Claude Code executes the command.
#
# Claude Code passes a JSON object on stdin describing the tool call:
#   { "tool_name": "Bash", "tool_input": { "command": "git commit -m ..." } }
#
# Exit 0 with no output → allow the command through.
# Exit 0 with JSON { "continue": false, "stopReason": "..." } → block it.

INPUT=$(cat)

# Use Node.js to safely parse the JSON (always available in this Playwright project)
CMD=$(echo "$INPUT" | node -e "
const c = [];
process.stdin.on('data', d => c.push(d));
process.stdin.on('end', () => {
  try {
    const j = JSON.parse(c.join(''));
    console.log((j.tool_input || {}).command || '');
  } catch (e) { console.log(''); }
});
" 2>/dev/null || echo "")

# Only intercept git commit or git push commands
if ! echo "$CMD" | grep -qE "git[[:space:]]+(commit|push)"; then
  exit 0
fi

STAGED=$(git diff --cached --unified=0 2>/dev/null | grep '^+[^+]' || true)
[ -z "$STAGED" ] && exit 0

FOUND=0
ISSUES=""

check() {
  local label="$1"
  local pattern="$2"
  if echo "$STAGED" | grep -qEi "$pattern"; then
    ISSUES="${ISSUES}${label}; "
    FOUND=1
  fi
}

check "AWS_ACCESS_KEY"       "AKIA[0-9A-Z]{16}"
check "ANTHROPIC_API_KEY"    "sk-ant-[a-zA-Z0-9_-]{80,}"
check "OPENAI_API_KEY"       "sk-[a-zA-Z0-9]{48,}"
check "GITHUB_TOKEN"         "ghp_[a-zA-Z0-9]{36}"
check "STRIPE_SECRET_KEY"    "sk_live_[a-zA-Z0-9]{24}"
check "GOOGLE_API_KEY"       "AIza[0-9A-Za-z_-]{35}"
check "api_key_assignment"   "api[_-]?key[[:space:]]*[=:][[:space:]]*['\"][^'\"[:space:]]{8,}"
check "SECRET_variable"      "(^|[[:space:]])[A-Z_]*SECRET[[:space:]]*[=:][[:space:]]*['\"][^'\"[:space:]]{8,}"
check "hardcoded_password"   "password[[:space:]]*[=:][[:space:]]*['\"][^'\"[:space:]]{6,}"
check "bearer_token"         "bearer[[:space:]]+[a-zA-Z0-9_.~-]{20,}"

if [ "$FOUND" -eq 1 ]; then
  printf '{"continue": false, "stopReason": "BLOCKED by security hook: Potential secrets in staged changes — %sRun: git diff --cached to review. Use git commit --no-verify only if confirmed false positive."}\n' "$ISSUES"
  exit 0
fi

exit 0
