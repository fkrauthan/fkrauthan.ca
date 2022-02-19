import markdown from "remark-parse";
import { unified } from "unified";

function cleanNode(node) {
  delete node.position;

  if (node.value === undefined) {
    delete node.value;
  }
  if (node.tagName === undefined) {
    delete node.tagName;
  }
  if (node.data) {
    delete node.data.hName;
    delete node.data.hChildren;
    delete node.data.hProperties;
  }

  if (node.children) {
    node.children.forEach(cleanNode);
  }

  return node;
}

export async function parseMarkdown(content) {
  const engine = unified().use(markdown);
  const ast = engine.parse(content);
  const processedAst = await engine.run(ast);

  cleanNode(processedAst);
  return processedAst;
}
