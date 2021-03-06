import defaultResolve, { DraftStatusBadge } from 'part:@sanity/base/document-badges'
import { WorkflowBadge } from './actions/workflow'

export default function resolveDocumentBadges(props) {
  const badges = defaultResolve(props)
  if (props.type === 'article') {
    return [...badges, WorkflowBadge]
  }
  return badges
}
