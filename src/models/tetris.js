export default {

  namespace: 'tetris',

  state: {
    score: 0,
    record: 0,
    lines: 0,
    level: 1,
    mode: 'normal',
    cruuentShape: {},
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

      yield put({
        type: 'updateScreen',
        payload: { },
      });
    },
    *createShape({ payload }, { select, call, put }) {
      let state = yield select(state => state.tetris);
      const shapes = state.shapes;
      const index = Math.floor(Math.random() * shapes.length);
      const shape = shapes[index];

      yield put({
        type: 'pushShape',
        payload: shape,
      });
    },
  },

  reducers: {
    updateScreen(state, action) {
      return { ...state, ...action.payload };
    },
    pushShape(state, action) {
      return { ...state, currentShape: { ...state.nextShape }, nextShape: { ...action.payload } }
    }
  },

};
