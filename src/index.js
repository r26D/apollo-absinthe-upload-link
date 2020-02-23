import { ApolloLink } from 'apollo-link'
import { print } from 'graphql/language/printer'
import extractFiles from './extractFiles'
import { isObject } from './validators'


export const createUploadMiddleware = new ApolloLink((operation, forward) => {
  if (typeof FormData !== 'undefined' && isObject(operation.variables)) {
    const { variables, files } = extractFiles(operation.variables)
    console.log("*****************************************************************");
    console.log("Context is?,",context)
    if (files.length > 0) {
      const context = operation.getContext()
      const { headers: contextHeaders} = context
      const formData = new FormData()
      formData.append('operationName', print(operation.operationName))
      formData.append('query', print(operation.query))
      formData.append('variables', JSON.stringify(variables))
      files.forEach(({name, file}) => formData.append(name, file))
      console.log("FormData******", formData)

      // let options = {
      //   method: 'POST',
      //
      //   body: formData,
      //   credentials,
      // }
      //
      // // add context.fetchOptions to fetch options
      // options = Object.assign(context.fetchOptions || {}, options)

    }
  }
  return forward(operation)
})

export { ReactNativeFile } from './validators'
