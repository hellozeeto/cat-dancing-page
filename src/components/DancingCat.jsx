import catSvg from '../assets/images/cat.svg'
import { useAnimation } from '../hooks/useAnimation'
import '../styles/animations.css'

function DancingCat() {
  const {
    isAnimating,
    animationType,
    autoPlay,
    speed,
    animationTypes,
    toggleAnimation,
    changeAnimationType,
    toggleAutoPlay,
    changeSpeed
  } = useAnimation()

  const handleCatClick = () => {
    if (!autoPlay) {
      toggleAnimation()
    }
  }

  return (
    <div className="dancing-cat-container">
      <div className="cat-stage">
        <img
          src={catSvg}
          alt="Dancing Cat"
          className={`dancing-cat ${isAnimating ? `animate-${animationType}` : ''}`}
          style={{ animationDuration: `${(1 / speed).toFixed(1)}s` }}
          onClick={handleCatClick}
        />
        {autoPlay && (
          <div className="auto-play-indicator">
            자동 재생 중...
          </div>
        )}
      </div>

      <div className="controls">
        <div className="main-controls">
          <button
            className={`control-btn ${isAnimating ? 'stop' : 'start'}`}
            onClick={toggleAnimation}
            disabled={autoPlay}
          >
            {isAnimating ? '멈추기' : '춤추기'}
          </button>

          <button
            className={`control-btn ${autoPlay ? 'auto-active' : 'auto-inactive'}`}
            onClick={toggleAutoPlay}
          >
            {autoPlay ? '자동 재생 중지' : '자동 재생'}
          </button>
        </div>

        <div className="speed-control">
          <label>속도: {speed}x</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => changeSpeed(parseFloat(e.target.value))}
            className="speed-slider"
          />
        </div>

        <div className="animation-types">
          {animationTypes.map((type) => (
            <button
              key={type.id}
              className={`type-btn ${animationType === type.id ? 'active' : ''}`}
              onClick={() => changeAnimationType(type.id)}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DancingCat