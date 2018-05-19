import { CategoryDataSource } from './category-data-source';

describe('CategoryDataSource', () => {
  it('should create an instance', () => {
    expect(new CategoryDataSource(null)).toBeTruthy(); // needs service
  });
});
