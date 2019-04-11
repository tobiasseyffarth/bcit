/*
module.exports = {
  getNodes,
  getSequences,
  getElementById,
  getMetadata,
  removeITProps,
  updateITProps,
  isUniqueProp
};
*/

// final
function getNodes(infra) {
  const result = [];
  for (let i = 0; i < infra.length; i++) {
    if (infra[i].type === 'node') {
      result.push(infra[i]);
    }
  }
  return result;
}

// final
function getSequences(infra) {
  const result = [];
  for (let i = 0; i < infra.length; i++) {
    if (infra[i].type === 'sequence') {
      result.push(infra[i]);
    }
  }
  return result;
}

// final
function getElementById(infra, id) {
  let element = null;

  for (let i = 0; i < infra.length; i++) {
    if (infra[i].id === id) {
      element = infra[i];
      break;
    }
  }

  return element;
}

// final
export function getMetadata(infra) {
  let metadata = null;

  for (let i = 0; i < infra.length; i++) {
    if (infra[i].type === 'metadata') {
      metadata = infra[i];
      break;
    }
  }

  return metadata;
}

// final
function removeITProps(element, index) {
  const { props } = element;
  props.splice(index, 1);
}

// final
function updateITProps(element, property) {
  const { requirement } = property;
  const { props } = element;
  let updateProps = true;
  const name = 'compliance';

  if (requirement != null) {
    for (let i = 0; i < props.length; i++) {
      if (props[i].name === name && props[i].value === requirement.id) {
        updateProps = false;
        break;
      }
    }

    if (updateProps) { // avoid to insert a duplicate
      props.push({ name, value: requirement.id });
    }
    return updateProps;
  }
  return false;
}

function isUniqueProp(element, property){
  const { requirement } = property;
  const { props } = element;
  let updateProps = true;
  const name = 'compliance';

  if (requirement != null) {
    for (let i = 0; i < props.length; i++) {
      if (props[i].name === name && props[i].value === requirement.id) {
        updateProps = false;
        break;
      }
    }
    return updateProps;
  }
  return false;
}
