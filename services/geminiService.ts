import { GoogleGenAI } from "@google/genai";
import { LetterData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLetter = async (data: LetterData): Promise<string> => {
  const prompt = `
    あなたはプロの構成作家であり、同時に少しお調子者の子供の代弁者です。
    以下の情報をもとに、親にお小遣いアップ、または臨時のお小遣いをお願いする「手紙」を書いてください。

    【子供の属性】
    - 年齢: ${data.age}歳
    - 欲しいもの/目的: ${data.targetItem}
    - 現在のお小遣い/所持金: ${data.currentAllowance}
    - 親へのメッセージ（感謝や謝罪、エピソードなど）: ${data.episodes || '特になし'}

    【手紙のトーンとルール】
    1. **ユーモラスで切実**: 親が読んで思わず笑ってしまい、「まあ、しょうがないな」とお金を出したくなるような文章にしてください。
    2. **童話・寓話・流行の引用**: シンデレラ、桃太郎、あるいは歴史上の出来事やことわざ、あるいは最近のニュースなどを、強引かつ面白おかしく自分の状況（金欠）に当てはめて例えてください。
    3. **論理の飛躍**: 「風が吹けば桶屋が儲かる」のような、少しおバカで強引な論理展開を含めてください。
    4. **礼儀正しさと甘え**: 文体は基本丁寧語（です・ます）ですが、子供らしい甘えや必死さを滲ませてください。
    5. **長さ**: 400文字〜600文字程度。
    6. **構成**: 時候の挨拶（ふざけてOK） -> 現状の悲劇的報告 -> 欲しいものへの熱い想い -> 論理的（？）な説得 -> 結びの言葉。

    出力は手紙の本文のみを行ってください。Markdownの装飾は最低限にしてください。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9, // Creative and varied
        topP: 0.95,
        topK: 40,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text generated");
    }
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("手紙の生成に失敗しました。もう一度試してみてね！");
  }
};