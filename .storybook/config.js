import { configure } from '@storybook/react';
const req = require.context('../src/storybook', true, /\.story\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);