export const barPropertySchema = {
  type: 'object',
  properties: {
    collapse: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'FormCollapse',
      'x-component-props': {
        formCollapse: '{{formCollapse}}',
        expandIconPosition: 'end',
        // forceRender:true
        // bordered:false
      },
      properties: {
        panel1: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: 'title/标题',
          },
          properties: {
            title: {
              type: 'string',
              title: '标题内容',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
              'x-component-props': {
                size: 'mini',
              }
            },
            textStyle: {
              type: 'string',
              title: '标题样式',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'ColorPick',
              'x-component-props': {
                size: 'mini',
              }
            },
            textAlign: {
              type: 'string',
              title: '标题位置',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
              'x-component-props': {
                size: 'mini',
              }
            },
            textBorder:{
              type: 'string',
              title: '标题边框',
              'x-decorator': 'FormItem',
              required: true,
              'x-component': 'Input',
              'x-component-props': {
                size: 'mini',
              }
            }

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
              'x-component-props': {
                size: 'small',
              }
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