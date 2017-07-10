export default {

  namespace: 'tetris',

  state: {
    score: 0,
    record: 0,
    lines: 0,
    level: 1,
    mode: 'normal',
    status: 'init', // init, start, pause
    currentShape: {},
    nextShape: {},
    next: [],
    shapes: [
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
        ],
        center: { x: 1.5, y: 0 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 1 },
        ],
        center: { x: 1, y: 0 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ],
        center: { x: 1, y: 0 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ],
        center: { x: 1, y: 0 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ],
        center: { x: 1, y: 0 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 2, y: 1 },
        ],
        center: { x: 1, y: 0 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 0, y: 1 },
        ],
        center: { x: 1, y: 0 },
      },
    ],
    screen: [], // 10*20显示格子
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'clearScreen',
        payload: {}
      });
    },
  },

  effects: {
    *clearScreen({ payload }, { call, put }) {
      const initScreen = (row, column) => {
        const pixels = [];
        for (let i = 1; i <= row; i++) {
          const line = [];
          for (let j = 1; j <= column; j++) {
            line.push({
              filled: false,
              color: '',
              state: 0, // 0表示不能移动，1表示可以移动
              type: 0, // 0表示不可穿透，1表示可穿透
            });
          }
          pixels.push(line);
        }
        return pixels;
      };
      const screen = initScreen(20, 10);
      const next = initScreen(2, 4);
      yield put({
        type: 'updateScreen',
        payload: { screen, next },
      });
    },
    *startGame({ payload }, { call, put }) {
      const interval = null;

      yield put({
        type: 'changeStatus',
        payload: { status: 'start' },
      });
    },
    *createShape({ payload }, { select, call, put }) {
      let state = yield select(state => state.tetris);
      let next = [...state.next];
      const shapes = state.shapes;
      const index = Math.floor(Math.random() * shapes.length);
      const shape = JSON.parse(JSON.stringify(shapes[index]));

      shape.cells.forEach((item, index) => {
        next[item.y][item.x].filled = true;
      });

      yield put({
        type: 'pushShape',
        payload: shape,
      });
      yield put({
        type: 'pastShape',
        payload: shape,
      });
    },
    *pastShape({ payload }, { select, call, put }) {
      let state = yield select(state => state.tetris);
      const shape = state.currentShape;
      let screen = state.screen;

      if (shape.cells) {
        shape.cells.forEach((item, index) => {
          screen[item.y][item.x].filled = true;
          screen[item.y][item.x].state = 1;
        });
        yield put({
          type: 'updateScreen',
          payload: { screen },
        });
      }
    },
    *fixShape({ payload }, { select, call, put }) {
      let state = yield select(state => state.tetris);
      const shape = state.currentShape;
      let screen = state.screen;
      let touched = false;

      if (shape.cells) {
        touched = shape.cells.some((item, index) => {
          return item.y === 19 || (screen[item.y + 1][item.x].filled && screen[item.y + 1][item.x].state === 0);
        });

        if (touched) {
          shape.cells.forEach((item, index) => {
            screen[item.y][item.x].filled = true;
            screen[item.y][item.x].state = 0;
          });
          yield put({
            type: 'updateScreen',
            payload: { screen },
          });
          yield put({
            type: 'createShape',
            payload: {},
          });
        }
      }
    },
    *moveShape({ payload }, { select, call, put }) {
      const { move, rotate } = payload;
      const state = yield select(state => state.tetris);
      if (state.status !== 'start') {
        return;
      }
      let shape = {...state.currentShape};
      let screen = [...state.screen];
      const next = state.next;

      screen.forEach((line) => {
        line.forEach((cell) => {
          if (cell.state) {
            cell.filled = false;
          }
        });
      });

      const touchLeft = shape.cells.some(item => {
        return item.x === 0;
      });
      const touchRight = shape.cells.some(item => {
        return item.x === 9;
      });
      const touchBottom = shape.cells.some(item => {
        return item.y === 19;
      });

      if (move) {
        shape.center.x = shape.center.x + move.x;
        shape.center.y += move.y;
        shape.cells.forEach((item) => {
          item.x += (touchLeft && move.x < 0) || (touchRight && move.x > 0) ? 0 : move.x;
          item.y += touchBottom ? 0 : move.y;
        });
      }

      yield put({
        type: 'updateShape',
        payload: shape,
      });

      yield put({
        type: 'pastShape',
        payload: shape,
      });
      yield put({
        type: 'fixShape',
        payload: shape,
      });

    },

  },

  reducers: {
    changeStatus(state, action) {
      return { ...state, ...action.payload };
    },
    updateScreen(state, action) {
      return { ...state, ...action.payload };
    },
    pushShape(state, action) {
      return { ...state, currentShape: { ...state.nextShape }, nextShape: { ...action.payload } };
    },
    updateShape(state, action) {
      return { ...state, currentShape: { ...action.payload } };
    },
  },

};
