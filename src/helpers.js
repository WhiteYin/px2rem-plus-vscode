import { window, workspace } from 'vscode';
import fs from 'fs';
import path from 'path';

let config = {};
let localizationMessages = {};
let defaultMessages = {};

const pxReg = /[+-]?([0-9]*[.])?[0-9]+px/g;

export default {
  getRem(str, unitText = 'rem') {
    const options = this.options;
    const base = this.base;
    const num = parseFloat(str);

    if (Math.abs(num) <= 1) {
      return false;
    }

    const rem = Number((num / base).toFixed(options.precision));
    let remStr = String(rem);

    if (options.leadingZero === false) {
      if (rem < 1) {
        remStr = remStr.replace(/^([-+])?0+/, '$1');
      }
    }

    return `${remStr}${unitText}` + (options.comments ? ` /* ${num}/${base} */` : '');
  },

  getPx(str) {
    const options = this.options;
    const base = this.base;
    const num = parseFloat(str);

    const px = Number((num * base).toFixed(options.precision));
    let pxStr = String(px);

    if (options.leadingZero === false) {
      if (px < 1) {
        pxStr = pxStr.replace(/^([-+])?0+/, '$1');
      }
    }

    return `${pxStr}px` + (options.comments ? ` /* ${num}*${base} */` : '');
  },

  convert(text) {
    if (!text) {
      return text;
    }

    return text.replace(pxReg, (px) => {
      const str = this.getRem(px);

      if (str === false) {
        return px;
      }

      return str;
    });
  },

  get options() {
    return workspace.getConfiguration('px2rem-plus');
  },

  get base() {
    const options = this.options;
    const editor = window.activeTextEditor;

    let base = options.base;

    if (editor && !editor.document.isUntitled) {
      const path = editor.document.fileName;

      if (path && config[path] && config[path].base) {
        base = config[path].base;
      }
    }

    return base;
  },

  set base(str) {
    const base = parseFloat(str);
    const editor = window.activeTextEditor;

    if (editor && !editor.document.isUntitled) {
      const path = editor.document.fileName;

      if (path) {
        if (isNaN(base)) {
          delete config[path];
        }
        else {
          config[path] = {
            base: base
          };
        }
      }
    }
  },

  set config(obj) {
    config = obj || {};
  },

  get config() {
    return config;
  },

  get isTwoWay() {
    const options = this.options;

    return options.twoWayConversion;
  },

  get isUseVwVh() {
    const options = this.options;

    return options.useVwAndVh;
  },

  initLocalization(rootPath) {
    const locale = JSON.parse(process.env.VSCODE_NLS_CONFIG)['locale'].toLowerCase();
    const prefix = path.join(rootPath, 'package.nls');

    defaultMessages = JSON.parse(fs.readFileSync(prefix + '.json', 'utf8'));

    if (fs.existsSync(prefix + '.' + locale + '.json')) {
      localizationMessages = JSON.parse(fs.readFileSync(prefix + '.' + locale + '.json', 'utf8'));
    }
  },

  localize(key) {
    return localizationMessages[key] ? localizationMessages[key] : defaultMessages[key];
  }
};
