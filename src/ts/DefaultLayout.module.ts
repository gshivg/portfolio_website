import windowsSizeChecker from './windowSizeChecker';

console.log('DefaultLayout.module.ts');

window.addEventListener('resize', () => {
  windowsSizeChecker();
});