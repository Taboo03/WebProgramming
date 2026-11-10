// ============================================================================
// DriveWave LOOP - 목포대학교(청계면) 기준 무정차 한 바퀴 & 내비 그래픽 지도 로직
// ============================================================================

// 1. 목포대학교 도림캠퍼스(청계면) 기준 실제 무정차 한 바퀴(Loop) 코스
// svgCoord: 외부 지도 API 없이도 100% 작동하는 내비게이션 경로 그래픽 상의 (x, y) 좌표
const MOKPO_LOOP_COURSES = [
  {
    id: 'topmeori-loop',
    title: '무안 톱머리해변-청계만 해안선 무정차 순환 루프',
    themeLabel: '#서해해안도로 🌊',
    durationMin: 42,
    distanceKm: 34,
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #38bdf8 100%)',
    summary: '목포대에서 청계오거리를 지나 망운 톱머리 해안도로를 따라 바다 옆을 시원하게 달린 후 학교로 복귀하는 최단 해안 루프',
    waypoints: [
      { name: '청계오거리 (1번 국도 진출입)', lat: 34.9130, lng: 126.4170, svgX: 460, svgY: 220, desc: '학교 정문 나와 해안도로 진입' },
      { name: '무안 톱머리 해안 드라이브길', lat: 34.9785, lng: 126.3762, svgX: 340, svgY: 115, desc: '바다 바로 옆 뻗은 해안선 무정차 질주' },
      { name: '조금나루-망운 회차 포인트', lat: 34.9982, lng: 126.3480, svgX: 250, svgY: 85, desc: '노을 뷰포인트 통과 후 청계 방면 순환' }
    ]
  },
  {
    id: 'mokpo-bridge-loop',
    title: '목포 평화광장-유달산-목포대교 심야 야경 일주 루프',
    themeLabel: '#해상교량야경 🌉',
    durationMin: 52,
    distanceKm: 46,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1d4ed8 100%)',
    summary: '목포대생들이 가장 사랑하는 밤바리 코스! 남악을 지나 평화광장 바닷길, 유달산 산복도로, 목포대교를 건너 복귀하는 환상의 야경 코스',
    waypoints: [
      { name: '목포 하당 평화광장 바닷길', lat: 34.7955, lng: 126.4312, svgX: 520, svgY: 390, desc: '바다 분수 해안도로 무정차 통과' },
      { name: '유달산 조각공원 일주 와인딩로', lat: 34.7895, lng: 126.3780, svgX: 390, svgY: 405, desc: '목포 도심과 바다가 내려다보이는 산길' },
      { name: '목포대교 해상 주탑 횡단', lat: 34.7820, lng: 126.3550, svgX: 310, svgY: 420, desc: '조명 켜진 목포대교 질주 후 국도1호선 복귀' }
    ]
  },
  {
    id: '1004-bridge-loop',
    title: '신안 천사대교 해상 쾌속 질주 & 압해도 순환 루프',
    themeLabel: '#바다위고속질주 🛣️',
    durationMin: 75,
    distanceKm: 65,
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #0284c7 100%)',
    summary: '청계면에서 압해도를 거쳐 국내 4위 길이(7.2km) 천사대교를 건너 바다 한가운데를 질주하고 돌아오는 압도적 개방감의 루프',
    waypoints: [
      { name: '압해대교 진입로 (목포-압해 연결)', lat: 34.8465, lng: 126.3780, svgX: 375, svgY: 310, desc: '신안 방면 뻥 뚫린 4차선 도로 진입' },
      { name: '천사대교 해상교량 횡단 하이라이트', lat: 34.8640, lng: 126.1750, svgX: 165, svgY: 280, desc: '양옆이 탁 트인 바다 위를 70km로 날아가는 구간' },
      { name: '암태도 오도선착장 로터리 회차점', lat: 34.8490, lng: 126.1520, svgX: 110, svgY: 315, desc: '로터리 유턴 후 천사대교 재도하 및 목포대 복귀' }
    ]
  },
  {
    id: 'yeongam-f1-loop',
    title: '영암호 방조제 & F1 서킷 둑길 무신호 직선 루프',
    themeLabel: '#무신호직선질주 🏎️',
    durationMin: 48,
    distanceKm: 48,
    gradient: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #dc2626 100%)',
    summary: '신호등과 과속방지턱에 지쳤을 때 추천! 남악을 지나 영암호 방조제 수직 도로를 시원하게 쏘고 돌아오는 고속 크루징 코스',
    waypoints: [
      { name: '남악신도시-삼호읍 연결구간', lat: 34.8050, lng: 126.4750, svgX: 615, svgY: 375, desc: '영암호 방향 진출입' },
      { name: '영암 F1 국제자동차경주장 앞길', lat: 34.7380, lng: 126.4150, svgX: 540, svgY: 475, desc: '넓고 쾌적한 아스팔트 직선 주로' },
      { name: '영암방조제 둑길 횡단 포인트', lat: 34.7490, lng: 126.3620, svgX: 430, svgY: 465, desc: '바다와 호수 사이를 가로지른 후 청계 복귀' }
    ]
  }
];

// 2. 노래 추천: 장르별 큐레이션 데이터
const MUSIC_GENRES = {
  citypop: {
    id: 'citypop',
    name: '시티팝 & 레트로',
    badge: '🌆 시티팝 & 레트로',
    title: '심야 해안도로 드라이브 시티팝 & 80s 감성 그루브 믹스',
    ytQuery: '밤드라이브 시티팝 플레이리스트',
    ytEmbedId: 'jfKfPfyJRdk'
  },
  rnb: {
    id: 'rnb',
    name: '힙합 & R&B 밤바리',
    badge: '🌙 힙합 & R&B 밤바리',
    title: '목포대교 야경 보며 듣는 감성 트렌디 힙합 & 알앤비',
    ytQuery: '밤 드라이브 힙합 알앤비 플레이리스트',
    ytEmbedId: '5qap5aO4i9A'
  },
  lofi: {
    id: 'lofi',
    name: '칠(Chill) & 감성 로파이',
    badge: '☕ 칠(Chill) & 감성 로파이',
    title: '차분하게 생각 정리하는 새벽 무정차 드라이브 로파이',
    ytQuery: '새벽 드라이브 로파이 플레이리스트',
    ytEmbedId: 'jfKfPfyJRdk'
  },
  indie: {
    id: 'indie',
    name: '어쿠스틱 & 바다 인디',
    badge: '🌊 어쿠스틱 & 바다 인디',
    title: '청계만 바닷바람 맞으며 듣는 청량한 인디 & 어쿠스틱',
    ytQuery: '바다 드라이브 인디 밴드 노래 모음',
    ytEmbedId: '4xDzrJKXOOY'
  },
  pop: {
    id: 'pop',
    name: '신나는 팝 & 질주곡',
    badge: '⚡ 신나는 팝 & 질주곡',
    title: '천사대교 시원하게 달리는 드라이브 텐션업 팝송 메들리',
    ytQuery: '드라이브 신나는 팝송 떼창',
    ytEmbedId: '21qNxnCS8WU'
  }
};

// 3. 출발지 프리셋 좌표 및 그래픽 맵 위치
const ORIGIN_PRESETS = {
  '목포대학교 도림캠퍼스(정문)': { lat: 34.9126, lng: 126.4385, svgX: 525, svgY: 225 },
  '목포대 기숙사/후문': { lat: 34.9180, lng: 126.4330, svgX: 515, svgY: 210 },
  '청계면사무소/청계오거리': { lat: 34.9130, lng: 126.4170, svgX: 460, svgY: 220 },
  '남악신도시(전남도청 앞)': { lat: 34.8152, lng: 126.4632, svgX: 585, svgY: 355 },
  '목포 평화광장': { lat: 34.7955, lng: 126.4312, svgX: 520, svgY: 390 }
};

let originPoint = {
  lat: 34.9126,
  lng: 126.4385,
  svgX: 525,
  svgY: 225,
  name: '목포대학교 도림캠퍼스(정문)'
};

let currentCourse = MOKPO_LOOP_COURSES[0];
let currentGenre = MUSIC_GENRES['citypop'];
let isCustomMode = false;
let customWaypoints = [];

// 4. 초기화 실행
window.addEventListener('DOMContentLoaded', () => {
  renderCourseCards();
  selectCourse(MOKPO_LOOP_COURSES[0].id);
  selectGenre('citypop');
});

// 5. 음악 장르 선택 로직
function selectGenre(genreKey) {
  const g = MUSIC_GENRES[genreKey];
  if (!g) return;
  currentGenre = g;

  document.querySelectorAll('.genre-pills .genre-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.genre === genreKey);
  });

  document.getElementById('currentGenreBadge').innerText = g.badge;
  document.getElementById('currentTrackTitle').innerText = g.title;
  document.getElementById('genreYoutubeLink').href =
    `https://www.youtube.com/results?search_query=${encodeURIComponent(g.ytQuery)}`;

  document.getElementById('bgmGenreDisplay').innerText = `현재 선택 장르: ${g.name}`;
  document.getElementById('bgmFooterTitle').innerText = g.title;
  document.getElementById('bgmFooterYtLink').href =
    `https://www.youtube.com/results?search_query=${encodeURIComponent(g.ytQuery)}`;

  showToast(`🎵 음악 장르가 [${g.name}]으로 설정되었습니다!`);
}

// 6. 출발/복귀 원점 변경
function updateOriginFromPreset() {
  const val = document.getElementById('startPointSelect').value;
  const [lat, lng, name] = val.split(',');
  const preset = ORIGIN_PRESETS[name] || { svgX: 525, svgY: 225 };
  originPoint = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
    svgX: preset.svgX,
    svgY: preset.svgY,
    name: name
  };
  showToast(`출발/복귀 원점이 [${name}]으로 변경되었습니다!`);
  refreshCurrentRoute();
}

function useMyGPSLocation() {
  originPoint = {
    lat: 34.9126,
    lng: 126.4385,
    svgX: 525,
    svgY: 225,
    name: '목포대학교 도림캠퍼스(내 위치)'
  };
  showToast('📍 현재 위치(목포대 청계캠퍼스)가 출발/복귀 원점으로 설정되었습니다!');
  refreshCurrentRoute();
}

// 7. 코스 선택 및 화면 갱신
function selectCourse(courseId) {
  isCustomMode = false;
  document.getElementById('customHelpBox').style.display = 'none';
  document.getElementById('modeIndicator').innerText = '현재: 목포대 추천 루프 코스';

  const found = MOKPO_LOOP_COURSES.find(c => c.id === courseId);
  if (!found) return;
  currentCourse = found;

  document.querySelectorAll('.course-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === courseId);
  });

  refreshCurrentRoute();
}

function refreshCurrentRoute() {
  const activeWaypoints = isCustomMode ? customWaypoints : currentCourse.waypoints;

  if (isCustomMode) {
    document.getElementById('currentCourseTitle').innerText = '목포대 출발 나만의 커스텀 한 바퀴 루프';
    document.getElementById('currentCourseStats').innerText =
      `경유지 ${activeWaypoints.length}곳 통과 후 [${originPoint.name}] 원점 복귀`;
    document.getElementById('mapCourseChip').innerText = '🖱️ 지도 클릭으로 직접 경로 생성 중';
  } else {
    document.getElementById('currentCourseTitle').innerText = currentCourse.title;
    document.getElementById('currentCourseStats').innerText =
      `목포대 출발 ➔ 무정차 순환 ➔ 목포대 복귀 (약 ${currentCourse.distanceKm}km • ${currentCourse.durationMin}분)`;
    document.getElementById('mapCourseChip').innerText = `📍 ${currentCourse.title}`;
  }

  renderTimeline(activeWaypoints);
  renderSegmentQuickLinks(activeWaypoints);
  renderVisualRouteMap(activeWaypoints);
}

// 8. 좌측 타임라인 렌더링
function renderTimeline(waypoints) {
  const listEl = document.getElementById('loopTimelineList');
  let html = `
    <li class="origin-node">
      <div class="node-badge">출발</div>
      <div class="node-text">
        <strong>${originPoint.name} (출발지)</strong>
        <span>노래 틀고 안전벨트 맨 뒤 무정차 드라이브 시작!</span>
      </div>
    </li>
  `;

  waypoints.forEach((wp, i) => {
    html += `
      <li>
        <div class="node-badge">${i + 1}</div>
        <div class="node-text">
          <strong>[경유 ${i + 1}] ${wp.name}</strong>
          <span>${wp.desc}</span>
        </div>
      </li>
    `;
  });

  html += `
    <li class="return-node">
      <div class="node-badge">복귀</div>
      <div class="node-text">
        <strong>${originPoint.name} (원점 도착)</strong>
        <span>안 내리고 기분 전환 후 학교로 안전하게 복귀!</span>
      </div>
    </li>
  `;

  listEl.innerHTML = html;
}

// ============================================================================
// 9. 핵심: 외부 API 키 없이도 100% 선명하게 표시되는 내비게이션 경로 그래픽 맵
// ============================================================================
function renderVisualRouteMap(waypoints) {
  const container = document.getElementById('visualMapContainer');
  const allPts = [originPoint, ...waypoints, originPoint];

  // 경로 폴리라인 좌표 문자열 생성
  const pointsAttr = allPts.map(p => `${p.svgX},${p.svgY}`).join(' ');

  // 곡선/직선 루프 패스 및 방향 화살표 계산
  let segmentLabelsSvg = '';
  for (let i = 0; i < allPts.length - 1; i++) {
    const p1 = allPts[i];
    const p2 = allPts[i + 1];
    const midX = (p1.svgX + p2.svgX) / 2;
    const midY = (p1.svgY + p2.svgY) / 2;
    const isReturn = i === allPts.length - 2;
    segmentLabelsSvg += `
      <g transform="translate(${midX}, ${midY})">
        <rect x="-28" y="-10" width="56" height="20" rx="10" fill="${isReturn ? '#f59e0b' : '#0284c7'}" opacity="0.92"/>
        <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="bold">
          ${isReturn ? '복귀구간' : (i + 1) + '구간 ➔'}
        </text>
      </g>
    `;
  }

  // 경유지 핀 마커 SVG 생성
  let waypointMarkersSvg = waypoints.map((wp, idx) => `
    <g class="map-pin-group" transform="translate(${wp.svgX}, ${wp.svgY})">
      <circle r="18" fill="#38bdf8" opacity="0.22">
        <animate attributeName="r" values="14;24;14" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle r="12" fill="#0284c7" stroke="#ffffff" stroke-width="2.5"/>
      <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="900">${idx + 1}</text>
      <g transform="translate(0, -24)">
        <rect x="-85" y="-14" width="170" height="22" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
        <text x="0" y="1" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="bold">${wp.name.split(' ')[0]} ${wp.name.split(' ')[1] || ''}</text>
      </g>
    </g>
  `).join('');

  container.innerHTML = `
    <svg id="navSvgMap" viewBox="-20 -10 800 560" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#081426"/>
          <stop offset="100%" stop-color="#0c2540"/>
        </linearGradient>
        <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#152238"/>
          <stop offset="100%" stop-color="#1c2d4a"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>

      <!-- 1. 배경: 서해 바다 (청계만 / 신안 다도해 / 영산강 하구) -->
      <rect x="-20" y="-10" width="800" height="560" rx="10" fill="url(#seaGrad)"/>

      <!-- 격자 그리드 (내비게이션 느낌) -->
      <g stroke="#1e293b" stroke-width="1" opacity="0.45">
        <line x1="0" y1="90" x2="760" y2="90"/><line x1="0" y1="180" x2="760" y2="180"/>
        <line x1="0" y1="270" x2="760" y2="270"/><line x1="0" y1="360" x2="760" y2="360"/>
        <line x1="0" y1="450" x2="760" y2="450"/>
        <line x1="150" y1="0" x2="150" y2="540"/><line x1="300" y1="0" x2="300" y2="540"/>
        <line x1="450" y1="0" x2="450" y2="540"/><line x1="600" y1="0" x2="600" y2="540"/>
      </g>

      <!-- 2. 지형 폴리곤 (무안 반도 / 청계면 / 목포 도심 / 압해도 / 암태도 / 영암) -->
      <!-- 무안·청계·목포 육지 -->
      <path d="M 230,40 L 760,40 L 760,430 L 580,415 L 490,420 L 370,415 L 340,365 L 430,300 L 420,220 L 310,160 L 220,90 Z"
            fill="url(#landGrad)" stroke="#334155" stroke-width="2"/>
      
      <!-- 압해도 섬 지형 -->
      <path d="M 225,245 L 365,255 L 380,330 L 245,345 L 200,295 Z"
            fill="url(#landGrad)" stroke="#334155" stroke-width="1.5"/>

      <!-- 신안 암태도·자은도 지형 -->
      <path d="M 30,240 L 145,255 L 155,365 L 45,380 Z"
            fill="url(#landGrad)" stroke="#334155" stroke-width="1.5"/>

      <!-- 영암 삼호·F1서킷 지형 -->
      <path d="M 410,455 L 760,445 L 760,540 L 390,540 Z"
            fill="url(#landGrad)" stroke="#334155" stroke-width="2"/>

      <!-- 3. 주요 배경 간선도로망 (1번 국도, 서해안고속도로, 해안도로) -->
      <g stroke="#334155" stroke-width="3" fill="none" opacity="0.7">
        <!-- 국도 1호선 (무안~청계~목포) -->
        <path d="M 550,40 L 525,225 L 520,390"/>
        <!-- 서해안고속도로 (무안~남악) -->
        <path d="M 650,40 L 610,230 L 585,355"/>
        <!-- 톱머리 해안도로 -->
        <path d="M 460,220 L 340,115 L 250,85"/>
        <!-- 천사대교 해상 노선 -->
        <path d="M 375,310 L 165,280 L 110,315"/>
      </g>

      <!-- 지명 텍스트 라벨 -->
      <g fill="#64748b" font-size="12" font-weight="bold">
        <text x="270" y="195" fill="#38bdf8" opacity="0.6">🌊 청계만 바다</text>
        <text x="190" y="425" fill="#38bdf8" opacity="0.6">🌊 서해 다도해</text>
        <text x="640" y="150">무안읍 방면</text>
        <text x="280" y="295">신안 압해도</text>
        <text x="70" y="355">신안 암태도</text>
        <text x="630" y="350">남악신도시</text>
        <text x="450" y="385">목포 하당/유달산</text>
        <text x="610" y="510">영암 삼호 / F1서킷</text>
      </g>

      <!-- 4. 활성화된 무정차 한 바퀴 루프(Loop) 경로 선 -->
      <!-- 외곽 네온 글로우 -->
      <polyline points="${pointsAttr}" fill="rgba(56, 189, 248, 0.08)" stroke="#0284c7" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" opacity="0.4" filter="url(#glow)"/>

      <!-- 메인 루프 실선 -->
      <polyline points="${pointsAttr}" fill="none" stroke="#38bdf8" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>

      <!-- 움직이는 주행 흐름 점선 애니메이션 -->
      <polyline points="${pointsAttr}" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="8,14" stroke-linejoin="round" stroke-linecap="round">
        <animate attributeName="stroke-dashoffset" from="110" to="0" dur="2.5s" repeatCount="indefinite"/>
      </polyline>

      <!-- 구간 배지 표시 -->
      ${segmentLabelsSvg}

      <!-- 5. 경유지 마커들 -->
      ${waypointMarkersSvg}

      <!-- 6. 출발 & 복귀 원점 (목포대학교 도림캠퍼스) 마커 -->
      <g transform="translate(${originPoint.svgX}, ${originPoint.svgY})">
        <circle r="22" fill="#10b981" opacity="0.25">
          <animate attributeName="r" values="16;28;16" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle r="14" fill="#10b981" stroke="#ffffff" stroke-width="3"/>
        <text x="0" y="4" text-anchor="middle" fill="#0b1120" font-size="10" font-weight="900">출발</text>
        <g transform="translate(0, 28)">
          <rect x="-95" y="-12" width="190" height="24" rx="12" fill="#10b981"/>
          <text x="0" y="4" text-anchor="middle" fill="#0b1120" font-size="11" font-weight="900">🎓 ${originPoint.name.split('(')[0]} (원점)</text>
        </g>
      </g>

      <!-- 7. 좌측 하단 내비게이션 요약 HUD -->
      <g transform="translate(18, 465)">
        <rect width="315" height="56" rx="10" fill="rgba(11, 17, 32, 0.9)" stroke="#334155" stroke-width="1.5"/>
        <text x="16" y="23" fill="#38bdf8" font-size="12" font-weight="bold">🔄 무정차 원점 회귀 루프 시뮬레이션</text>
        <text x="16" y="43" fill="#e2e8f0" font-size="11">
          총 거리: ${isCustomMode ? (waypoints.length * 14 + 10) : currentCourse.distanceKm}km  |  예상 소요: 약 ${isCustomMode ? (waypoints.length * 15 + 15) : currentCourse.durationMin}분  |  정차: 0회
        </text>
      </g>
    </svg>
  `;

  // 커스텀 모드일 때 SVG 맵 클릭 시 해당 위치에 경유지 추가
  const svgEl = document.getElementById('navSvgMap');
  svgEl.style.cursor = isCustomMode ? 'crosshair' : 'grab';
  svgEl.onclick = (e) => {
    if (!isCustomMode) return;
    const rect = svgEl.getBoundingClientRect();
    const scaleX = 760 / rect.width;
    const scaleY = 540 / rect.height;
    const clickX = Math.round((e.clientX - rect.left) * scaleX);
    const clickY = Math.round((e.clientY - rect.top) * scaleY);

    // SVG 좌표를 무안/목포 근사 위경도로 변환하여 네이버/카카오맵 연동에도 사용
    const approxLat = parseFloat((35.02 - (clickY / 540) * 0.30).toFixed(4));
    const approxLng = parseFloat((126.10 + (clickX / 760) * 0.45).toFixed(4));
    const idx = customWaypoints.length + 1;

    customWaypoints.push({
      name: `목포·무안 드라이브 포인트 ${idx}`,
      lat: approxLat,
      lng: approxLng,
      svgX: clickX,
      svgY: clickY,
      desc: '지도에서 직접 클릭해 추가한 무정차 경유지'
    });
    refreshCurrentRoute();
  };
}

// 10. 직접 지도 찍기 모드
function enableCustomLoopMode() {
  isCustomMode = true;
  customWaypoints = [];
  document.getElementById('customHelpBox').style.display = 'block';
  document.getElementById('modeIndicator').innerText = '현재: 목포대 출발 직접 찍기 모드';
  document.getElementById('loop-planner').scrollIntoView({ behavior: 'smooth' });
  showToast('우측 경로 지도 위에서 지나가고 싶은 지점을 클릭해 보세요!');
  refreshCurrentRoute();
}

function clearCustomWaypoints() {
  customWaypoints = [];
  refreshCurrentRoute();
  showToast('경유지가 초기화되었습니다. 지도 위를 다시 클릭해 보세요!');
}

// 11. 네이버 지도 & 카카오맵 원클릭 길찾기 연동
function openNaverMapRoute() {
  const waypoints = isCustomMode ? customWaypoints : currentCourse.waypoints;
  if (waypoints.length === 0) {
    showToast('경유지를 먼저 1곳 이상 선택하거나 찍어주세요.');
    return;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    let schemeUrl = `nmap://route/car?slat=${originPoint.lat}&slng=${originPoint.lng}&sname=${encodeURIComponent(originPoint.name)}`;
    schemeUrl += `&dlat=${originPoint.lat}&dlng=${originPoint.lng}&dname=${encodeURIComponent(originPoint.name + ' (복귀)')}`;

    waypoints.slice(0, 5).forEach((wp, idx) => {
      const vNum = idx + 1;
      schemeUrl += `&v${vNum}lat=${wp.lat}&v${vNum}lng=${wp.lng}&v${vNum}name=${encodeURIComponent(wp.name)}`;
    });
    schemeUrl += `&appname=com.drivewave.loop`;
    window.location.href = schemeUrl;
    return;
  }

  const firstWp = waypoints[0];
  const naverWebUrl = `https://map.naver.com/p/directions/-/-/-/car?c=${firstWp.lng},${firstWp.lat},12,0,0,0,dh`;
  window.open(naverWebUrl, '_blank');
  showToast(`네이버 지도 길찾기 창을 열었습니다! (출발: ${originPoint.name})`);
}

function openKakaoMapRoute() {
  const waypoints = isCustomMode ? customWaypoints : currentCourse.waypoints;
  if (waypoints.length === 0) {
    showToast('경유지를 먼저 선택해 주세요!');
    return;
  }

  const firstWp = waypoints[0];
  const kakaoRouteUrl = `https://map.kakao.com/?sName=${encodeURIComponent(originPoint.name)}&eName=${encodeURIComponent(firstWp.name)}`;
  window.open(kakaoRouteUrl, '_blank');
  showToast(`카카오맵에서 [${originPoint.name} ➔ ${firstWp.name}] 경로가 열렸습니다!`);
}

function renderSegmentQuickLinks(waypoints) {
  const box = document.getElementById('segmentLinksBox');
  if (!waypoints || waypoints.length === 0) {
    box.innerHTML = '';
    return;
  }

  const allNodes = [originPoint, ...waypoints, { ...originPoint, name: originPoint.name }];
  let html = `<span style="width:100%; font-size:11px; color:#93c5fd; font-weight:700; margin-bottom:2px;">⚡ 카카오맵 구간별 원클릭 길찾기:</span>`;

  for (let i = 0; i < allNodes.length - 1; i++) {
    const from = allNodes[i];
    const to = allNodes[i + 1];
    const label = i === allNodes.length - 2
      ? `🔄 복귀구간 (${from.name.slice(0, 6)} ➔ 목포대)`
      : `${i + 1}구간 (${from.name.slice(0, 6)} ➔ ${to.name.slice(0, 6)})`;
    const url = `https://map.kakao.com/?sName=${encodeURIComponent(from.name)}&eName=${encodeURIComponent(to.name)}`;
    html += `<a href="${url}" target="_blank" class="seg-chip">${label} ↗</a>`;
  }

  box.innerHTML = html;
}

// 12. 맨 밑 코스 카드 렌더링
function renderCourseCards() {
  const grid = document.getElementById('courseCardGrid');
  grid.innerHTML = MOKPO_LOOP_COURSES.map(c => {
    const wpNames = c.waypoints.map(w => w.name.split(' ')[0]).join(' ➔ ');
    return `
      <article class="course-card ${c.id === currentCourse.id ? 'selected' : ''}" data-id="${c.id}" onclick="handleCardClick('${c.id}')">
        <div class="card-banner" style="background: ${c.gradient}">
          <div class="card-top-badges">
            <span class="badge-theme">${c.themeLabel}</span>
            <span class="badge-loop">목포대 원점 복귀</span>
          </div>
          <div class="card-loop-graphic">
            목포대(청계) ➔ ${wpNames} ➔ 목포대
          </div>
        </div>
        <div class="card-body">
          <h3>${c.title}</h3>
          <p>${c.summary}</p>
          <div class="card-specs">
            <span>⏱️ 왕복 ${c.durationMin}분</span>
            <span>🛣️ 순환 ${c.distanceKm}km</span>
            <span style="color:#38bdf8;">지도에 세팅 ➔</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function handleCardClick(courseId) {
  selectCourse(courseId);
  document.getElementById('loop-planner').scrollIntoView({ behavior: 'smooth' });
  showToast('선택한 목포대 드라이브 코스가 우측 경로 맵에 표시되었습니다!');
}

// 13. 하단 BGM 플레이어 토글
function toggleBgmPlay() {
  const drawer = document.getElementById('ytDrawer');
  const playBtn = document.getElementById('bgmPlayBtn');
  const container = document.getElementById('ytIframeContainer');

  if (drawer.style.display === 'none') {
    drawer.style.display = 'block';
    playBtn.innerText = '⏸️ 플레이어 닫기';
    container.innerHTML = `
      <iframe width="100%" height="190"
        src="https://www.youtube.com/embed/${currentGenre.ytEmbedId}?autoplay=1"
        title="BGM Player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    showToast(`🎧 [${currentGenre.name}] 음악 재생이 시작되었습니다!`);
  } else {
    drawer.style.display = 'none';
    playBtn.innerText = '▶️ 음악 스트리밍 열기';
    container.innerHTML = '';
  }
}

// 14. 토스트 메시지
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toastMsg');
  el.innerText = msg;
  el.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 2800);
}
