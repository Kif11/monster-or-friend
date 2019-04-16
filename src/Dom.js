const Dom = {
  createElement: (tag, attrs, ...children) => {
    let element = document.createElement(tag);

    for (let name in attrs) {
      if (name && attrs.hasOwnProperty(name)) {
        let value = attrs[name];
        if (value === true) {
          element.setAttribute(name, "");
        } else if (value !== false && value != null) {
          element.setAttribute(name, value.toString());
        }
      }
    }

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      element.appendChild(
        child.nodeType == null ?
          document.createTextNode(child.toString()) : child);
    }

    return element;
  }
};

export default Dom;
