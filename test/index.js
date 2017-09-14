import test from 'ava';
import fs from 'fs-extra';
import path from 'path';

import templateDir from '../lib';

test.before(() => {
  const cwd = process.cwd();
  const destinationFixtures1 = path.join(cwd, 'test', 'fixtures', 'destination1');

  fs.mkdirSync(destinationFixtures1);
});

test.after.always(() => {
  const cwd = process.cwd();
  const destinationFixtures1 = path.join(cwd, 'test', 'fixtures', 'destination1');
  const destinationFixtures2 = path.join(cwd, 'test', 'fixtures', 'destination2');

  fs.removeSync(destinationFixtures1);
  fs.removeSync(destinationFixtures2);
});

test('TEMPLATE DIR | recursively', (t) => {
  const cwd = process.cwd();
  const source = path.join(cwd, 'test', 'fixtures', 'source');
  const destination = path.join(cwd, 'test', 'fixtures', 'destination1');
  const onlyFiles = false;
  const data = {
    name: 'Lukas',
    age: '25',
  };

  templateDir(source, destination, onlyFiles, data);

  const valueDestinationDir = fs.readdirSync(destination);
  const expectedDestinationDir = [
    'dir-1',
    'dir-2',
    'template-1',
  ];

  const valueDestinationDirDir1 = fs.readdirSync(path.join(destination, 'dir-1'));
  const expectedDestinationDirDir1 = [
    'file-1',
  ];

  const valueDestinationDirDir2 = fs.readdirSync(path.join(destination, 'dir-2'));
  const expectedDestinationDirDir2 = [
    'file-2',
  ];

  const valueTemplate1 = fs.readFileSync(path.join(destination, 'template-1'), 'utf-8');
  const expectedTemplate1 = 'My name id Lukas and I am 25 years old.\n';

  t.deepEqual(valueDestinationDir, expectedDestinationDir);
  t.deepEqual(valueDestinationDirDir1, expectedDestinationDirDir1);
  t.deepEqual(valueDestinationDirDir2, expectedDestinationDirDir2);
  t.is(valueTemplate1, expectedTemplate1);
});

test('TEMPLATE DIR | files only', (t) => {
  const source = path.join('test', 'fixtures', 'source');
  const destination = path.join('test', 'fixtures', 'destination2');
  const onlyFiles = true;
  const data = {
    name: 'Lukas',
    age: '25',
  };

  templateDir(source, destination, onlyFiles, data);

  const valueDestinationDir = fs.readdirSync(destination);
  const expectedDestinationDir = [
    'template-1',
  ];

  const valueTemplate1 = fs.readFileSync(path.join(destination, 'template-1'), 'utf-8');
  const expectedTemplate1 = 'My name id Lukas and I am 25 years old.\n';

  t.deepEqual(valueDestinationDir, expectedDestinationDir);
  t.is(valueTemplate1, expectedTemplate1);
});

test('TEMPLATE DIR | throws', (t) => {
  const cwd = process.cwd();
  const wrongSource = path.join(cwd, 'test', 'fixtures', 'sourc');
  const destination = path.join(cwd, 'test', 'fixtures', 'dest');

  t.throws(() => templateDir(wrongSource, destination, false, {}));
});

test.serial('TEMPLATE DIR | recursively with default values', async (t) => {
  const cwd = process.cwd();
  const source = path.join(cwd, 'test', 'fixtures', 'source');
  const destination = path.join(source, 'destination');

  await process.chdir(source);

  templateDir();

  const valueDestinationDir = fs.readdirSync(destination);
  const expectedDestinationDir = [
    'dir-1',
    'dir-2',
    'template-1',
  ];

  const valueDestinationDirDir1 = fs.readdirSync(path.join(destination, 'dir-1'));
  const expectedDestinationDirDir1 = [
    'file-1',
  ];

  const valueDestinationDirDir2 = fs.readdirSync(path.join(destination, 'dir-2'));
  const expectedDestinationDirDir2 = [
    'file-2',
  ];

  const valueTemplate1 = fs.readFileSync(path.join(destination, 'template-1'), 'utf-8');
  const expectedTemplate1 = 'My name id  and I am  years old.\n';

  t.deepEqual(valueDestinationDir, expectedDestinationDir);
  t.deepEqual(valueDestinationDirDir1, expectedDestinationDirDir1);
  t.deepEqual(valueDestinationDirDir2, expectedDestinationDirDir2);
  t.is(valueTemplate1, expectedTemplate1);

  fs.removeSync(path.join(destination));

  await process.chdir(cwd);
});
