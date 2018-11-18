const DEFAUTLT_VALIDATORS = [
  {
    func: value => {
      const failed = value === undefined || value === ''
      return !failed
    },
    error: 'value should not be empty.'
  }
]

const config = {
  input: (name, validators) => ({
    name,
    onChange: {
      listenTo: 'onChange',
      valueExtractor: (...args) => {
        return args[0].target.value
      }
    },
    validators,
    onBlurValidation: true,
    validationTrigger: 'error',
    reversedTrigger: true
  }),
  select: (name, validators) => ({
    name, 
    onChange: {
      listenTo: 'onChange',
      valueExtractor: (...args) => {
        return args[1].value
      }
    },
    validators,
    validationTrigger: 'error',
    reversedTrigger: true
  })

}

export default (type, name, validators = DEFAUTLT_VALIDATORS) => {
  if (config[type] === undefined) {
    return new Error(`semanticConfig does not support ${type} type.`)
  }
  return config[type](name, validators)
}