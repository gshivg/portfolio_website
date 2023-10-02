import windowsSizeChecker from '../ts/windowSizeChecker';

console.log('DefaultLayout.module.ts');

window.addEventListener('resize', () => {
  windowsSizeChecker();
});