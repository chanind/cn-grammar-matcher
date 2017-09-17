// Taken from https://github.com/dlsloan/MultiRegExp
// modified slightly to work with imports

module.exports = function MultiRegExp(par) {
  var regex;
  if (par.source !== undefined) {
    regex = par;
  } else {
    var exp = par;
    var opts = '';
    if (par.substring(0, 1) == '/') {
      var l = par.lastIndexOf('/');
      opts = par.substring(l + 1, par.length);
      exp = par.substring(1, l);
    }
    regex = new RegExp(exp, opts);
  }
  var expandSource = function(braces, indexer) {
    ret = '';
    for (var i = 0; i < braces.length; i++) {
      if (braces[i].type == 'raw') {
        ret += '(' + braces[i].text + ')';
        indexer.next();
      } else if (braces[i].type == 'brace' && braces[i].containsCapture) {
        ret += braces[i].pre + expandSource(braces[i].children, indexer) + braces[i].post;
      } else if (braces[i].type == 'brace' && !braces[i].isCapture) {
        ret +=
          '(' +
          braces[i].text.substring(
            braces[i].pre.length,
            braces[i].text.length - braces[i].post.length
          ) +
          ')';
        indexer.next();
      } else if (braces[i].type == 'brace') {
        ret += braces[i].text;
        indexer.next(true);
      } else {
        ret += braces[i].text;
      }
    }
    return ret;
  };

  var captureScan = function(braces, parent) {
    var containsCapture = false;
    for (var i = 0; i < braces.length; i++) {
      captureScan(braces[i].children, braces[i]);
      braces[i].isCapture = braces[i].text.indexOf('(?:') != 0;
      if (braces[i].isCapture) {
        containsCapture = true;
      }
      if (braces[i].isCapture && braces[i].containsCapture) {
        throw 'nested captures not permitted, use (?:...) where capture is not intended';
      }
    }
    if (parent) {
      parent.containsCapture = containsCapture;
    }
  };

  var fillGaps = function(braces, text) {
    var pre = /^\((\?.)?/.exec(text);
    pre = pre == null ? '' : pre[0];
    var post = /\)$/.exec(text);
    post = post == null ? '' : post[0];
    var i = 0;
    if (braces.length > 0) {
      fillGaps(braces[0].children, braces[0].text);
    }
    if (braces.length > 0 && braces[0].pos > pre.length) {
      braces.splice(0, 0, {
        type: 'raw',
        pos: pre.length,
        length: braces[0].pos,
        text: text.substring(pre.length, braces[0].pos),
      });
      i++;
    }
    for (i++; i < braces.length; i++) {
      fillGaps(braces[i].children, braces[i].text);
      if (braces[i].pos > braces[i - 1].pos + braces[i - 1].length) {
        braces.splice(i, 0, {
          type: 'raw',
          pos: braces[i - 1].pos + braces[i - 1].length,
          length: braces[i].pos - (braces[i - 1].pos + braces[i - 1].length),
          text: text.substring(braces[i - 1].pos + braces[i - 1].length, braces[i].pos),
        });
        i++;
      }
    }
    if (braces.length == 0) {
      braces.push({
        type: 'raw',
        pos: pre.length,
        length: text.length - post.length - pre.length,
        text: text.substring(pre.length, text.length - post.length),
      });
    } else if (
      braces[braces.length - 1].pos + braces[braces.length - 1].length <
      text.length - post.length
    ) {
      var pos = braces[braces.length - 1].pos + braces[braces.length - 1].length;
      var txt = text.substring(pos, text.length - post.length);
      braces.push({ type: 'raw', pos: pos, length: txt.length, text: txt });
    }
  };

  var GetBraces = function(text) {
    var ret = [];
    var shift = 0;
    do {
      var brace = GetBrace(text);
      if (brace == null) {
        break;
      } else {
        text = text.substring(brace.pos + brace.length);
        var del = brace.pos + brace.length;
        brace.pos += shift;
        shift += del;
        ret.push(brace);
      }
    } while (brace != null);
    return ret;
  };

  var GetBrace = function(text) {
    var ret = { pos: -1, length: 0, text: '', children: [], type: 'brace' };
    var openExp = /^(?:\\.|[^\)\\\(])*\(\?./;
    var pre = 3;
    var post = 1;
    var m = openExp.exec(text);
    if (m == null) {
      m = /^(?:\\.|[^\)\\\(])*\(/.exec(text);
      pre = 1;
    }
    if (m != null) {
      ret.pos = m[0].length - pre;
      ret.children = GetBraces(text.substring(m[0].length));
      for (var i = 0; i < ret.children.length; i++) {
        ret.children[i].pos += pre;
      }
      var closeExp = /^(?:\\.|[^\\\(\)])*\)/;
      var closeExpAlt = /^(?:\\.|[^\\\(\)])*\)\?/;
      var from =
        ret.children.length <= 0
          ? ret.pos + pre
          : ret.children[ret.children.length - 1].pos +
            ret.children[ret.children.length - 1].length +
            m[0].length -
            pre;
      var m2 = closeExp.exec(text.substring(from));
      var m3 = closeExpAlt.exec(text.substring(from));
      if (m3 !== null && m3.length - 1 <= m2.length) {
        m2 = m3;
        post = 2;
      }
      if (m2 == null) {
        return null;
      } else {
        ret.length = m2[0].length + from - ret.pos;
        ret.text = text.substring(ret.pos, ret.pos + ret.length);
      }
    }
    if (ret.text == '()' || /^\(\?.\)$/.test(ret.text)) {
      throw 'empty braces not permitted';
    }
    if (ret.pos != -1) {
      ret.pre = ret.text.substring(0, pre);
      ret.post = ret.text.substring(ret.text.length - post, ret.text.length);
    }
    return ret.pos == -1 ? null : ret;
  };

  var fixOrs = function(braces_W_raw) {
    var orFind = /^(\\.|[^\\|])*\|/;
    for (var i = 0; i < braces_W_raw.length; i++) {
      if (braces_W_raw[i].type == 'raw') {
        var fullText = braces_W_raw[i].text;
        var m = orFind.exec(fullText);
        if (m != null) {
          var or = {
            type: 'or',
            pos: m[0].length - 1 + braces_W_raw[i].pos,
            length: 1,
            text: '|',
          };
          var raw = {
            type: 'raw',
            pos: m[0].length + braces_W_raw[i].pos,
            length: fullText.length - m[0].length,
            text: fullText.substring(m[0].length, fullText.length),
          };
          braces_W_raw[i].text = fullText.substring(0, m[0].length - 1);
          braces_W_raw[i].length = braces_W_raw[i].text.length;
          braces_W_raw.splice(i + 1, 0, or, raw);
          i += 1;
        }
      } else if (braces_W_raw[i].type == 'brace') {
        fixOrs(braces_W_raw[i].children, braces_W_raw[i].text);
      }
    }
  };

  var source = regex.source;
  var braces = GetBraces(source);
  captureScan(braces);
  fillGaps(braces, source);
  fixOrs(braces);
  var indexer = {
    i: 1,
    next: function(realPoint) {
      if (realPoint) {
        this.points.push(this.i);
      }
      return this.i++;
    },
    points: [],
  };
  source = expandSource(braces, indexer);
  this.dataPoints = indexer.points;
  var options =
    (regex.ignoreCase ? 'i' : '') +
    (regex.global ? 'g' : '') +
    (regex.multiline ? 'm' : '');
  this.regex = new RegExp(source, options);
  this.exec = function(text) {
    var m = this.regex.exec(text);
    if (m == null) {
      return {};
    }
    var ret = {};
    var ch = 0;
    for (var i = 1; i < m.length; i++) {
      if (m[i] !== null && m[i] !== undefined) {
        var pos = this.dataPoints.indexOf(i);
        if (pos != -1) {
          ret[pos] = { index: ch, text: m[i] };
        }
        ch += m[i].length;
      }
    }
    for (var i = 0; i < this.dataPoints.length; i++) {
      if (ret[i] === undefined) {
        ret[i] = null;
      }
    }
    return ret;
  };
};
