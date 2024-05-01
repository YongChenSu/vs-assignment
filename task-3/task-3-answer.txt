
## 三個問題的回答如下：
**1. Simply describe what "function1" will do.**
function1 是一個 Redux-Saga 中使用的 `generator function`，用於管理 Redux 中的副作用。此函數處理一個非同步 POST 請求，並使用 AbortController 來取消該請求。

以下是依據程式碼順序解釋：
1. 建立一個 AbortController 的 instant，並將其賦值給變量 ctrl。
2. 建立一個 config，用於 axios 的 POST 請求。包括 endpoint 的 URL、觸發此 saga 的動作中的 payload，以及來自 AbortController 的取消 signal。
3. 使用 yield call() 執行 axios 請求。如果請求成功，將觸發一個 reducer。
4. 如果請求失敗（catch error），並且錯誤的回應 (e.response)，則觸發另一個 reducer。
5. 在 finally 塊中，會檢查是否已經發出了中止請求的信號（ctrl.signal.aborted），如果是，則觸發另一個 reducer。

**2. Can we stop what "function1" is doing? How?**
可以通過調用 `function2` 來停止 `function1` 啟動的操作。
`function2` 執行 `ctrl.abort()`，使用 `AbortController` 發送中止信號。
axios 請求將監聽此中止信號，如果請求尚未完成，則會取消正在進行的 HTTP 請求。這進到 `function1` 中的 error catch，會觸發 reducer 2。

**3. How to optimize this snippet?**
- 優化命名：`ctrl` -> `abortCtrl`。
- 避免全域變數: 使用全局變數 `ctrl` 可能會導致多個 saga 同時運行時出現控制衝突。最好將 `new AbortController()` 移到每個 saga 函數內，每個 saga 操作都有自己的 `AbortController`，避免 side effect。
- 抽成獨立 function：`fetchData`、`handleErrors`
- 使用具體的 action: 程式碼中有多次 `yield put()` 但是沒有明確指出是什麼 action。要明確地指出每個 put() 正在發送什麼 action。
- 處理不是 `e.response` 的錯誤。

```js
import { call, put } from "redux-saga/effects";
import { API_ENDPOINT, POST_CONFIG } from "./config";  // 獨立的 config.js 設定檔

function* function1(action) {
    const abortCtrl = new AbortController();
    const config = {
        ...POST_CONFIG, // 使用 spread operator 易於擴充設定
        url: API_ENDPOINT,
        data: action.payload,
        signal: abortCtrl.signal,
    };

    try {
        const { data } = yield call(fetchData, config);
        yield put({ type: "SUCCESS_ACTION", data }); // 具體的 Action
    } catch (e) {
        yield handleErrors(e); // 處理非 e.response 的 error
    } finally {
        if (abortCtrl.signal.aborted) {
            yield put({ type: "ABORT_ACTION" });
        }
    }
}

function* fetchData(config) { // 將 axios 請求做成一個獨立的 fetchData function
    return yield call(axios, config);
}

function* handleErrors(e) { // 獨立 handleErrors function
    if (e.response) {
        const { status, data } = e.response;
        yield put({
            type: 'FAILURE_ACTION',
            payload: { status, message: data.message }
        });
    } else {
        // 處理非 e.response 錯誤
        yield put({ type: 'ERROR_ACTION', error: e.message });
    }
}

function function2(abortCtrl) {
    abortCtrl.abort(); // 命名優化為 abortCtrl
}
```

## 考題
### Task 3: Understanding
Please answer the following three questions in .txt file based on the javascript code below.

```js
import { call, put } from "redux-saga/effects";

let ctrl;

function* function1(action) {
    ctrl = new AbortController();
    const config = {
        method: "POST",
        url: "https://some-endpoint-url.com",
        data: action.payload,
        signal: ctrl.signal,
    };

    try {
        const { data } = yield call(/** a axios request with config */);

        yield put(/** reducer 1 */);
    } catch (e) {
        if (e.response) {
            const er = e.response;

            yield put(/** reducer 2 */);

            return;
        }
    } finally {
        if (ctrl.signal.aborted) {
            yield put(/** reducer 3 */);
        }
    }
}

function function2() {
    ctrl.abort();
}
```

