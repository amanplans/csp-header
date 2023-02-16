import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ɵSharedStylesHost } from '@angular/platform-browser';

@Injectable()
export class CustomDomSharedStylesHost extends ɵSharedStylesHost implements OnDestroy {
  // Maps all registered host nodes to a list of style nodes that have been added to the host node.
  private _hostNodes = new Map<Node, Node[]>();
  private _nonce: string | null | undefined = null;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  constructor(@Inject(DOCUMENT) private _doc: any) {
    super();
    this._hostNodes.set(_doc.head, []);
    this._setCSPNonce();
  }

  private _setCSPNonce(): void {
    let scripts = this._doc.getElementsByTagName('style');
    for (let i = 0; i < scripts.length; i++) {
      const nonce = scripts[i].nonce;
      if (nonce !== undefined && nonce !== '') {
        this._nonce = nonce;
        // console.log('*** NONCE: ' + this._nonce);
        break;
      }
    };
  }

  override onStylesAdded(additions: Set<string>): void {
    this._hostNodes.forEach((styleNodes, hostNode) => this._addStylesToHost(additions, hostNode, styleNodes));
  }

  private _addStylesToHost(styles: Set<string>, host: Node, styleNodes: Node[]): void {
    styles.forEach((style: string) => {
      const styleEl = this._doc.createElement('style');
      styleEl.textContent = style;

      // console.log('*** _addStylesToHost - nonce: ' + this._nonce);
      if (!style.includes('without-nonce') && this._nonce) {
        styleEl.setAttribute('nonce', this._nonce);
      }

      styleNodes.push(host.appendChild(styleEl));
    });
  }

  addHost(hostNode: Node): void {
    const styleNodes: Node[] = [];
    this._hostNodes.set(hostNode, styleNodes);
  }

  removeHost(hostNode: Node): void {
    const styleNodes = this._hostNodes.get(hostNode);
    if (styleNodes) {
      styleNodes.forEach(this.removeStyle);
    }
    this._hostNodes.delete(hostNode);
  }

  ngOnDestroy(): void {
    this._hostNodes.forEach((styleNodes) => styleNodes.forEach(this.removeStyle));
  }

  private removeStyle(styleNode: Node): void {
    getDOM().remove(styleNode);
  }
}
