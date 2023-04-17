export const barPropertySchema =  {
    type: 'object',
    properties: {
      collapse: {
        type: 'void',
        'x-decorator': 'FormItem',
        'x-component': 'FormCollapse',
        'x-component-props': {
          formCollapse: '{{formCollapse}}',
        },
        properties: {
          panel1: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: 'A1',
            },
            properties: {
              aaa: {
                type: 'string',
                title: 'AAA',
                'x-decorator': 'FormItem',
                required: true,
                'x-component': 'Input',
              },
            },
          },
          panel2: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: 'A2',
            },
            properties: {
              bbb: {
                type: 'string',
                title: 'BBB',
                'x-decorator': 'FormItem',
                required: true,
                'x-component': 'Input',
              },
            },
          },
          panel3: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: 'A3',
            },
            properties: {
              ccc: {
                type: 'string',
                title: 'CCC',
                'x-decorator': 'FormItem',
                required: true,
                'x-component': 'Input',
              },
            },
          },
        },
      },
    },
  }