import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
    id: number;
    text: string;
    options: string[];
    answer: string;
}

const questions: Question[] = [
    { id: 1, text: '章魚有幾顆心臟？', options: ['1顆', '2顆', '3顆'], answer: '3顆' },
    { id: 2, text: '人體最強壯的肌肉是？', options: ['手臂肌', '舌頭', '腿部肌'], answer: '舌頭' },
    { id: 3, text: '駱駝的駝峰裡裝的是什麼？', options: ['水', '脂肪', '空氣'], answer: '脂肪' },
    { id: 4, text: '企鵝是鳥類嗎？', options: ['是', '不是', '是哺乳類'], answer: '是' },
    { id: 5, text: '閃電比雷聲快多少？', options: ['一樣快', '閃電快 100 倍', '快大約一百萬倍'], answer: '快大約一百萬倍' },
    { id: 6, text: '哪一種水果是用炸彈測試才知道能熟？', options: ['鳳梨', '香蕉', '芒果'], answer: '香蕉' },
    { id: 7, text: '人類一天平均會掉幾根頭髮？', options: ['10 根', '50~100根', '300根'], answer: '50~100根' },
    { id: 8, text: '哪一種動物沒有聲帶但能吼叫？', options: ['鯨魚', '長頸鹿', '豹'], answer: '長頸鹿' },
    { id: 9, text: '太空人回到地球後會變？', options: ['更高', '更矮', '不變'], answer: '更高' },
    { id: 10, text: '哪一個東西其實是液體做的？', options: ['蜂巢', '沙子', '玻璃'], answer: '玻璃' },
];

function QuizPage() {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [seconds, setSeconds] = useState<number>(0);
    const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});

    useEffect(() => {
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAnswerSelect = (questionId: number, selectedAnswer: string) => {
        setAnswers({ ...answers, [questionId]: selectedAnswer });

        const question = questions.find(q => q.id === questionId);
        if (question && selectedAnswer !== question.answer) {
            setShowAnswers({ ...showAnswers, [questionId]: true });
        }
    };

    const handleSubmit = () => {
        const score = questions.reduce(
            (acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0),
            0
        );
        navigate('/result', { state: { score, seconds } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">冷知識問答遊戲</h1>
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                            計時: {seconds} 秒
                        </div>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q) => (
                            <div key={q.id} className="bg-gray-50 rounded-lg p-4">
                                <p className="text-lg font-semibold text-gray-800 mb-3">{q.text}</p>
                                <div className="space-y-2">
                                    {q.options.map((opt) => (
                                        <label key={opt} className="quiz-option">
                                            <input
                                                type="radio"
                                                name={`q${q.id}`}
                                                value={opt}
                                                onChange={() => handleAnswerSelect(q.id, opt)}
                                                className="mr-2"
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                                {showAnswers[q.id] && (
                                    <div className="mt-2 text-red-600 font-semibold">
                                        正確答案: {q.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                        onClick={handleSubmit}
                    >
                        作答完畢
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;