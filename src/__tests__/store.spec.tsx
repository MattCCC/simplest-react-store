import { useEffect } from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  renderHook,
} from '@testing-library/react';
import { ValueOf, createStore, mergeState, set, useStoreProvider } from '../index';
import '@testing-library/jest-dom/extend-expect';

function renderWithStoreProvider(
  ui: React.ReactNode,
  store: import('../index').Store<any, any>
) {
  return render(<store.Provider>{ui}</store.Provider>);
}

describe('Store', () => {
  describe('createStore()', () => {
    it('Returns Provider, useStore and useStoreProp', () => {
      const store = createStore({ counter: 0 }, {});

      expect(store).toHaveProperty('Provider');
      expect(store).toHaveProperty('useStore');
      expect(store).toHaveProperty('useStoreProp');
    });

    it('returns previous state when mutation result is not an object', () => {
      const initialState = { count: 0 };
      const mutations = {
        increment: () => null,
      };

      const store = createStore(initialState, mutations);

      const Component = () => {
        const [{ count }, { increment }] = store.useStore();

        useEffect(() => {
          const mutationResult = increment();

          expect(typeof mutationResult).not.toBe('object');
        }, [increment]);
        return <div>{count}</div>;
      };

      const { container } = renderWithStoreProvider(<Component />, store);

      expect(container.firstChild).toMatchSnapshot('<div>0</div>');
    });
  });

  describe('Store Provider', () => {
    it('renders children', () => {
      const store = createStore({ counter: 0 }, {});

      const { container } = renderWithStoreProvider(<div>test</div>, store);

      expect(container.firstChild).toMatchSnapshot('<div>test</div>');
    });
  });

  describe('useStore()', () => {
    it('returns state', () => {
      const store = createStore({ message: 'Hello' }, {});

      const Component = () => {
        const [state] = store.useStore();
        return <div>{state.message}</div>;
      };

      const { container } = renderWithStoreProvider(<Component />, store);

      expect(container.firstChild).toMatchSnapshot('<div>Hello</div>');
    });

    it('returns actions', () => {
      const store = createStore(
        { count: 0 },
        { increment: (state) => ({ count: state.count + 1 }) }
      );
      const Component = () => {
        const [state, actions] = store.useStore();
        return (
          <button onClick={() => actions.increment()}>{state.count}</button>
        );
      };

      const { getByText } = renderWithStoreProvider(<Component />, store);
      const button = getByText('0');

      fireEvent.click(button);

      expect(button).toMatchSnapshot('<button>1</button>');
    });

    describe('useStoreProp()', () => {
      it('returns the correct state property and actions', () => {
        const initialState = { count: 0 };
        const store = createStore(initialState, {});
        const { result } = renderHook(() => store.useStoreProp('count'));
        expect(result.current[0]).toBe(initialState.count);
        expect(result.current[1]).toBeDefined();
      });
    });

    it('returns initial state without Provider', () => {
      const store = createStore({ message: 'Hi' }, {});
      const Component = () => {
        const [state] = store.useStore();
        return <div>{state.message}</div>;
      };

      const { container } = render(<Component />);

      expect(container.firstChild).toMatchSnapshot('<div>Hi</div>');
    });

    it('returns empty actions without Provider', () => {
      const mockAction = jest.fn();
      const store = createStore({}, { testAction: mockAction });
      const Component = () => {
        const [, actions] = store.useStore();
        return <button onClick={() => actions.testAction()}>action</button>;
      };

      const { getByText } = render(<Component />);

      fireEvent.click(getByText('action'));

      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe('useStoreProvider', () => {
    it('provides multiple stores', async () => {
      const storeA = createStore(
        { count: 0 },
        { increment: () => ({ count: 1 }) }
      );
      const storeB = createStore(
        { message: 'hello' },
        { update: () => ({ message: 'test' }) }
      );

      const ComponentA = () => {
        const [{ count }, { increment }] = storeA.useStore();
        useEffect(() => {
          increment();
        }, [increment]);
        return <div>{count}</div>;
      };

      const ComponentB = () => {
        const [{ message }, { update }] = storeB.useStore();
        useEffect(() => {
          update();
        }, [update]);
        return <div>{message}</div>;
      };

      const App = () => {
        const Provider = useStoreProvider(storeA, storeB);
        return (
          <Provider>
            <div>
              <ComponentA />
              <ComponentB />
            </div>
          </Provider>
        );
      };

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('test')).toBeInTheDocument();
      });
    });
  });

  describe('set', () => {
    it('returns a function that modifies the state correctly', () => {
      const initialState = { count: 0 };
      const setState = set('count');
      const newState = setState(initialState, 5);

      expect(newState.count).toBe(5);
    });
  });

  describe('mergeState', () => {
    it("merges state while preserving initial state's sub-objects", () => {
      const key = 'data';
      const initialState = {
        count: 0,
        data: {
          name: 'John',
          age: 25,
        },
      };
      const prevState = {
        count: 1,
        data: {
          name: 'Alice',
        },
      };
      const obj: Partial<ValueOf<typeof initialState>> = {
        age: 30,
      };

      const nextState = mergeState(key, initialState, prevState, obj);

      expect(nextState).toEqual({
        count: 1,
        data: {
          name: 'Alice',
          age: 30,
        },
      });
    });
  });
});
