export const tabsSchema = {
    type: 'object',
    properties: {
      collapse: {
        type: 'void',
        'x-component': 'FormTab',
        'x-component-props': {
          formTab: '{{formTab}}',
        },
        properties: {
          tab1: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: 'A1',
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
          tab2: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: 'A2',
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
          tab3: {
            type: 'void',
            'x-component': 'FormTab.TabPane',
            'x-component-props': {
              tab: 'A3',
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
  