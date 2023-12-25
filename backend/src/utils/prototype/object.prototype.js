function excludeProperties(obj, properties) {
    /* 
      exclude properties from object
      @params [Object] obj - using this we can call directly this function - 
      @params [Array] properties  
      @return [Object] newObject // shallow copy
    */
    if (!properties || !Array.isArray(properties)) return obj;
    const newObject = { ...obj }; // shallow copy
    properties.forEach(property => {
        delete newObject[property];
    });
    return newObject;
}

function initializeObjectPrototype() {
    Object.prototype.excludeProperties = function (properties) {
        return excludeProperties(this, properties);
    };
}

module.exports =   { initializeObjectPrototype };