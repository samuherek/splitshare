module.exports = {
  ext: 'tsx',
  icon: true,
  svgProps: {
    'aria-hidden': 'true',
    display: 'block',
    fill: 'currentColor',
    focusable: 'false',
    role: 'presentation',
  },
  template(
    { template },
    opts,
    { imports, componentName, props, jsx, exports }
  ) {
    const typeScriptTpl = template.smart({ plugins: ['typescript'] });
    return typeScriptTpl.ast`
    import * as React from 'react';
    const ${componentName} = (props: React.SVGProps<SVGSVGElement>) => ${jsx};
    export default ${componentName};
  `;
  },
};
