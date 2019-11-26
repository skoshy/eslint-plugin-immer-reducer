const ERROR_MSG_NO_DEFAULT_VALUE =
  "Default-value parameters on methods are not allowed in ImmerReducer classes";

const ERROR_MSG_NO_OPTIONAL =
  "Optional parameters on methods are not allowed in ImmerReducer classes";

const getClassBody = node => {
  const classBody = node.body && node.body.body ? node.body.body : null;

  if (
    node.superClass &&
    node.superClass.name === "ImmerReducer" &&
    classBody &&
    classBody.length > 0
  ) {
    return classBody;
  }

  return null;
};

const getMethodsFromClassBody = classBody => {
  return classBody.filter(
    bodyEntry => bodyEntry.type === "MethodDefinition" && bodyEntry.value
  );
};

const getParamsFromMethod = method => {
  if (!method || !method.value || !method.value.params) return null;

  return method.value.params;
};

module.exports = {
  configs: {
    recommended: {
      plugins: ["immer-reducer"],
      rules: {
        "immer-reducer/no-optional-or-default-value-params": 1
      }
    }
  },
  rules: {
    "no-optional-or-default-value-params": {
      create(context) {
        return {
          ClassDeclaration(node) {
            const classBody = getClassBody(node);
            if (!classBody) return;

            const methods = getMethodsFromClassBody(classBody);
            if (!methods) return;

            methods.forEach(method => {
              const methodParams = getParamsFromMethod(method);
              if (!methodParams) return;

              methodParams.forEach(param => {
                if (param.type === "AssignmentPattern") {
                  context.report({
                    node: param,
                    message: ERROR_MSG_NO_DEFAULT_VALUE
                  });
                }
                if (param.optional) {
                  context.report({
                    node: param,
                    message: ERROR_MSG_NO_OPTIONAL
                  });
                }
              });
            });
          }
        };
      }
    }
  }
};
