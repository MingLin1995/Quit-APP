import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { Result } from '../types';
import Leaderboard from '../components/Leaderboard';

interface LocationState {
    score: number;
    seconds: number;
}

function ResultPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { score, seconds } = (state as LocationState) || { score: 0, seconds: 0 };
    const [leaderboard, setLeaderboard] = useState<Result[]>([]);
    const [username, setUsername] = useState<string>('');
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            const { data } = await supabase
                .from('results')
                .select('*')
                .order('score', { ascending: false })
                .order('seconds', { ascending: true })
                .limit(5);
            setLeaderboard(data || []);
        };
        fetchLeaderboard();
    }, []);

    const handleSave = async () => {
        if (!username || isSaved) return;
        await supabase.from('results').insert({ username, score, seconds });
        setIsSaved(true);
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">測驗結果</h1>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">分數</p>
                            <p className="text-2xl font-bold text-blue-600">{score} / 10</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">用時</p>
                            <p className="text-2xl font-bold text-green-600">{seconds} 秒</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="輸入你的名字"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                            disabled={isSaved}
                        />
                        <button
                            className={`w-full mt-3 px-6 py-3 rounded-lg text-lg font-semibold transform transition-all duration-300 shadow-lg ${isSaved
                                ? 'bg-green-600 text-white cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                                }`}
                            onClick={handleSave}
                            disabled={isSaved || !username}
                        >
                            {isSaved ? '已儲存，即將返回首頁...' : '儲存成績'}
                        </button>
                    </div>

                    <Leaderboard data={leaderboard} title="排行榜" limit={5} />
                </div>
            </div>
        </div>
    );
}

export default ResultPage;