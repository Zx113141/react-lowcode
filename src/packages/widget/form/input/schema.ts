export const schema = {
    type: 'object',
    properties: {
      input: {
        type: 'string',
        title: '输入框',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          style: {
            width: 240,
          },
        },
      },
    },
  }