const english = document.documentElement.lang === 'en';
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const labels = english
  ? { play: 'Play', pause: 'Pause', replay: '↻ Replay', playing: 'Muted loop', paused: 'Paused', ready: 'Plays when in view', manual: 'Manual playback', blocked: 'Autoplay unavailable · press Play', error: 'Video unavailable', scroll: '← Scroll horizontally to explore →' }
  : { play: '播放', pause: '暂停', replay: '↻ 重播', playing: '静音循环', paused: '已暂停', ready: '进入视野自动播放', manual: '手动播放', blocked: '自动播放受限，请点击播放', error: '视频暂不可用', scroll: '← 左右滑动查看完整图表 →' };

document.querySelectorAll<HTMLElement>('.video-player').forEach((player) => {
  const video = player.querySelector('video')!;
  const toolbar = player.querySelector<HTMLElement>('.video-toolbar')!;
  const toggle = player.querySelector<HTMLButtonElement>('.video-toggle')!;
  const replay = player.querySelector<HTMLButtonElement>('.video-replay')!;
  const status = player.querySelector<HTMLElement>('.video-status')!;
  let visible = false;
  let userPaused = false;
  let manualPlayback = false;
  let pagePause = false;
  let pendingPlay = false;
  let blocked = false;

  video.muted = true;
  toolbar.hidden = false;
  replay.textContent = labels.replay;

  const render = () => {
    toggle.textContent = video.paused ? labels.play : labels.pause;
    status.textContent = video.error ? labels.error
      : blocked ? labels.blocked
      : !video.paused ? (video.muted ? labels.playing : labels.manual)
      : userPaused ? labels.paused
      : motion.matches ? labels.manual : labels.ready;
  };
  const pauseForPage = () => {
    if (motion.matches) manualPlayback = false;
    if (!video.paused) {
      pagePause = true;
      video.pause();
    }
    render();
  };
  const play = async () => {
    if (!video.paused || pendingPlay) return;
    pendingPlay = true;
    blocked = false;
    try {
      await video.play();
    } catch (error) {
      // A scroll-induced pause can interrupt an in-flight play request.
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        blocked = true;
      }
    } finally {
      pendingPlay = false;
      render();
    }
  };
  const sync = () => {
    if (!visible || document.hidden || (motion.matches && !manualPlayback)) {
      pauseForPage();
    } else if (!userPaused && !blocked) {
      void play();
    }
  };
  const manualPlay = () => {
    userPaused = false;
    manualPlayback = true;
    blocked = false;
    void play();
  };
  toggle.addEventListener('click', () => {
    if (video.paused) manualPlay();
    else {
      userPaused = true;
      manualPlayback = false;
      video.pause();
    }
  });
  replay.addEventListener('click', () => {
    video.currentTime = 0;
    manualPlay();
  });
  video.addEventListener('play', () => {
    userPaused = false;
    blocked = false;
    if (motion.matches) manualPlayback = true;
    render();
  });
  video.addEventListener('pause', () => {
    if (!pagePause) {
      userPaused = true;
      manualPlayback = false;
    }
    pagePause = false;
    render();
  });
  video.addEventListener('volumechange', render);
  video.addEventListener('error', render);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.intersectionRatio >= 0.25;
    sync();
  }, { threshold: [0, 0.25] });
  observer.observe(video);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', () => {
    manualPlayback = false;
    sync();
    render();
  });
  render();
});

document.querySelectorAll<HTMLElement>('.weight-space-note .chart, .weight-space-note .tbl').forEach((panel) => {
  const cue = document.createElement('p');
  cue.className = 'scroll-cue';
  cue.textContent = labels.scroll;
  cue.hidden = true;
  panel.before(cue);
  const update = () => {
    const scrollable = panel.scrollWidth > panel.clientWidth + 1;
    cue.hidden = !scrollable;
    panel.tabIndex = scrollable ? 0 : -1;
    if (scrollable) {
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-label', english ? 'Scrollable figure or table' : '可横向滚动的图表');
    } else {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-label');
    }
  };
  new ResizeObserver(update).observe(panel);
});
