# todokiso

**意図から、動くソフトウェアまで。**

> その意図、実装まで届きそ？

todokiso は、要求から設計・実装・レビュー・リリースまで、最初の意図を失わずに届けるための **role-based / tool-agnostic な SDLC** です。

特定のAI製品、コーディングエージェント、IDE、フレームワーク、言語には依存しません。各ロールは、人間・AI・その組み合わせのどれでも担えます。

## なぜ作るのか

実装が速くなっても、最初に作りたかったものからズレていれば意味がありません。

todokiso は「何を作りたいか」から「実際に動くもの」までの経路を明示します。

~~~text
Request / Requirement
        ↓
Impact Analysis
        ↓
Estimate + Confidence
        ↓
Approval: Go / No-Go
        ↓
Detailed Design
        ↓
Work Packages + Dependency DAG
        ↓
Branch / PR Plan
        ↓
Approval: Ready for Implementation
        ↓
自己完結した Work Package Issue を作成
        ↓
Implementation / Test / PR
        ↓
意図に照らした Review
        ↓
Merge / Release
~~~

## コアとなる考え方

- **製品名ではなくロールで定義する。** ツールが変わっても責務は残る。
- **意図の正本を持つ。** 承認済みの目的・計画・実行仕様を明確にする。
- **Unknown が残るなら止まる。** 不確実性を勝手な実装判断に変換しない。
- **調査と実装を分離する。** 上流調査中にプロダクトを黙って変更しない。
- **Handoff は自己完結させる。** Executor が長いコメント履歴から最新仕様を推測しない。
- **実行単位を小さく保つ。** 基本モデルは 1 Work Package = 1 実行Issue = 1 branch/workspace = 1 PR。
- **承認を明示する。** 会話の雰囲気ではなく、判断ゲートとして残す。
- **レビューではコード品質だけでなく、元の意図との整合を見る。**

## ロール

todokiso が定義するのは「誰がやるか」ではなく「何を担うか」です。

| Role | Responsibility |
| --- | --- |
| Decision Owner | 目的・優先順位・承認ゲート・Merge/Release判断 |
| Planner | 要求整理、影響調査、設計、作業分解 |
| Executor | 承認された Work Package の実装・テスト・PR |
| Reviewer | 実装・テスト・スコープ・承認済み意図との整合確認 |

## 使い始める

まず bootstrap/README.md の Manual Bootstrap を使います。

v0.1 では意図的に CLI を作りません。実リポジトリへ適用し、本当に共通化できるもの・生成すべきもの・人間が決めるべきものを見極めてから自動化します。

## Repository Profile

プロダクト目的、アーキテクチャ、開発コマンド、テスト戦略、デプロイ、リポジトリ固有ルールは todokiso のコアではありません。対象リポジトリ側の **Repository Profile** として管理します。

ひな形は bootstrap/repository-profile-template.md を参照してください。

## 名前

**todokiso** は「届きそう」を会話っぽく縮めた「届きそ」から来ています。

このプロジェクトが問い続けるのは一つです。

> 最初の意図、最後の working software まで届きそ？

## Status

v0.1 抽出中。まず別リポジトリで dogfood し、その後に CLI や package 化を検討します。
