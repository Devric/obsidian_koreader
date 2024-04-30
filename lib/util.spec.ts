import { normalizeString, getFormattedDate, formatDate } from './util';

describe('normalizeString', () => {
  it('should normalize a string with symbols and spaces', () => {
    const str = "This is a string with symbols and spaces!";
    const normalizedStr = normalizeString(str);
    expect(normalizedStr).toEqual("this_is_a_string_with_symbols_and_spaces");
  });
});

describe('getFormattedDate', () => {
  it('should return the current date in "yyyy_mm_dd" format', () => {
    // Mock the current date
    const mockDate = new Date('2022-01-01');
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const formattedDate = getFormattedDate();
    expect(formattedDate).toEqual("2022_01_01");

    // Restore the original Date object
    spy.mockRestore();
  });
});

describe('formatDate', () => {
  it('should format a given date in "yyyy-mm-dd" format', () => {
    const date = new Date('2022-01-01');
    const formattedDate = formatDate(date);
    expect(formattedDate).toEqual("2022-01-01");
  });
});

