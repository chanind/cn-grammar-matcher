const { isRoot } = require('./tokenFilters');
const { locFromToken, combineAdjacentLocs } = require('./matchingHelpers');

class Node {
  constructor(opts, edges = null) {
    this.opts = opts;
    this.edges = edges;
  }

  matches(token) {
    if (isRoot(token)) return false;
    const { filter } = this.opts;
    if (filter && !filter(token)) return false;
    if (this.edges) {
      for (const edge of this.edges) {
        if (!edge.opts.optional && !edge.matches(token)) return false;
      }
    }
    return true;
  }

  getMatchLocs(token) {
    if (!this.matches(token)) return null;
    let matchLocs = [];
    if (this.opts.capture) {
      const captureChars = this.opts.capture === true ? null : this.opts.capture;
      matchLocs.push(locFromToken(token, captureChars));
    }
    if (this.edges) {
      for (const edge of this.edges) {
        const edgeMatchLocs = edge.getMatchLocs(token);
        if (edgeMatchLocs) {
          matchLocs = matchLocs.concat(edgeMatchLocs);
        }
      }
    }
    return matchLocs;
  }
}

class Edge {
  constructor(opts, childNode) {
    this.opts = opts;
    if (opts.type) this.opts.type = new RegExp(`^(${opts.type})$`);
    this.childNode = childNode;
  }

  _matchesDependent(token, dependent) {
    if (dependent.dependencyType === 'ROOT') return false;
    const typeMatches = !this.opts.type || dependent.dependencyType.match(this.opts.type);
    const aheadMatches = !this.opts.ahead || token.index > dependent.index;
    const behindMatches = !this.opts.behind || token.index < dependent.index;
    return (
      typeMatches && aheadMatches && behindMatches && this.childNode.matches(dependent)
    );
  }

  matches(token) {
    for (const dependent of token.dependents) {
      if (this._matchesDependent(token, dependent)) return true;
    }
    return false;
  }

  getMatchLocs(token) {
    for (const dependent of token.dependents) {
      if (this._matchesDependent(token, dependent)) {
        return this.childNode.getMatchLocs(dependent);
      }
    }
    return null;
  }
}

const recursiveSearchTree = (tokenTree, matchTree) => {
  let matchLocs = [];
  if (matchTree.matches(tokenTree)) {
    matchLocs.push(combineAdjacentLocs(matchTree.getMatchLocs(tokenTree)));
  }
  for (const dependentTree of tokenTree.dependents) {
    const depMatchLocs = recursiveSearchTree(dependentTree, matchTree);
    if (depMatchLocs) {
      matchLocs = matchLocs.concat(depMatchLocs);
    }
  }
  return matchLocs.length === 0 ? null : matchLocs;
};

const graphMatch = (tokens, matchTree) => {
  const tokenTree = tokens[0]; // tokens[0] is the root node
  return recursiveSearchTree(tokenTree, matchTree);
};

module.exports = {
  Node,
  Edge,
  graphMatch,
};
