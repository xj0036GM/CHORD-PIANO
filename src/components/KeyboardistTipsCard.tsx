import React from 'react';
import { BookOpen, Sparkles, AlertCircle, Compass, Zap } from 'lucide-react';

export const KeyboardistTipsCard: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">流行音乐键盘手实战伴奏秘籍</h2>
            <p className="text-[11px] text-slate-400">以最低的脑力消耗，换取最大的肌肉记忆与现场弹奏效果</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono text-[10px]">
          PRO 经验沉淀
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Tip 1 */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-sky-400 mb-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>1. 左手低音避坑法则</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            在中央C以下的低音区（C2-C3），<strong>绝对不要弹三音</strong>！低音三音泛音剧烈共振会导致声音极度浑浊泥泞。左手只弹<span className="text-sky-300 font-mono">根音 + 五音 + 八度</span>，声场干净通透。
          </p>
        </div>

        {/* Tip 2 */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>2. 右手和弦平滑转位</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            新手弹和弦喜欢整只手大跳。职业键盘手讲究<strong>“就近原则”与“共同音保留”</strong>。例如 C(C-E-G) 接 G 和弦时，转为第一转位(B-D-G)，保留G音不动，仅移动两指，行云流水！
          </p>
        </div>

        {/* Tip 3 */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>3. 切分律动提前进和弦</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            流行音乐的弹跳感来自<strong>提前半拍抢进</strong>！在第2拍后半拍或第4拍后半拍，右手提前切入下一个和弦，左手低音在正拍跟进下潜，形成华语金曲标志性的“推背律动感”。
          </p>
        </div>

        {/* Tip 4 */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-1.5 font-bold text-purple-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4. 30 BPM 极致慢练突触建立</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            手指弹不准是因为大脑神经回路未形成。将节拍速度下调至 <strong>30-45 BPM</strong>，关注<strong>“下一小节提前预判”</strong>，在当前和弦发声的同时，眼与脑已经看向下一个手型，建立牢固肌肉记忆！
          </p>
        </div>
      </div>
    </div>
  );
};
