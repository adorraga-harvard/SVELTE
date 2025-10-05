export const BreadCrumbsSettings = {
  variant: {
    type: 'select',
    label: 'Color Mode',
    description: 'Choose how breadcrumb colors are applied: "Cycle" cycles through colors, "Fixed" uses specific colors, "Mono" uses a single color.',
    options: ['cycle', 'fixed', 'mono'],
    default: 'cycle'
  },
  colors: {
    type: 'list',
    label: 'Color Palette',
    description: 'List of colors for breadcrumbs. Separate multiple colors with commas. Example: "blue,green,red"',
    default: ['blue', 'green', 'red']
  },
  clickableLast: {
    type: 'boolean',
    label: 'Make Last Crumb Clickable',
    description: 'If enabled, the last breadcrumb (usually current page) is clickable.'
  },
  emphasizeLast: {
    type: 'boolean',
    label: 'Highlight Last Crumb',
    description: 'If enabled, the last breadcrumb will be bold and larger for emphasis.'
  }
};
