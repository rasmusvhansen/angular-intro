import { EmphasizePipe } from './emphasize.pipe';

describe('Emphasize pipe', () => {
  let pipe: EmphasizePipe;
  beforeEach(() => {
    pipe = new EmphasizePipe();
  });

  it('should emphasize given word', () => {
    expect(pipe.transform('This is the word', 'the')).toBe('This is ***THE*** word');
  });

  it('should emphasize "rick" as default', () => {
    expect(pipe.transform('Morty and rick rules')).toBe('Morty and ***RICK*** rules');
  });

  it('should be case insensitive', () => {
    expect(pipe.transform('This is the word', 'tHe')).toBe('This is ***THE*** word');
  });
});
