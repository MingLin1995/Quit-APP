import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { Result } from '../types';
import Leaderboard from '../components/Leaderboard';

function StartPage() {
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState<Result[]>([]);

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-800 mb-4">歡迎來到冷知識問答遊戲</h1>
                    <p className="text-xl text-gray-600">測試你的冷知識，讓你今天長知識！</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">冷知識測驗</h2>
                        <p className="text-gray-600 mb-6">
                            準備好挑戰自己了嗎？點擊下方開始按鈕，看看你能得到多少分！
                        </p>
                        <button
                            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                            onClick={() => navigate('/quiz')}
                        >
                            開始
                        </button>
                    </div>

                    <Leaderboard data={leaderboard} />
                </div>
            </div>
        </div>
    );
}

export default StartPage;