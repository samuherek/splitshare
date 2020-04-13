export default function ownerDocument(node: HTMLElement | null) {
  return (node && node.ownerDocument) || document;
}
