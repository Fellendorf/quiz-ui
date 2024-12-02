import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { getSpyObject } from '../../test/getSpyObject';
import { LOCAL_STORAGE } from '../shared/customTokens';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    localStorageSpy = getSpyObject(Storage);
    TestBed.configureTestingModule({
      providers: [
        LocalStorageService,
        { provide: LOCAL_STORAGE, useValue: localStorageSpy },
      ],
    });
    service = TestBed.inject(LocalStorageService);
  });

  it('The method "setData()" should store stringified data in the storage', () => {
    const key = 'test-key';
    const data = {
      test_key: 'test-value',
    };
    service.setData(key, data);

    expect(localStorageSpy.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(data),
    );
  });

  it('The method "getData()" should return parsed data from the storage', () => {
    const key = 'test-key';
    const data = {
      test_key: 'test-value',
    };
    localStorageSpy.getItem.withArgs(key).and.returnValue(JSON.stringify(data));

    expect(service.getData(key)).toEqual(data);
    expect(localStorageSpy.getItem).toHaveBeenCalledWith(key);
  });

  it('The method "getData()" should return null if data is not found in the storage', () => {
    const key = 'test-key';
    localStorageSpy.getItem.withArgs(key).and.returnValue(null);

    expect(service.getData(key)).toBe(null);
    expect(localStorageSpy.getItem).toHaveBeenCalledWith(key);
  });

  it('The method "removeData()" should remove data from the storage', () => {
    const key = 'test-key';
    service.removeData(key);

    expect(localStorageSpy.removeItem).toHaveBeenCalledWith(key);
  });

  it('The method "clearAll()" should remove all data from the storage', () => {
    service.clearAll();

    expect(localStorageSpy.clear).toHaveBeenCalled();
  });
});
