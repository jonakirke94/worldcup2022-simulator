export function generateDocumentTitle(
  hasSimulatedGroups,
  hasSimulatedPlayoffs
) {
  if (!hasSimulatedGroups) {
    return "World Cup 2022";
  }

  if (hasSimulatedPlayoffs) {
    return "Playoff Results";
  }

  return "Group Results";
}
