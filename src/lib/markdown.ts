import markdown from "remark-parse";
import { unified } from "unified";

import type { MarkdownNode } from "./types";

function cleanNode(node: MarkdownNode): MarkdownNode {
  delete node.position;

  if (node.value === undefined) {
    delete node.value;
  }
  if (node.tagName === undefined) {
    delete node.tagName;
  }
  if (node.data && typeof node.data === "object") {
    const data = node.data as Record<string, unknown>;
    delete data.hName;
    delete data.hChildren;
    delete data.hProperties;
  }

  if (node.children) {
    node.children.forEach(cleanNode);
  }

  return node;
}

export async function parseMarkdown(content: string): Promise<MarkdownNode> {
  const engine = unified().use(markdown);
  const ast = engine.parse(content);
  const processedAst = (await engine.run(ast)) as unknown as MarkdownNode;

  cleanNode(processedAst);
  return processedAst;
}
