const test = require('ava');
const urls = require('../../../site/_filters/urls');

test('getLocalizedPaths adds a locale to the url if none is present', t => {
  const path = '/someurl';
  const locales = ['en', 'pt', 'zn', 'de'];
  const actual = urls.getLocalizedPaths(path, locales);
  const expected = [
    ['/en/someurl', 'en'],
    ['/pt/someurl', 'pt'],
    ['/zn/someurl', 'zn'],
    ['/de/someurl', 'de'],
  ];
  t.deepEqual(actual, expected);
});

test('getLocalizedPaths replaces a locale in the url if one is present', t => {
  const path = '/en/someurl';
  const locales = ['en', 'pt', 'zn', 'de'];
  const actual = urls.getLocalizedPaths(path, locales);
  const expected = [
    ['/en/someurl', 'en'],
    ['/pt/someurl', 'pt'],
    ['/zn/someurl', 'zn'],
    ['/de/someurl', 'de'],
  ];
  t.deepEqual(actual, expected);
});

test('getLocalizedPaths ignores unsupported language in url', t => {
  const path = '/ja/someurl';
  const locales = ['en', 'pt', 'zn', 'de'];
  const actual = urls.getLocalizedPaths(path, locales);
  const expected = [
    ['/en/ja/someurl', 'en'],
    ['/pt/ja/someurl', 'pt'],
    ['/zn/ja/someurl', 'zn'],
    ['/de/ja/someurl', 'de'],
  ];
  t.deepEqual(actual, expected);
});

test('getLocalizedPaths supports paths deeper than 2', t => {
  const path = '/en/de/somePathPart/someurl';
  const locales = ['en', 'pt', 'zn', 'de'];
  const actual = urls.getLocalizedPaths(path, locales);
  const expected = [
    ['/en/de/somePathPart/someurl', 'en'],
    ['/pt/de/somePathPart/someurl', 'pt'],
    ['/zn/de/somePathPart/someurl', 'zn'],
    ['/de/de/somePathPart/someurl', 'de'],
  ];
  t.deepEqual(actual, expected);
});
