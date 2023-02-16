// import { CustomDomSharedStylesHost } from './shared-styles-host';

// import createSpyObj = jasmine.createSpyObj;
// import Spy = jasmine.Spy;

// /* eslint-disable  @typescript-eslint/no-explicit-any */
// describe('CustomDomSharedStylesHost', () => {
//   let component: CustomDomSharedStylesHost;

//   const doc = createSpyObj('document', ['createElement'], ['head']);
//   const element = document.createElement('div');
//   const node = document.createElement('div');

//   beforeEach(() => {
//     (Object.getOwnPropertyDescriptor(doc, 'head')?.get as Spy<() => Node>).and.returnValue(node);
//     doc.createElement.and.returnValue(element);

//     component = new CustomDomSharedStylesHost(doc, 'meta[name="nonce"]');
//     (component as any)._nonce = 'r@nd0m';
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//     const map = new Map();
//     map.set(node, []);

//     expect((component as any)._hostNodes).toEqual(map);
//   });

//   it('should add styles to host', () => {
//     const styles = new Set<string>();
//     styles.add('inline styling');
//     const host = createSpyObj('host', ['appendChild']);
//     host.appendChild.and.returnValue('returned value');
//     const styleNodes = createSpyObj('styleNodes', ['push']);

//     (component as any)._addStylesToHost(styles, host, styleNodes);

//     expect(host.appendChild).toHaveBeenCalledWith(element);
//     expect(styleNodes.push).toHaveBeenCalledWith('returned value');
//     expect(element.innerText).toEqual('inline styling');
//     expect(element.getAttributeNames()).toEqual(['nonce']);
//     expect(element.getAttribute('nonce')).toEqual('r@nd0m');
//   });

//   it('should add Host', () => {
//     spyOn((component as any)._hostNodes, 'set');
//     component.addHost(node);
//     expect((component as any)._hostNodes.set).toHaveBeenCalledWith(node, []);
//   });

//   it('should remove host', () => {
//     spyOn((component as any), 'removeStyle');
//     spyOn((component as any)._hostNodes, 'get').and.returnValue([node]);
//     spyOn((component as any)._hostNodes, 'delete');

//     component.removeHost(node);

//     expect((component as any)._hostNodes.get).toHaveBeenCalled();
//     expect((component as any).removeStyle).toHaveBeenCalledWith(node, 0, [node]);
//     expect((component as any)._hostNodes.delete).toHaveBeenCalledWith(node);
//   });

//   it('should add styles', () => {
//     spyOn((component as any), '_addStylesToHost');
//     const additions = new Set<string>();
//     additions.add('style');

//     component.onStylesAdded(additions);

//     expect((component as any)._addStylesToHost).toHaveBeenCalledWith(additions, node, []);
//   });

//   it('should destroy', () => {
//     spyOn((component as any), 'removeStyle').and.callThrough();
//     const additions = new Set<string>();
//     additions.add('style');
//     component.onStylesAdded(additions);

//     component.ngOnDestroy();

//     expect((component as any).removeStyle).toHaveBeenCalledWith(element, 0, [element]);
//   });
// });
