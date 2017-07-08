
export default {

  namespace: 'tetris',

  state: {
    score: 0,
    record: 0,
    lines: 0,
    level: 1,
    mode: 'normal',
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
      const row = 20;
      const column = 10;
      let screen = [];
      for(let i = 1; i <= row; i++) {
        let line = [];
        for(let j = 1; j <= column; j++) {
          line.push({
            color:'',
            state: 0, // 0表示不能移动，1表示可以移动
            type: 0, // 0表示不可穿透，1表示可穿透
          });
        }
        screen.push(line);
      }
      yield put({
        type: 'updateScreen',
        payload: { screen },
      });
    },
    *startGame({ payload }, { call, put }) {

      yield put({
        type: 'updateScreen',
        payload: { screen },
      });
    },
  },

  reducers: {
    updateScreen(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
