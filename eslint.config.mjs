import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    languageOptions: { globals: globals.browser },
    settings: { react: { version: 'detect' } }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended
];

/*

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';


export default [
  {
    files: ['**m/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    files: ['reactapp/**m/*.{js,jsx}'],
    settings: {
      react: { version: 'detect' } // Automatically detect React version
    },
    plugins: {
      react: pluginReact // Use the plugin object in the "plugins" field
    },
    rules: {
      'react/display-name': ['error'] // Example of a rule you might need to set
    }
  },
  pluginJs.configs.recommended
];
*/
