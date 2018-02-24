export default {

  namespace: 'tetris',

  state: {
    score: 0,
    record: 0,
    lines: 0,
    level: 1,
    mode: 'normal',
    status: 'init', // init, start, pause, clearing
    interval: null,
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
        center: { x: 2, y: 0 },
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
        center: { x: 0.5, y: 0.5 },
      },
      {
        cells: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ],
        center: { x: 1, y: 1 },
      },
      {
        cells: [
          { x: 2, y: 0 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 0, y: 1 },
        ],
        center: { x: 1, y: 1 },
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
        type: 'initGame',
        payload: null,
      });
    },
  },

  effects: {
    *initGame({ payload }, { select, call, put }) {
      let oldState = window.localStorage.getItem('state');
      if (payload) {
        const state = {
          score: 0,
          record: 0,
          lines: 0,
          level: 1,
          mode: 'normal',
          status: 'init', // init, start, pause, clearing
          interval: null,
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
              center: { x: 2, y: 0 },
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
              center: { x: 0.5, y: 0.5 },
            },
            {
              cells: [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 1 },
              ],
              center: { x: 1, y: 1 },
            },
            {
              cells: [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 0, y: 1 },
              ],
              center: { x: 1, y: 1 },
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
        };
        yield put({
          type: 'initState',
          payload: state,
        });
        yield put({
          type: 'saveState',
          payload: false,
        });
        yield put({
          type: 'clearScreen',
          payload: { screen: true, next: true },
        });
      } else if (oldState) {
        oldState = JSON.parse(oldState);
        yield put({
          type: 'initState',
          payload: oldState,
        });
        yield put({
          type: 'changeStatus',
          payload: { status: 'pause' },
        });
      } else {
        yield put({
          type: 'clearScreen',
          payload: { screen: true, next: true },
        });
      }
    },
    *clearScreen({ payload }, { select, call, put }) {
      const state = yield select(state => state.tetris);
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
      const screen = payload.screen ? initScreen(20, 10) : state.screen;
      const next = payload.next ? initScreen(2, 4) : state.next;
      yield put({
        type: 'updateScreen',
        payload: { screen, next },
      });
    },
    *startGame({ payload }, { select, call, put }) {
      const state = yield select(state => state.tetris);
    },
    *createShape({ payload }, { select, call, put }) {
      yield put({
        type: 'clearScreen',
        payload: { screen: false, next: true },
      });

      const state = yield select(state => state.tetris);
      const next = JSON.parse(JSON.stringify(state.next));
      const shapes = state.shapes;
      const index = Math.floor(Math.random() * shapes.length);
      // const index = 3;
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
      const state = yield select(state => state.tetris);
      const shape = state.currentShape;
      const nextShape = state.nextShape;
      const screen = JSON.parse(JSON.stringify(state.screen));
      const next = JSON.parse(JSON.stringify(state.next));

      if (shape.cells) {
        shape.cells.forEach((item) => {
          screen[item.y][item.x].filled = true;
          screen[item.y][item.x].state = 1;
        });
        nextShape.cells.forEach((item) => {
          next[item.y][item.x].filled = true;
          next[item.y][item.x].state = 1;
        });
        yield put({
          type: 'updateScreen',
          payload: { screen, next },
        });
      }
    },
    *moveShape({ payload }, { select, call, put }) {
      const { move, rotate } = payload;
      const state = yield select(state => state.tetris);
      if (state.status !== 'start') {
        return;
      }
      const shape = JSON.parse(JSON.stringify(state.currentShape));
      const screen = [...state.screen];
      const next = state.next;

      screen.forEach((line) => {
        line.forEach((cell) => {
          if (cell.state) {
            cell.filled = false;
          }
        });
      });

      if (move) {
        shape.center.x += move.x;
        shape.center.y += move.y;
        shape.cells.forEach((item) => {
          item.x += move.x;
          item.y += move.y;
        });
      } else if (rotate) {
        shape.cells.forEach((item) => {
          const x = item.x;
          const y = item.y;
          item.y = shape.center.y + ((x - shape.center.x) * rotate);
          item.x = shape.center.x - ((y - shape.center.y) * rotate);
        });
      }

      // if the new position is out of screen or already filled with blocks, then cancel this action
      const invalid = shape.cells.some((item) => {
        return item.x < 0 || item.x > 9 || item.y < 0 || item.y > 19 || screen[item.y][item.x].filled;
      });
      if (invalid) {
        return;
      }

      yield put({
        type: 'updateShape',
        payload: shape,
      });

      yield put({
        type: 'pastShape',
        payload: shape,
      });
    },
    *fixShape({ payload }, { select, call, put }) {
      const state = yield select(state => state.tetris);
      if (state.status !== 'start') {
        return;
      }
      const shape = state.currentShape;
      const screen = JSON.parse(JSON.stringify(state.screen));
      let touched = false;

      if (shape.cells) {
        touched = shape.cells.some((item) => {
          return item.y === 19 || (screen[item.y + 1][item.x].filled && screen[item.y + 1][item.x].state === 0);
        });

        if (touched) {
          shape.cells.forEach((item) => {
            screen[item.y][item.x].filled = true;
            screen[item.y][item.x].state = 0;
          });
          if (shape.cells.some(item => item.y <= 0)) {
            clearInterval(state.interval);
            yield put({
              type: 'changeStatus',
              payload: { status: 'gameover' },
            });
            yield put({
              type: 'saveState',
              payload: false,
            });
            alert('GAME OVER');
            yield put({
              type: 'initGame',
              payload: true,
            });
          }
          yield put({
            type: 'updateScreen',
            payload: { screen },
          });

          yield put({
            type: 'claerShape',
            payload: null,
          });
          yield put({
            type: 'createShape',
            payload: {},
          });

          yield put({
            type: 'saveState',
            payload: true,
          });
        }
      }
    },
    // if one or more lines are full filled with blocks, remove them
    *claerShape({ payload }, { select, call, put }) {
      const state = yield select(state => state.tetris);
      const screen = JSON.parse(JSON.stringify(state.screen));
      const newScreen = [];
      const removeLines = [];
      let addScore = 0;
      let lineCount = 0;

      screen.forEach((line) => {
        if (line.every(item => item.filled)) {
          removeLines.push(line.map((item) => { return { ...item, filled: false }; }));
          addScore += 10;
          lineCount++;
        } else {
          newScreen.push(line);
        }
      });
      if (addScore) {
        const score = state.score + (addScore * lineCount);
        yield put({
          type: 'updateScore',
          payload: {
            score,
            record: score > state.record ? score : state.record,
            lines: state.lines + lineCount,
            level: Math.floor(state.score / 1000) + 1,
          },
        });
        yield put({
          type: 'updateScreen',
          payload: { screen: [...removeLines, ...newScreen] },
        });
      }
    },
    *saveState({ payload }, { select, call, put }) {
      const state = yield select(state => state.tetris);
      if (payload) {
        localStorage.setItem('state', JSON.stringify(state));
      } else {
        localStorage.removeItem('state');
      }
    },

  },

  reducers: {
    initState(state, action) {
      return { ...state, ...action.payload };
    },
    changeStatus(state, action) {
      return { ...state, ...action.payload };
    },
    updateScore(state, action) {
      return { ...state, ...action.payload };
    },
    updateScreen(state, action) {
      return { ...state, ...action.payload };
    },
    pushShape(state, action) {
      const nextShape = JSON.parse(JSON.stringify(state.nextShape));
      if (nextShape && nextShape.cells) {
        nextShape.cells.forEach((item) => {
          item.x += 4;
        });
        nextShape.center.x += 4;
      }
      return { ...state, currentShape: nextShape, nextShape: { ...action.payload } };
    },
    updateShape(state, action) {
      return { ...state, currentShape: { ...action.payload } };
    },
    setInterval(state, action) {
      return { ...state, interval: action.payload };
    },
  },

};
