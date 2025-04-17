import { Result } from '../types';

interface LeaderboardProps {
    data: Result[];
    title?: string;
    limit?: number;
}

export default function Leaderboard({ data, title = '排行榜', limit = 5 }: LeaderboardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
            <div className="space-y-3">
                {data.slice(0, limit).map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                            <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 font-semibold">
                                {index + 1}
                            </span>
                            <span className="font-medium">{entry.username}</span>
                        </div>
                        <div className="text-right">
                            <div className="text-blue-600 font-semibold">共得 {entry.score} 分</div>
                            <div className="text-sm text-gray-500">{entry.seconds} 秒</div>
                        </div>
                    </div>
                ))}
                {data.length === 0 && (
                    <p className="text-gray-500 text-center py-4">還沒有任何成績記錄</p>
                )}
            </div>
        </div>
    );
} 