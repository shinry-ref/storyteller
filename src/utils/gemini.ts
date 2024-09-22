import { GoogleGenerativeAI } from "@google/generative-ai";

// 環境変数の読み込み
const API_KEY: string =  import.meta.env.VITE_GEMINI_KEY;

// インスタンスの作成
const genAI = new GoogleGenerativeAI(API_KEY);

// Geminiモデルを使用してテキストを生成するための関数
export async function startGemini(prompt:string) {
  // gemini-pro モデルを使用
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  // プロンプトに基づいてテキストを生成
  const result = await model.generateContent(prompt);

  // 生成されたテキストを取得
  const response = await result.response;

  // テキストを抽出
  const text = response.text();

  return text;
}

export const createPrompt = (title: string, category: string, content: string) => {
  let categoryInstructions = '';

  switch (category) {
    case 'オリジナル':
      categoryInstructions = '内容に忠実に、改変せずにストーリーを再現してください。';
      break;
    case '明るい':
      categoryInstructions = '内容をベースにしつつ、ポジティブな展開や解釈を加えて、気持ちが明るくなるようなストーリーにしてください。';
      break;
    case 'スカッとする':
      categoryInstructions = '内容に基づき、満足感を得られる、または爽快感のある結末にアレンジを加えてください。';
      break;
    case '感動的':
      categoryInstructions = '内容をベースに、読者の心に響くような感動的なエピソードを追加してください。';
      break;
    case '冒険的':
      categoryInstructions = '内容を少し大げさにして、スリルや冒険を感じるようなストーリーにしてください。';
      break;
    case 'ロマンチック':
      categoryInstructions = '内容にロマンチックな要素を加えて、温かい気持ちや恋愛の雰囲気を感じさせるストーリーにしてください。';
      break;
    case 'ノスタルジック':
      categoryInstructions = '内容に懐かしさを感じさせるようなエピソードや描写を追加してください。';
      break;
    case 'コメディ':
      categoryInstructions = '内容をユーモラスにし、笑いを誘う展開にしてください。';
      break;
    case 'ミステリアス':
      categoryInstructions = '内容に謎や不思議な要素を加えて、読者を惹きつけるミステリアスなストーリーにしてください。';
      break;
    default:
      categoryInstructions = '適切なカテゴリが選択されていません。';
  }

  return `
タイトル: ${title}
カテゴリ: ${category}
内容: ${content}

以下の内容に基づいてストーリーを300文字で作成してください。出力はHTML形式としてください。

- ${categoryInstructions}
  `;
};


