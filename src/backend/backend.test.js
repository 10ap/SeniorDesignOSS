import { extractHostname } from './utils';
import { Tab } from './tabs/tabs';
import { TabsRepository } from './tabs/tabRepository';

const browserMock = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
};

global.browser = browserMock;

describe('Backend Tests', () => {
});

describe('Backend Tests', () => {
  test('extractHostname should extract the correct hostname', () => {
    expect(extractHostname('https://www.example.com/path')).toBe('www.example.com');
    expect(extractHostname('http://example.com')).toBe('example.com');
    expect(extractHostname('file:///path/to/file')).toBe('file:///path/to/file');
  });

  test('Tab class should initialize and update correctly', () => {
    const tab = new Tab();
    tab.init('https://www.example.com');
    expect(tab.url).toBe('https://www.example.com');
    expect(tab.counter).toBe(0);
    tab.incCounter();
    expect(tab.counter).toBe(1);
    tab.setFavicon('https://www.example.com/favicon.ico');
    expect(tab.favicon).toBe('https://www.example.com/favicon.ico');
  });

  test('TabsRepository should add, get, and remove tabs correctly', async () => {
    const repo = new TabsRepository();
    const tab1 = await repo.addTab('https://www.example1.com');
    const tab2 = await repo.addTab('https://www.example2.com');
    expect(repo.getTabs().length).toBe(2);
    expect(repo.getTab('https://www.example1.com')).toEqual(tab1);
    expect(repo.getTab('https://www.example2.com')).toEqual(tab2);
    await repo.removeAllTabs();
    expect(repo.getTabs().length).toBe(0);
  });
});

