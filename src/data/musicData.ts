import { MusicalKey, KeyOption, PopChordProgression, PopGroove, SmartPairing, ChordVoicing } from '../types/music';

export const KEY_OPTIONS: KeyOption[] = [
  { key: 'C', name: 'C 大调 (自然音阶)', accidentals: '无升降号', tonicMidi: 48, mode: 'major' },
  { key: 'G', name: 'G 大调 (常用调号)', accidentals: '1 个升号 (#F)', tonicMidi: 55, mode: 'major' },
  { key: 'D', name: 'D 大调 (吉他/流行)', accidentals: '2 个升号 (#F, #C)', tonicMidi: 50, mode: 'major' },
  { key: 'A', name: 'A 大调 (明朗热烈)', accidentals: '3 个升号 (#F, #C, #G)', tonicMidi: 45, mode: 'major' },
  { key: 'E', name: 'E 大调 (摇滚/力量)', accidentals: '4 个升号 (#F, #C, #G, #D)', tonicMidi: 52, mode: 'major' },
  { key: 'F', name: 'F 大调 (常用温润)', accidentals: '1 个降号 (bB)', tonicMidi: 53, mode: 'major' },
  { key: 'Bb', name: 'B♭ 大调 (爵士/铜管)', accidentals: '2 个降号 (bB, bE)', tonicMidi: 46, mode: 'major' },
  { key: 'Eb', name: 'E♭ 大调 (浑厚深沉)', accidentals: '3 个降号 (bB, bE, bA)', tonicMidi: 51, mode: 'major' },
  { key: 'Ab', name: 'A♭ 大调 (抒情浪漫)', accidentals: '4 个降号 (bB, bE, bA, bD)', tonicMidi: 44, mode: 'major' },
  { key: 'Am', name: 'A 小调 (忧伤深沉)', accidentals: '关系小调 (与C大调同音)', tonicMidi: 45, mode: 'minor' },
  { key: 'Em', name: 'E 小调 (苍凉空灵)', accidentals: '关系小调 (与G大调同音)', tonicMidi: 52, mode: 'minor' },
  { key: 'Dm', name: 'D 小调 (悲壮古典)', accidentals: '关系小调 (与F大调同音)', tonicMidi: 50, mode: 'minor' },
];

// Note names for MIDI numbers 0 to 127
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getMidiNoteName(midi: number): string {
  const note = NOTE_NAMES[midi % 12];
  const octave = Math.floor(midi / 12) - 1;
  return `${note}${octave}`;
}

export function isBlackKey(midi: number): boolean {
  const n = midi % 12;
  return n === 1 || n === 3 || n === 6 || n === 8 || n === 10;
}

// Semitone intervals from root in major scale: 1=0, 2=2, 3=4, 4=5, 5=7, 6=9, 7=11
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

// Root pitch class (0 = C, 1 = C#, 2 = D, etc.)
export const KEY_ROOT_SEMITONES: Record<MusicalKey, number> = {
  C: 0,
  G: 7,
  D: 2,
  A: 9,
  E: 4,
  F: 5,
  Bb: 10,
  Eb: 3,
  Ab: 8,
  Am: 9,
  Em: 4,
  Dm: 2,
};

// 10 Pop Chord Progressions covering >95% of pop music
export const POP_PROGRESSIONS: PopChordProgression[] = [
  {
    id: 'prog-canon',
    name: '卡农黄金进行 (Canon)',
    subtitle: '流行音乐永恒之基 · 万能抒情循环',
    roman: ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
    degrees: [1, 5, 6, 3, 4, 1, 4, 5],
    coverageRate: 96,
    mood: '庄严治愈 · 温暖深情 · 经典史诗',
    soundFeel: '低音阶梯级进下行，和声饱满温暖，层层递进的史诗与叙事感。',
    representativeSongs: [
      '周杰伦《晴天》《安静》',
      '光良《童话》',
      'Adele《Someone Like You》',
      '梁静茹《勇气》',
      'Ed Sheeran《Photograph》'
    ],
    description: '源自古典音乐帕赫贝尔《卡农》，流行音乐使用率第一的走向。无论是慢歌铺垫还是高潮副歌，都能无缝驾驭。',
    keyboardistTip: '右手在弹奏时尽量保持高音公共音保留（如保持G或C），使旋律线条平滑，左手深沉下潜弹奏八度根音。',
    defaultBpm: 68,
    recommendedGrooveId: 'groove-arpeggio-16th',
    chordsTemplate: [
      { degree: 1, suffix: '', inversion: 0 },
      { degree: 5, suffix: '', inversion: 2 },
      { degree: 6, suffix: 'm', inversion: 1 },
      { degree: 3, suffix: 'm', inversion: 2 },
      { degree: 4, suffix: '', inversion: 0 },
      { degree: 1, suffix: '', inversion: 1 },
      { degree: 4, suffix: '', inversion: 0 },
      { degree: 5, suffix: '', inversion: 2 },
    ],
  },
  {
    id: 'prog-4536251',
    name: '华语流行催泪神套路 (4536251)',
    subtitle: '华语乐坛半壁江山 · 抒情黄金公式',
    roman: ['IV', 'V', 'iii', 'vi', 'ii', 'V', 'I'],
    degrees: [4, 5, 3, 6, 2, 5, 1],
    coverageRate: 95,
    mood: '凄美抓耳 · 情绪起伏 · 催泪叙事',
    soundFeel: '从下属音4级弱起进入，5级推高，3级跌入小调伤感，最后2-5-1完美解决。',
    representativeSongs: [
      '周杰伦《青花瓷》《千里之外》《枫》',
      '张信哲《爱如潮水》',
      '胡夏《那些年》',
      '林俊杰《江南》',
      '王菲《红豆》'
    ],
    description: '统治华语乐坛30年的超级和弦走向。80%的华语抒情金曲副歌或主歌均由此构建，是键盘手必备的第一肌肉记忆！',
    keyboardistTip: '在弹到iii级和vi级时，右手指触键可稍微柔和，在第2级的ii和弦后加上9音（如Dm9）会让听感瞬间高级起来。',
    defaultBpm: 72,
    recommendedGrooveId: 'groove-syncopated-pop',
    chordsTemplate: [
      { degree: 4, suffix: 'maj7', inversion: 0 },
      { degree: 5, suffix: '7', inversion: 2 },
      { degree: 3, suffix: 'm7', inversion: 1 },
      { degree: 6, suffix: 'm', inversion: 0 },
      { degree: 2, suffix: 'm7', inversion: 1 },
      { degree: 5, suffix: '7', inversion: 2 },
      { degree: 1, suffix: 'add9', inversion: 0 },
    ],
  },
  {
    id: 'prog-4566',
    name: '悲伤宿命进行 (4566 / 4561)',
    subtitle: '摇滚抒情高潮 · 意难平爆棚',
    roman: ['IV', 'V', 'vi', 'vi'],
    degrees: [4, 5, 6, 6],
    coverageRate: 92,
    mood: '遗憾释怀 · 命运叩问 · 痛快倾泻',
    soundFeel: 'IV-V的积蓄推力猛然撞入vi级小和弦，情绪从昂扬瞬间转为悲壮，形成巨大张力。',
    representativeSongs: [
      '五月天《突然好想你》',
      '蔡依林《倒带》',
      '周杰伦《说好不哭》',
      '薛之谦《演员》',
      '陈奕迅《孤勇者》'
    ],
    description: '现代流行歌曲最经典的副歌爆发走向。不断在4-5推向顶点后落入6级忧伤，极具感染力与现场震撼感。',
    keyboardistTip: '在连续两小节的vi级上，第二小节右手可以加入高音分解加花或挂留音（Sus4/Sus2）做色彩过渡。',
    defaultBpm: 76,
    recommendedGrooveId: 'groove-anthem-driving',
    chordsTemplate: [
      { degree: 4, suffix: '', inversion: 0 },
      { degree: 5, suffix: '', inversion: 2 },
      { degree: 6, suffix: 'm', inversion: 1 },
      { degree: 6, suffix: 'm', inversion: 0 },
    ],
  },
  {
    id: 'prog-6415',
    name: '流行摇滚与Emo神曲走向 (6415)',
    subtitle: '欧美榜单收割机 · 现代律动核弹',
    roman: ['vi', 'IV', 'I', 'V'],
    degrees: [6, 4, 1, 5],
    coverageRate: 94,
    mood: '孤独坚毅 · 奔跑热血 · 节奏推进',
    soundFeel: '从小和弦起步，经由4级的开阔转入1级的明朗，最后在5级形成永不停歇的律动回环。',
    representativeSongs: [
      'Alan Walker《Faded》',
      'OneRepublic《Counting Stars》《Apologize》',
      '逃跑计划《夜空中最亮的星》',
      'The Chainsmokers《Closer》',
      'G.E.M.邓紫棋《光年之外》'
    ],
    description: '欧美流行电音、流行摇滚与现代华语高燃金曲最常用的四和弦循环。循环性极强，怎么弹都好听！',
    keyboardistTip: '强烈推荐配合8分音符动力性扫击律动，左手重拍下潜，右手强调重音节奏切分，打造奔跑推进感。',
    defaultBpm: 112,
    recommendedGrooveId: 'groove-driving-8beat',
    chordsTemplate: [
      { degree: 6, suffix: 'm', inversion: 0 },
      { degree: 4, suffix: '', inversion: 1 },
      { degree: 1, suffix: '', inversion: 2 },
      { degree: 5, suffix: '', inversion: 0 },
    ],
  },
  {
    id: 'prog-1645',
    name: '复古50s Doo-Wop经典 (1645)',
    subtitle: '黄金年代经典 · 纯情浪漫回声',
    roman: ['I', 'vi', 'IV', 'V'],
    degrees: [1, 6, 4, 5],
    coverageRate: 89,
    mood: '甜蜜怀旧 · 复古阳光 · 温暖无忧',
    soundFeel: '主和弦自然下沉到6级小和弦，再弹跳至4级与5级属和弦，经典的圆形闭环回路。',
    representativeSongs: [
      'Ben E. King《Stand By Me》',
      'Ed Sheeran《Perfect》',
      '邓丽君《恰似你的温柔》',
      'The Righteous Brothers《Unchained Melody》',
      '苏打绿《小情歌》'
    ],
    description: '50年代摇滚民谣奠基走向，直到2020年代依然在Ed Sheeran、Bruno Mars等顶级流行巨星手中大放异彩。',
    keyboardistTip: '右手可使用柱式跳音或摇摆(Swing)轻触，左手弹奏低音根音+五音交替，营造出老式留声机的摇摆律动。',
    defaultBpm: 86,
    recommendedGrooveId: 'groove-block-chords',
    chordsTemplate: [
      { degree: 1, suffix: '', inversion: 0 },
      { degree: 6, suffix: 'm', inversion: 1 },
      { degree: 4, suffix: '', inversion: 2 },
      { degree: 5, suffix: '', inversion: 0 },
    ],
  },
  {
    id: 'prog-4321',
    name: '叹息级进下行 (4321 / 4325)',
    subtitle: '离别与释然 · 阶梯式叹息',
    roman: ['IV', 'iii', 'ii', 'V'],
    degrees: [4, 3, 2, 5],
    coverageRate: 86,
    mood: '隐忍痛楚 · 阶梯叹息 · 深情告白',
    soundFeel: '低音和声连续步步级进下行，如同叹息一声接一声，在属和弦前产生极致的不舍。',
    representativeSongs: [
      '杨宗纬《洋葱》',
      '陈奕迅《淘汰》',
      '周杰伦《蒲公英的约定》',
      '林宥嘉《说谎》',
      '莫文蔚《忽然之间》'
    ],
    description: '典型的情歌预副歌（Pre-Chorus）或主歌过渡段落，负责将平缓叙事推向副歌爆发的高效桥梁。',
    keyboardistTip: '右手的根音下移时，注意旋律声部的横向连接。在ii级和弦上多停留呼吸，感受半终止的悬念感。',
    defaultBpm: 70,
    recommendedGrooveId: 'groove-syncopated-pop',
    chordsTemplate: [
      { degree: 4, suffix: 'maj7', inversion: 0 },
      { degree: 3, suffix: 'm7', inversion: 1 },
      { degree: 2, suffix: 'm7', inversion: 0 },
      { degree: 5, suffix: '7', inversion: 2 },
    ],
  },
  {
    id: 'prog-2514',
    name: '都市微醺律动 (2514 / 2516)',
    subtitle: 'R&B / 爵士流行流行变体 · 高阶质感',
    roman: ['ii', 'V', 'I', 'IV'],
    degrees: [2, 5, 1, 4],
    coverageRate: 80,
    mood: '松弛优雅 · 都市时髦 · 微醺小资',
    soundFeel: '爵士标准的2-5-1解决，再延伸至4级大七和弦，色彩丰富、和声高级且不生硬。',
    representativeSongs: [
      '陶喆《爱很简单》《普通朋友》《飞机场的10:30》',
      '方大同《爱爱爱》《三人游》',
      'IU《Friday》',
      'Bruno Mars《That\'s What I Like》'
    ],
    description: '进阶流行键盘手必练！脱离了普通纯三和弦的素朴，注入Maj7、m7、9音色彩，瞬间让弹奏充满摩登都市质感。',
    keyboardistTip: '左手千万不要弹三音！只弹根音与五音，把3音和7音留给右手，弹奏9音色彩（如Dm9 - G13 - Cmaj9）。',
    defaultBpm: 84,
    recommendedGrooveId: 'groove-bossa-rnb',
    chordsTemplate: [
      { degree: 2, suffix: 'm7', inversion: 1 },
      { degree: 5, suffix: '7', inversion: 2 },
      { degree: 1, suffix: 'maj7', inversion: 0 },
      { degree: 4, suffix: 'maj7', inversion: 1 },
    ],
  },
  {
    id: 'prog-1451',
    name: '纯真叙事三和弦 (1451 / 1455)',
    subtitle: '民谣校园基石 · 简单纯粹之美',
    roman: ['I', 'IV', 'V', 'I'],
    degrees: [1, 4, 5, 1],
    coverageRate: 88,
    mood: '明朗温暖 · 质朴纯真 · 大合唱共鸣',
    soundFeel: '正三和弦构成的最纯正大调色彩，开阔、明亮，没有任何杂质的生命力。',
    representativeSongs: [
      '老狼《同桌的你》',
      '罗大佑《光阴的故事》',
      'The Beatles《Let It Be》',
      '朴树《平凡之路》',
      '汪峰《怒放的生命》'
    ],
    description: '调式音乐的源头与骨架。无数经典的校园民谣、大合唱金曲与摇滚金曲全靠这组和弦书写传奇。',
    keyboardistTip: '简单的和弦更考验触键的颗粒感与音色均匀度。右手可以用Sus4向大三和弦的解决加花让段落生动。',
    defaultBpm: 88,
    recommendedGrooveId: 'groove-block-chords',
    chordsTemplate: [
      { degree: 1, suffix: '', inversion: 0 },
      { degree: 4, suffix: '', inversion: 2 },
      { degree: 5, suffix: '', inversion: 1 },
      { degree: 1, suffix: '', inversion: 0 },
    ],
  },
  {
    id: 'prog-descending-bass',
    name: '阶梯低音大倒退 (1-5/7-6m-4-1/3-2m-5)',
    subtitle: '低音线条大师 · 史诗级行云流水',
    roman: ['I', 'V/7', 'vi', 'IV', 'I/3', 'ii', 'V'],
    degrees: [1, 5, 6, 4, 1, 2, 5],
    coverageRate: 87,
    mood: '长线叙事 · 岁月沉淀 · 深邃悠扬',
    soundFeel: '低音线条从1到7到6到5到4到3逐级下探，形成极其优雅平滑的复调对位感。',
    representativeSongs: [
      '刘若英《后来》',
      '陈奕迅《十年》',
      '陶喆《寂寞的季节》',
      'Procol Harum《A Whiter Shade of Pale》',
      '张学友《吻别》'
    ],
    description: '专业键盘手与制作人彰显功底的标志性走向。利用转位低音构造极美阶梯线条，堪称流行钢琴的天花板手法。',
    keyboardistTip: '左手是主角！左手必须清晰弹奏下行低音线条（1 - 7 - 6 - 5 - 4 - 3 - 2 - 5），右手保持高位和弦织体。',
    defaultBpm: 65,
    recommendedGrooveId: 'groove-arpeggio-16th',
    chordsTemplate: [
      { degree: 1, suffix: '', inversion: 0 },
      { degree: 5, suffix: '', inversion: 1, bassDegree: 7 },
      { degree: 6, suffix: 'm', inversion: 0 },
      { degree: 4, suffix: '', inversion: 0 },
      { degree: 1, suffix: '', inversion: 1, bassDegree: 3 },
      { degree: 2, suffix: 'm7', inversion: 0 },
      { degree: 5, suffix: '7', inversion: 2 },
    ],
  },
  {
    id: 'prog-4516',
    name: '黄金副歌爆发 (4516 / 小幸运走向)',
    subtitle: '青春告白无敌抓耳 · 极速引爆情绪',
    roman: ['IV', 'V', 'I', 'vi'],
    degrees: [4, 5, 1, 6],
    coverageRate: 91,
    mood: '热烈告白 · 青春释怀 · 抓耳上头',
    soundFeel: '从4级起跳，5级蓄力，在第3个和弦直接落在1级主和弦爆发，再滑入6级小和弦收尾。',
    representativeSongs: [
      '田馥甄《小幸运》',
      '林俊杰《修炼爱情》',
      '薛之谦《绅士》',
      '郁可唯《时间煮雨》',
      '李荣浩《李白》'
    ],
    description: '新千年华语流行乐最受欢迎的副歌模板之一，比传统的全小调走向更具有明朗的昂扬感与开阔度。',
    keyboardistTip: '落在1级时右手可弹奏高音点缀，第4个和弦落在6级时轻柔过渡，形成强弱对比鲜明的动态。',
    defaultBpm: 78,
    recommendedGrooveId: 'groove-syncopated-pop',
    chordsTemplate: [
      { degree: 4, suffix: '', inversion: 0 },
      { degree: 5, suffix: '', inversion: 2 },
      { degree: 1, suffix: '', inversion: 1 },
      { degree: 6, suffix: 'm', inversion: 0 },
    ],
  },
];

// 7 Core Pop Accompaniment Rhythms covering >95% of pop music
export const POP_GROOVES: PopGroove[] = [
  {
    id: 'groove-block-chords',
    name: '经典四拍柱式伴奏 (Block Chords)',
    category: '柱式伴奏',
    coverageRate: 96,
    feelDescription: '稳健扎实 · 宽厚平缓 · 抒情慢歌的定海神针',
    representativeSongs: ['Adele《Someone Like You》', '周杰伦《安静》', '光良《童话》', '刘若英《很爱很爱你》'],
    timeSignature: '4/4',
    subdivisions: 8,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '强拍下击' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'none' },
      { step: 2, beat: 2, sub: 0, lh: 'octave', rh: 'chord', accent: false, annotation: '次强拍' },
      { step: 3, beat: 2, sub: 1, lh: 'none', rh: 'none' },
      { step: 4, beat: 3, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '主干拍' },
      { step: 5, beat: 3, sub: 1, lh: 'none', rh: 'none' },
      { step: 6, beat: 4, sub: 0, lh: 'octave', rh: 'chord', accent: false, annotation: '弱拍收尾' },
      { step: 7, beat: 4, sub: 1, lh: 'none', rh: 'none' },
    ],
    keyboardistTip: '柱式伴奏切忌手腕僵硬！手腕要有弹性呼吸，音量强弱遵循“强-弱-次强-弱”，左手踩住延音踏板并在换和弦瞬间换踏板。',
    tags: ['抒情慢歌', '主歌叙事', '全频饱满', '新手基石'],
  },
  {
    id: 'groove-driving-8beat',
    name: '动力性流行8分扫击 (Driving 8-Beat Pulse)',
    category: '动力性律动',
    coverageRate: 94,
    feelDescription: '青春跃动 · 持续推力 · 流行摇滚与中快板核心',
    representativeSongs: ['五月天《倔强》', 'Coldplay《The Scientist》', '周杰伦《晴天》', 'OneRepublic《Counting Stars》'],
    timeSignature: '4/4',
    subdivisions: 8,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '低音重击' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'chord_soft', accent: false, annotation: '八分推动' },
      { step: 2, beat: 2, sub: 0, lh: 'octave', rh: 'chord', accent: false, annotation: '低音呼应' },
      { step: 3, beat: 2, sub: 1, lh: 'none', rh: 'chord_soft', accent: false, annotation: '轻快回击' },
      { step: 4, beat: 3, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '中轴强拍' },
      { step: 5, beat: 3, sub: 1, lh: 'none', rh: 'chord_soft', accent: false, annotation: '八分推动' },
      { step: 6, beat: 4, sub: 0, lh: 'octave', rh: 'chord', accent: false, annotation: '次重回环' },
      { step: 7, beat: 4, sub: 1, lh: 'none', rh: 'chord_soft', accent: false, annotation: '准备进下小节' },
    ],
    keyboardistTip: '右手八分音符千万不能弹得像打字机一样死板。正拍弹实，反拍弹轻，利用手臂自然重量下沉，左手低音保持颗粒感。',
    tags: ['动力推进', '流行摇滚', '中快板', '肌肉记忆'],
  },
  {
    id: 'groove-syncopated-pop',
    name: '核心流行切分律动 (Syncopated Pop Groove)',
    category: '核心切分',
    coverageRate: 93,
    feelDescription: '现代摩登 · 提前弹跳 · 华语流行乐的灵魂脉搏',
    representativeSongs: ['周杰伦《说好不哭》《告白气球》', '林俊杰《不为谁而作的歌》', '王力宏《唯一》', '陶喆《找自己》'],
    timeSignature: '4/4',
    subdivisions: 16,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '第1拍落音' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'none' },
      { step: 2, beat: 1, sub: 2, lh: 'none', rh: 'none' },
      { step: 3, beat: 1, sub: 3, lh: 'none', rh: 'chord_soft', syncopated: true, annotation: '弱起垫步' },
      { step: 4, beat: 2, sub: 0, lh: 'octave', rh: 'none', annotation: '低音支柱' },
      { step: 5, beat: 2, sub: 1, lh: 'none', rh: 'none' },
      { step: 6, beat: 2, sub: 2, lh: 'none', rh: 'chord', syncopated: true, accent: true, annotation: '★ 核心切分点' },
      { step: 7, beat: 2, sub: 3, lh: 'none', rh: 'none' },
      { step: 8, beat: 3, sub: 0, lh: 'root', rh: 'none', annotation: '第3拍低音' },
      { step: 9, beat: 3, sub: 1, lh: 'none', rh: 'none' },
      { step: 10, beat: 3, sub: 2, lh: 'none', rh: 'chord', accent: false, annotation: '稳固拍' },
      { step: 11, beat: 3, sub: 3, lh: 'none', rh: 'none' },
      { step: 12, beat: 4, sub: 0, lh: 'octave', rh: 'none', annotation: '回旋' },
      { step: 13, beat: 4, sub: 1, lh: 'none', rh: 'none' },
      { step: 14, beat: 4, sub: 2, lh: 'none', rh: 'chord', syncopated: true, accent: true, annotation: '★ 提前切分' },
      { step: 15, beat: 4, sub: 3, lh: 'none', rh: 'none' },
    ],
    keyboardistTip: '切分音的关键在于“提前半拍进和弦”！不要等到正拍才动手，第2拍后半拍和第4拍后半拍提前咬住，弹奏出向前跃进的推背感！',
    tags: ['灵魂切分', '华语神韵', '提前进和弦', '高级弹奏'],
  },
  {
    id: 'groove-arpeggio-16th',
    name: '16分音符流水分解琶音 (Flowing 16th Arpeggio)',
    category: '分解琶音',
    coverageRate: 91,
    feelDescription: '行云流水 · 空灵浪漫 · 唯美影视原声质感',
    representativeSongs: ['周杰伦《蒲公英的约定》', '理查德克莱德曼《梦中的婚礼》', '林俊杰《爱笑的眼睛》', '王力宏《依然爱你》'],
    timeSignature: '4/4',
    subdivisions: 16,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'none', accent: true, annotation: '低音根' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'arpeggio_low', annotation: '低音分解' },
      { step: 2, beat: 1, sub: 2, lh: 'fifth', rh: 'none', annotation: '左手五音' },
      { step: 3, beat: 1, sub: 3, lh: 'none', rh: 'arpeggio_mid', annotation: '中音爬坡' },
      { step: 4, beat: 2, sub: 0, lh: 'octave', rh: 'none', annotation: '左手八度' },
      { step: 5, beat: 2, sub: 1, lh: 'none', rh: 'arpeggio_high', accent: true, annotation: '高音亮色' },
      { step: 6, beat: 2, sub: 2, lh: 'none', rh: 'arpeggio_mid', annotation: '折返' },
      { step: 7, beat: 2, sub: 3, lh: 'none', rh: 'arpeggio_low', annotation: '水流' },
      { step: 8, beat: 3, sub: 0, lh: 'root', rh: 'none', accent: true, annotation: '低音再落' },
      { step: 9, beat: 3, sub: 1, lh: 'none', rh: 'arpeggio_low', annotation: '回旋' },
      { step: 10, beat: 3, sub: 2, lh: 'fifth', rh: 'none', annotation: '五音支点' },
      { step: 11, beat: 3, sub: 3, lh: 'none', rh: 'arpeggio_mid', annotation: '拾级而上' },
      { step: 12, beat: 4, sub: 0, lh: 'octave', rh: 'none', annotation: '八度共鸣' },
      { step: 13, beat: 4, sub: 1, lh: 'none', rh: 'arpeggio_high', accent: true, annotation: '珠圆玉润' },
      { step: 14, beat: 4, sub: 2, lh: 'none', rh: 'arpeggio_mid', annotation: '沉入湖底' },
      { step: 15, beat: 4, sub: 3, lh: 'none', rh: 'arpeggio_low', annotation: '衔接下一和弦' },
    ],
    keyboardistTip: '双手弹分解时要像水滴一样均匀，指尖站立，音色连贯（Legato）。踏板在每个和弦第一拍踩下，千万不能两和弦泥泞混响！',
    tags: ['空灵浪漫', '流水织体', '古典流行', '指力控制'],
  },
  {
    id: 'groove-root-fifth-bounce',
    name: '低音交替开合动力律动 (Root-Fifth Bounce)',
    category: '动力性律动',
    coverageRate: 88,
    feelDescription: '轻松弹跳 · 步伐稳健 · 乡村流行与欢快叙事',
    representativeSongs: ['朴树《生如夏花》《那些花儿》', 'Avicii《Wake Me Up》', '许巍《曾经的你》', 'Jason Mraz《I\'m Yours》'],
    timeSignature: '4/4',
    subdivisions: 8,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'none', accent: true, annotation: '根音先发' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'chord', annotation: '右手反拍切' },
      { step: 2, beat: 2, sub: 0, lh: 'fifth', rh: 'none', annotation: '五音跳跃' },
      { step: 3, beat: 2, sub: 1, lh: 'none', rh: 'chord', annotation: '右手轻弹' },
      { step: 4, beat: 3, sub: 0, lh: 'root', rh: 'none', accent: true, annotation: '根音归位' },
      { step: 5, beat: 3, sub: 1, lh: 'none', rh: 'chord', annotation: '反拍推进' },
      { step: 6, beat: 4, sub: 0, lh: 'fifth', rh: 'none', annotation: '五音弹跳' },
      { step: 7, beat: 4, sub: 1, lh: 'none', rh: 'chord', annotation: '收尾切音' },
    ],
    keyboardistTip: '左手根音和五音交替弹奏，右手只在反拍（后半拍）干脆切入，产生像吉他反拍扫弦一样的弹性跳跃感！',
    tags: ['反拍切音', '欢快弹跳', '民谣摇滚', '低音走步'],
  },
  {
    id: 'groove-bossa-rnb',
    name: '流行Bossa与Neo-Soul微醺切分 (Bossa & Chill R&B)',
    category: '拉丁与Bossa',
    coverageRate: 78,
    feelDescription: '慵懒松弛 · 咖啡微醺 · 都市小资与爵士流行',
    representativeSongs: ['陶喆《爱很简单》', '莫文蔚《阴天》', '王若琳《迷宫》', '方大同《Love Song》'],
    timeSignature: '4/4',
    subdivisions: 16,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '正拍点落' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'none' },
      { step: 2, beat: 1, sub: 2, lh: 'none', rh: 'none' },
      { step: 3, beat: 1, sub: 3, lh: 'none', rh: 'none' },
      { step: 4, beat: 2, sub: 0, lh: 'none', rh: 'none' },
      { step: 5, beat: 2, sub: 1, lh: 'none', rh: 'none' },
      { step: 6, beat: 2, sub: 2, lh: 'none', rh: 'chord', syncopated: true, accent: true, annotation: '★ Bossa错位切分' },
      { step: 7, beat: 2, sub: 3, lh: 'none', rh: 'none' },
      { step: 8, beat: 3, sub: 0, lh: 'fifth', rh: 'none', annotation: '低音五音' },
      { step: 9, beat: 3, sub: 1, lh: 'none', rh: 'none' },
      { step: 10, beat: 3, sub: 2, lh: 'none', rh: 'chord', syncopated: true, annotation: '轻点' },
      { step: 11, beat: 3, sub: 3, lh: 'none', rh: 'none' },
      { step: 12, beat: 4, sub: 0, lh: 'none', rh: 'chord', accent: false, annotation: '第四拍正拍' },
      { step: 13, beat: 4, sub: 1, lh: 'none', rh: 'none' },
      { step: 14, beat: 4, sub: 2, lh: 'none', rh: 'chord', syncopated: true, accent: true, annotation: '★ 弱起勾引' },
      { step: 15, beat: 4, sub: 3, lh: 'none', rh: 'none' },
    ],
    keyboardistTip: '触键要像羽毛一样轻盈，右手弹奏7/9和弦时用断奏与跳音结合，左手低音圆润厚实，营造慵懒高级的午后阳光感。',
    tags: ['爵士律动', 'Bossa Nova', 'Neo-Soul', '高级触键'],
  },
  {
    id: 'groove-anthem-driving',
    name: '副歌重击与重音切分 (Anthem Climax Driving)',
    category: '副歌爆发',
    coverageRate: 92,
    feelDescription: '情绪核爆 · 强弱悬殊 · 体育馆级万人大合唱震撼',
    representativeSongs: ['G.E.M.邓紫棋《光年之外》', '张杰《逆战》', 'Coldplay《Viva La Vida》', '汪峰《飞得更高》'],
    timeSignature: '4/4',
    subdivisions: 16,
    steps: [
      { step: 0, beat: 1, sub: 0, lh: 'root', rh: 'chord', accent: true, annotation: '★ 重炮下击' },
      { step: 1, beat: 1, sub: 1, lh: 'none', rh: 'none' },
      { step: 2, beat: 1, sub: 2, lh: 'none', rh: 'chord_soft', annotation: '回弹' },
      { step: 3, beat: 1, sub: 3, lh: 'none', rh: 'none' },
      { step: 4, beat: 2, sub: 0, lh: 'none', rh: 'chord', accent: false, annotation: '推点' },
      { step: 5, beat: 2, sub: 1, lh: 'none', rh: 'none' },
      { step: 6, beat: 2, sub: 2, lh: 'octave', rh: 'chord', syncopated: true, accent: true, annotation: '★ 双手重音切分' },
      { step: 7, beat: 2, sub: 3, lh: 'none', rh: 'none' },
      { step: 8, beat: 3, sub: 0, lh: 'root', rh: 'none', annotation: '蓄力' },
      { step: 9, beat: 3, sub: 1, lh: 'none', rh: 'chord_soft', annotation: '八分推' },
      { step: 10, beat: 3, sub: 2, lh: 'none', rh: 'chord', annotation: '聚能' },
      { step: 11, beat: 3, sub: 3, lh: 'none', rh: 'none' },
      { step: 12, beat: 4, sub: 0, lh: 'octave', rh: 'chord', accent: true, annotation: '★ 终极重拍' },
      { step: 13, beat: 4, sub: 1, lh: 'none', rh: 'none' },
      { step: 14, beat: 4, sub: 2, lh: 'none', rh: 'chord', syncopated: true, accent: true, annotation: '★ 冲破天际' },
      { step: 15, beat: 4, sub: 3, lh: 'none', rh: 'none' },
    ],
    keyboardistTip: '身体带动整条手臂施力！利用大臂下沉的重力击键，把低音八度弹得如惊雷滚滚，切分拍双手同步咬合，音乐能量直接拉爆！',
    tags: ['副歌高潮', '核弹爆发', '重音切分', '全场震撼'],
  },
];

// Smart Pairings: Curated best combinations of Chords + Rhythms
export const SMART_PAIRINGS: SmartPairing[] = [
  {
    id: 'pair-tearjerker',
    title: '经典华语抒情催泪',
    styleTag: '华语情歌神配',
    description: '华语核弹级 4536251 遇上核心流行切分律动，周杰伦、张信哲金曲的灵魂解密。',
    progressionId: 'prog-4536251',
    grooveId: 'groove-syncopated-pop',
    suggestedKey: 'C',
    suggestedBpm: 72,
    matchScore: 98,
    whyItWorks: '4536251的跌宕起伏需要切分律动带来的呼吸感，提前半拍进和弦完美化解了抒情歌的拖沓，让旋律自然向前滑行。',
    iconType: 'tear',
  },
  {
    id: 'pair-anthem-rock',
    title: '青春热血流行摇滚',
    styleTag: '高燃奔跑动力',
    description: '欧美与华语封神 6415 搭配动力性8分扫击，打造永不熄灭的青春狂想。',
    progressionId: 'prog-6415',
    grooveId: 'groove-driving-8beat',
    suggestedKey: 'G',
    suggestedBpm: 112,
    matchScore: 96,
    whyItWorks: '6415循环本身带有天然的奔跑势能，连续八分音符的脉冲如同心跳加速，极易带动听众现场大合唱与情绪共鸣。',
    iconType: 'fire',
  },
  {
    id: 'pair-healing-canon',
    title: '治愈暖心浪漫长河',
    styleTag: '史诗浪漫叙事',
    description: '卡农走向与16分音符流水琶音织体，宛如涓涓细流涌入心田。',
    progressionId: 'prog-canon',
    grooveId: 'groove-arpeggio-16th',
    suggestedKey: 'C',
    suggestedBpm: 68,
    matchScore: 97,
    whyItWorks: '卡农严谨的低音阶梯走向与16分音符连绵不断的琶音结合，产生巴洛克式严谨与现代流行唯美的双重质感，极耐听。',
    iconType: 'leaf',
  },
  {
    id: 'pair-chill-rnb',
    title: '都市轻熟微醺R&B',
    styleTag: '高级时尚摩登',
    description: '高阶2514大七和弦遇见Bossa慵懒错位切分，秒变陶喆与方大同的都市唱片。',
    progressionId: 'prog-2514',
    grooveId: 'groove-bossa-rnb',
    suggestedKey: 'F',
    suggestedBpm: 84,
    matchScore: 94,
    whyItWorks: '七和弦色彩浓郁，若配普通柱式会显得沉重。Bossa的轻盈断奏与错位反拍恰好中和了和弦的粘稠，透气感十足。',
    iconType: 'coffee',
  },
  {
    id: 'pair-retro-sweet',
    title: '纯真年代黄金复古',
    styleTag: '50s甜蜜回忆',
    description: 'Stand By Me 式 1645 搭配稳健四拍柱式伴奏，浪漫复古一击必中。',
    progressionId: 'prog-1645',
    grooveId: 'groove-block-chords',
    suggestedKey: 'C',
    suggestedBpm: 86,
    matchScore: 95,
    whyItWorks: 'Doo-Wop经典走向讲究原汁原味的朴素与扎实，四分音符稳健柱式留足了人声叙事空间，干净耐品。',
    iconType: 'heart',
  },
  {
    id: 'pair-climax-bomb',
    title: '副歌核弹爆发高潮',
    styleTag: '全场震撼合唱',
    description: '悲伤宿命 4566 碰撞副歌重击强切分，邓紫棋与五月天万人演唱会的沸腾时刻。',
    progressionId: 'prog-4566',
    grooveId: 'groove-anthem-driving',
    suggestedKey: 'C',
    suggestedBpm: 76,
    matchScore: 96,
    whyItWorks: '4-5蓄能到6级的冲击力极其庞大，副歌重击律动的极强反差切分重音赋予每个和弦如炸药般的爆发冲击波。',
    iconType: 'sparkle',
  },
];

// Calculation of Chord Notes, Voicings, and Left/Right Hand positions for a given Key
export function calculateChordVoicing(
  key: MusicalKey,
  templateChord: {
    degree: number;
    suffix: string;
    bassDegree?: number;
    inversion: 0 | 1 | 2;
  }
): ChordVoicing {
  const isMinor = key.endsWith('m');
  const tonicSemitone = KEY_ROOT_SEMITONES[key];
  const intervals = isMinor ? MINOR_SCALE_INTERVALS : MAJOR_SCALE_INTERVALS;

  const degIndex = ((templateChord.degree - 1) % 7 + 7) % 7;
  const rootOffset = intervals[degIndex];
  const chordRootPitchClass = (tonicSemitone + rootOffset) % 12;

  // Bass note (Slash chord support)
  let bassPitchClass = chordRootPitchClass;
  if (templateChord.bassDegree) {
    const bassDegIndex = ((templateChord.bassDegree - 1) % 7 + 7) % 7;
    const bassOffset = intervals[bassDegIndex];
    bassPitchClass = (tonicSemitone + bassOffset) % 12;
  }

  // Determine chord quality: Triad intervals from chord root
  // Default pop triads based on major scale degree:
  // 1: Maj, 2: Min, 3: Min, 4: Maj, 5: Maj, 6: Min, 7: Dim
  let chordIntervals = [0, 4, 7]; // Major triad default
  let qualityName = '';

  const d = templateChord.degree;
  const s = templateChord.suffix;

  if (s === 'm' || (s === '' && !isMinor && (d === 2 || d === 3 || d === 6))) {
    chordIntervals = [0, 3, 7]; // Minor triad
    qualityName = 'm';
  } else if (s === 'm7' || (s === '' && !isMinor && (d === 2 || d === 3 || d === 6) && false)) {
    chordIntervals = [0, 3, 7, 10]; // Minor 7th
    qualityName = 'm7';
  } else if (s === 'maj7' || (s === '' && (d === 1 || d === 4) && false)) {
    chordIntervals = [0, 4, 7, 11]; // Major 7th
    qualityName = 'maj7';
  } else if (s === '7' || (s === '' && d === 5 && false)) {
    chordIntervals = [0, 4, 7, 10]; // Dominant 7th
    qualityName = '7';
  } else if (s === 'add9') {
    chordIntervals = [0, 4, 7, 14]; // Add9
    qualityName = 'add9';
  } else if (s === 'sus4') {
    chordIntervals = [0, 5, 7]; // Sus4
    qualityName = 'sus4';
  }

  const chordRootName = NOTE_NAMES[chordRootPitchClass];
  const bassName = NOTE_NAMES[bassPitchClass];
  const displayName = templateChord.bassDegree && templateChord.bassDegree !== d
    ? `${chordRootName}${qualityName}/${bassName}`
    : `${chordRootName}${qualityName}`;

  const romanDegree = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][degIndex];
  const displayRoman = qualityName === 'm' || qualityName === 'm7'
    ? romanDegree.toLowerCase() + qualityName.replace('m', '')
    : romanDegree + qualityName;

  // Left hand: Deep bass root in Octave 2 (MIDI 36-47), fifth / octave in Octave 3 (MIDI 48-59)
  // Base MIDI for Left Hand root: Octave 2
  const lhRootMidi = 36 + bassPitchClass; // 36 = C2
  const lhFifthMidi = lhRootMidi + 7;
  const lhOctaveMidi = lhRootMidi + 12;

  const lhNotes = [
    { midi: lhRootMidi, noteName: getMidiNoteName(lhRootMidi), finger: 5, role: '低音根音 (小指)' },
    { midi: lhFifthMidi, noteName: getMidiNoteName(lhFifthMidi), finger: 2, role: '低音五音 (食指)' },
    { midi: lhOctaveMidi, noteName: getMidiNoteName(lhOctaveMidi), finger: 1, role: '高八度支点 (大拇指)' },
  ];

  // Right Hand: Octave 3 to 4 (MIDI 55 to 72)
  // Inversion arrangement for smooth voice leading:
  // Root position: root, 3rd, 5th
  // 1st inversion: 3rd, 5th, root(+12)
  // 2nd inversion: 5th, root, 3rd
  const rhPitchClasses = chordIntervals.map(interval => (chordRootPitchClass + interval) % 12);

  // We place the right hand chord notes in a comfortable sweet spot around Middle C (C4 = 60, range 55 to 72)
  const baseRhMidiNotes = rhPitchClasses.map(pc => {
    let midi = 48 + pc;
    while (midi < 55) {
      midi += 12;
    }
    if (midi > 71) {
      midi -= 12;
    }
    return midi;
  }).sort((a, b) => a - b);

  // Apply inversion shifts to maintain smooth voice leading
  let chosenRhNotes = [...baseRhMidiNotes];
  let inversionText = '原位 (Root)';

  if (templateChord.inversion === 1 && chosenRhNotes.length >= 3) {
    // 1st inversion: bottom note up an octave
    chosenRhNotes[0] += 12;
    chosenRhNotes.sort((a, b) => a - b);
    inversionText = '第一转位 (1st Inv)';
  } else if (templateChord.inversion === 2 && chosenRhNotes.length >= 3) {
    // 2nd inversion: bottom two notes up an octave or adjust
    chosenRhNotes[0] += 12;
    chosenRhNotes[1] += 12;
    chosenRhNotes.sort((a, b) => a - b);
    inversionText = '第二转位 (2nd Inv)';
  }

  // Right hand fingerings for standard 3-note or 4-note voicings:
  // 3-note: 1 (thumb), 3 (middle), 5 (pinky) or 1, 2, 5
  const rhFingers = chosenRhNotes.length === 3 ? [1, 3, 5] : [1, 2, 3, 5];

  const rhNotes = chosenRhNotes.map((midi, idx) => ({
    midi,
    noteName: getMidiNoteName(midi),
    finger: rhFingers[idx] || (idx + 1),
    role: idx === 0 ? '右手和弦底音' : idx === chosenRhNotes.length - 1 ? '右手和弦顶音' : '和弦内声部',
  }));

  return {
    name: displayName,
    roman: displayRoman,
    degree: d,
    rootMidi: lhRootMidi,
    lhNotes,
    rhNotes,
    inversionName: inversionText,
  };
}

// 3 Full Octaves: C2 (MIDI 36) to C5 (MIDI 72) - total 37 keys
export function generatePianoKeys(): { midi: number; noteName: string; octave: number; isBlack: boolean }[] {
  const keys = [];
  for (let midi = 36; midi <= 72; midi++) {
    keys.push({
      midi,
      noteName: NOTE_NAMES[midi % 12],
      octave: Math.floor(midi / 12) - 1,
      isBlack: isBlackKey(midi),
    });
  }
  return keys;
}
