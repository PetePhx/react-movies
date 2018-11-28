export function paginate(items, pageNum, pageSize) {
  const startIdx = (pageNum - 1) * pageSize;
  return items.slice(startIdx, startIdx + pageSize);
}
