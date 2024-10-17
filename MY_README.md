# ビルド方法およびその他コマンドについて

- [npmを使ってビルドするCLIリファレンス](https://developers.mattermost.com/contribute/more-info/desktop/build-commands/)

- [ローカル環境でのサーバーセットアップ](https://developers.mattermost.com/contribute/developer-setup/)

# 目次

1. [アプリの始め方](#アプリの始め方)
2. [開発で利用できるコマンド](#開発で利用できるコマンド)
3. [使用技術について](#使用技術について)
4. [mattermostの開発法について](#mattermostの開発法について)

## アプリの始め方

1. [mattermost-desktopのリポジトリをcloneする](https://github.com/Higashi-Masafumi/mattermost)

2. アプリを次のコマンドでbuidする
```bash
$ npm install
$ npm run build
$ npm start
```

3. 立ち上がった画面で、先ほどの手順で得たサーバーのURLを入力する（ドキュメント通りに進めた場合は以下のURLになるはず）
```bash
http://localhost:8065
```

4. 開発で使用するアカウント

- メールアドレス：[higashi-masafumi507@g.ecc.u-tokyo.ac.jp](higashi-masafumi507@g.ecc.u-tokyo.ac.jp)

- パスワード：mattermost
- ユーザーネーム：higa4
- 組織名：higa4
## 開発段階で利用できるコマンド

1. 変更を反映する

```bash
$ make restart-server
```

2. 設定をリセットして再ビルドする

```bash
$ make clean-docker
$ make run-server
```

3. 反映がうまくいかない時の対処法

```bash
$ make clean
$ make run
```

## 使用技術

### 1. コンポーネント：React

- [React公式doc](https://react.dev/learn)
- Reactは、UIを効率的に作成するためのJavaScriptライブラリです。主に「コンポーネント」という単位でUIを構築し、再利用性の高いコードを作成できます。Reactコンポーネントは、状態（state）やプロパティ（props）を利用して動的な画面を描画します。

### 2. コンポーネントの状態管理：Redux

- [Reduxの公式doc](https://redux.js.org/)
- Reduxは、アプリケーションの状態管理を効率的に行うためのライブラリです。特にReactと組み合わせて使われ、状態を一元管理することで、データの流れを整理しやすくします。

#### Reduxの基本概念

1. **Store**：アプリケーションの状態を一元管理する
    <details>

    ```ts
    type Store = {
    dispatch: Dispatch
    getState: () => State
    subscribe: (listener: () => void) => () => void
    replaceReducer: (reducer: Reducer) => void
    }
    ```
2. **Action**：状態を更新するための指示（オブジェクト）。typeとpayloadという情報を含む。

    <details>

    ```ts
    type Action = Object
    ```

3. **Reducer**：Actionに基づいて、状態（state）をどのように更新するかを決める純粋関数。

    <details>

    ```ts
    type Reducer<S, A> = (state: S, action: A) => S
    ```

4. **Dispatch**：ActionをStoreに送るためのメソッド

    <details>

    ```ts
    type BaseDispatch = (a: Action) => Action
    type Dispatch = (a: Action | AsyncAction) => any
    ```

## mattermostの開発法について

- [Contribute用の資料](hhttps://developers.mattermost.com/contribute/more-info/getting-started/)
- [Componentの作成法について](https://developers.mattermost.com/contribute/more-info/webapp/build-component/)
- [Component作成におけるReduxの利用法](https://developers.mattermost.com/contribute/more-info/webapp/redux/actions/)

    
## 参照するべきファイル

- [create_comment.tsx](#create_coment.tsx)
- [use_submit.tsx](#use_submit.tsx)


## 現在分かったこと

- `channels/src/components/advanced_text_editor/advanced_text_editor.tsx`：実際に入力欄コンポーネントが実装されている
- `channels/src/components/advanced_text_editor/formatting_bar/formatting_icon.tsx`：入力欄のアイコンを設定する
- `channels/src/components/advanced_text_editor/formatting_bar/hooks.tsx`：入力欄に渡す
- 