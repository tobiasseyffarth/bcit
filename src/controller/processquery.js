// final
function getElement(viewer, e) {
  return e.element;
}

export function getProcess(viewer, e) {
  if (e === null || e === undefined) {
    const elementRegistry = viewer.get('elementRegistry');
    const nodes = elementRegistry.getAll();
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].businessObject.$type === 'bpmn:Process') {
        return nodes[i].businessObject;
      }
    }
  } else {
    const elementRegistry = viewer.get('elementRegistry');
    const nodeElement = elementRegistry.get(e.element.id);
    const node = nodeElement.businessObject;
    return elementRegistry.get(node.$parent.id);
  }
}

// final
function getElementOfRegistry(viewer, id) {
  const elementRegistry = viewer.get('elementRegistry');
  const element = elementRegistry.get(id);

  return element.businessObject;
}

// final
function getFlowElementsOfProcess(process) {
  const flowElements = [];

  if (process.flowElements === undefined) {
    return null;
  }
  for (let i = 0; i < process.flowElements.length; i++) {
    flowElements.push(process.flowElements[i]);
  }

  return flowElements;
}

// final
function getFlowNodesOfProcess(process) {
  const flowElements = getFlowElementsOfProcess(process);
  const nodes = [];

  if (flowElements != null) {
    for (let i = 0; i < flowElements.length; i++) {
      if (!flowElements[i].$type.includes('SequenceFlow')) {
        nodes.push(flowElements[i]);
      }
    }
    return nodes;
  }
  return null;
}

// final
function getSequenceFlowsofProcess(process) {
  const flowElements = getFlowElementsOfProcess(process);
  const sequence = [];

  if (flowElements != null) {
    for (let i = 0; i < flowElements.length; i++) {
      if (flowElements[i].$type.includes('SequenceFlow')) {
        sequence.push(flowElements[i]);
      }
    }
    return sequence;
  }
  return null;
}

// final
function getFlowElementById(process, id) {
  const flowElements = getFlowElementsOfProcess(process);

  for (let i = 0; i < flowElements.length; i++) {
    if (flowElements[i].id === id) {
      return flowElements[i];
    }
  }
  return null;
}

// final
export function getFlowNodeByType(process, type) {
  const result = [];
  const nodes = getFlowNodesOfProcess(process);

  for (let i = 0; i < nodes.length; i++) {
    const _type = nodes[i].$type;
    if (_type === type) {
      result.push(nodes[i]);
    }
  }
  return result;
}

// final
export function getExtensionOfElement(element) {
  let extensionElements = [];
  const result = [];
  let _name;
  let _value;

  if (element.extensionElements !== undefined) {
    extensionElements = element.extensionElements.values;

    for (let i = 0; i < extensionElements.length; i++) {
      if (extensionElements[i].$children !== undefined) { // get camunda extension
        for (let j = 0; j < extensionElements[i].$children.length; j++) {
          _name = extensionElements[i].$children[j].name;
          _value = extensionElements[i].$children[j].value;
          result.push({_name, _value});
        }
      } else { // get own extension
        _name = extensionElements[i].name;
        _value = extensionElements[i].value;
        result.push({_name, _value});
      }
    }

    return result;
  }
}

function hasExtension(element, name, value) {
  const props = getExtensionOfElement(element);

  if (props !== undefined) {
    if (value === undefined) {
      for (let i = 0; i < props.length; i++) { // check if the element has an extension of name
        if (props[i]._name === name) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < props.length; i++) { // check if the node is a compliance process
        if (props[i]._name === name && props[i]._value === value) {
          return true;
        }
      }
    }
  }

  return false;
}

// final
export function isCompliance(element) {
  const name = 'isComplianceProcess';
  const value = 'true';

  return hasExtension(element, name, value);
}

// final
function hasExtensionName(element, name) {
  const props = getExtensionOfElement(element);
  for (let i = 0; i < props.length; i++) { // check if the element has an extension of name
    if (props[i].name === name) {
      return true;
    }
  }
  return false;
}


function isExtensionShape(shape) {
  const element = shape.businessObject;
  return hasExtension(element, 'flowelement');
}

// final
function isFlowElement(option) { // identify flowNodes
  const {element} = option;
  const {shape} = option;
  let {type} = null;

  if (element != null) {
    type = element.$type;
  }

  if (shape != null) {
    type = shape;
  }

  type = type.toLowerCase();
  return ((!type.includes('data')) && (!type.includes('sequence')));
}

// final
function isDataObject(option) { // identify Database or Document
  const {element} = option;
  const {shape} = option;
  let {type} = null;

  if (element != null) {
    type = element.$type;
  }

  if (shape != null) {
    type = shape;
  }

  type = type.toLowerCase();

  return (type.includes('data'));
}

function isDataStore(option) {
  const {element} = option;
  const {shape} = option;
  let {type} = null;

  if (element != null) {
    type = element.$type;
  }

  if (shape != null) {
    type = shape;
  }

  type = type.toLowerCase();

  return (type.includes('datastore'));
}

function isDataObjectRef(option) {
  const {element} = option;
  const {shape} = option;
  let type = null;

  if (element !== null) {
    type = element.$type;
  }

  if (shape != null) {
    type = shape;
  }

  type = type.toLowerCase();

  return (type.includes('dataobject'));
}

// final
function isUniqueExtension(viewer, element, extension) {
  if (element.extensionElements === undefined) {
    return true;
  }
  const ext = element.extensionElements.get('values');
  for (let i = 0; i < ext.length; i++) {
    if (ext[i].name === extension.name && ext[i].value === extension.value) {
      return false;
    }
  }

  return true;
}

// final
function getIdFromExtensionShape(shape) {
  const element = shape.businessObject;
  const shapeExtension = getExtensionOfElement(element);

  for (let i = 0; i < shapeExtension.length; i++) {
    const {name} = shapeExtension[i];
    const {value} = shapeExtension[i];
    if (name !== 'flowelement') {
      return value;
    }
  }
}

export function isTaskOrSubprocess(input) {
  let type = input.type;
  type = type.toLowerCase();
  return (type.includes('task') || type.includes('subprocess'));
}

// final
function getSucessors(flownode) {
  const result = [];

  if (flownode.outgoing !== undefined) {
    const {outgoing} = flownode;

    for (let i = 0; i < outgoing.length; i++) {
      result.push(outgoing[i].targetRef);
    }
    return result; // array of flownodes
  }
  return null;
}

// testen
function getPredecessors(flownode) {
  const result = [];

  if (flownode.incoming !== undefined) {
    const {incoming} = flownode;

    for (let i = 0; i < incoming.length; i++) {
      result.push(incoming[i].sourceRef);
    }
    return result;
  }
  return null;
}

// todo: testen mit Parallelitäten in Parallität und Exklusivität
function getParallelTrace(node, parallelTrace) {
  const sucs = getSucessors(node);

  if (parallelTrace === undefined) {
    const _parallelTrace = [];

    for (let i = 0; i < sucs.length; i++) {
      const sequence = [];
      _parallelTrace.push({status: 'open', sequence});
    }
    return getParallelTrace(node, _parallelTrace);
  }
  let finished = true;
  const _parallelTrace = [];

  for (let i = 0; i < parallelTrace.length; i++) {
    const _trace = parallelTrace[i];
    // console.log('trace', _trace);

    if (_trace.status === 'open') {
      finished = false;
      let _node;
      let suc;

      if (_trace.sequence.length === 0) {
        _node = node;
        suc = getSucessors(_node)[i];
      } else {
        _node = _trace.sequence[_trace.sequence.length - 1];
        suc = getSucessors(_node)[0];
      }

      if (suc.$type === 'bpmn:ParallelGateway') {
        if (getSucessors(node).length === getPredecessors(suc).length) {
          _trace.status = 'closed';
        } else {
          // let trace = getParallelTrace(_node);
        }
      } else if (_node.$type === 'bpmn:ExclusiveGateway') {
        // todo: weiter bauen
        console.log('test');
      } else {
        _trace.sequence.push(suc);
      }
    }
    _parallelTrace.push(_trace);
  }

  if (finished) {
    return parallelTrace;
  }
  return getParallelTrace(node, _parallelTrace);
}

// todo: testen
function searchTrace(openTraces, finalTraces, endNode) {
  const help = []; // openTraces
  const _finalTraces = finalTraces;

  for (let i = 0; i < openTraces.length; i++) {
    const openTrace = openTraces[i];
    const node = openTrace[openTrace.length - 1];
    const sucs = getSucessors(node);

    if ((node.$type === 'bpmn:ExclusiveGateway')) {
      for (let j = 0; j < sucs.length; j++) {
        const newTrace = [];
        Array.prototype.push.apply(newTrace, openTrace);
        newTrace.push(sucs[j]);
        help.push(newTrace);
      }
    } else if ((node.$type === 'bpmn:ParallelGateway')) {
      for (let j = 0; j < sucs.length; j++) {
        const parallelTrace = getParallelTrace(node);
        Array.prototype.push.apply(openTrace, parallelTrace);
      }

      const closingParallel = getSucessors(openTrace[openTrace.length - 1].sequence[0])[0];
      openTrace.push(closingParallel);
      const suc = getSucessors(closingParallel)[0];
      openTrace.push(suc);
      help.push(openTrace);
    } else if (node === endNode) {
      _finalTraces.push(openTrace);
    } else {
      for (let j = 0; j < sucs.length; j++) {
        openTrace.push(sucs[j]);
      }
      help.push(openTrace);
    }
  }

  if (help.length === 0) {
    return _finalTraces;
  }
  return searchTrace(help, _finalTraces, endNode);
}

// todo: testen
function getTraces(process) {
  const finalTraces = [];
  const openTraces = [];
  const trace = [];

  const startNode = getFlowNodeByType(process, 'bpmn:StartEvent')[0];
  const endNode = getFlowNodeByType(process, 'bpmn:EndEvent')[0];

  trace.push(startNode);
  openTraces.push(trace);

  return searchTrace(openTraces, finalTraces, endNode);
}

/*
module.exports = {
  getElement,
  getProcess,
  getElementOfRegistry,
  getFlowElementsOfProcess,
  getFlowNodesOfProcess,
  getSequenceFlowsofProcess,
  getFlowElementById,
  getExtensionOfElement,
  isCompliance,
  hasExtensionName,
  hasExtension,
  isUniqueExtension,
  isFlowElement,
  isDataObject,
  isExtensionShape,
  getIdFromExtensionShape,
  isDataObjectRef,
  isDataStore,
  isTaskOrSubprocess,
};

*/
